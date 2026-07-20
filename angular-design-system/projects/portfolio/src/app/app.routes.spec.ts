import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy, withComponentInputBinding } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/routing/portfolio-title.strategy';

describe('Portfolio routing', () => {
  beforeEach(async () => {
    document.documentElement.lang = 'en';

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.lang = 'en';
  });

  it('redirects root and legacy unlocalized routes deterministically to English', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    const redirects = new Map([
      ['/', '/en'],
      ['/about', '/en/about'],
      ['/experience', '/en/experience'],
      ['/projects', '/en/projects'],
      ['/content', '/en/content'],
      ['/contact', '/en/contact'],
    ]);

    for (const [source, destination] of redirects) {
      await router.navigateByUrl(source);
      await fixture.whenStable();
      expect(router.url).toBe(destination);
    }
  });

  it('lazy-loads every public page in English and Spanish', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    const pages = [
      { path: '', en: 'Think bigger. Build smarter.', es: 'Think bigger. Build smarter.' },
      {
        path: '/about',
        en: 'Engineering, leadership and better ways of building software.',
        es: 'Ingeniería, liderazgo y mejores formas de construir software.',
      },
      {
        path: '/experience',
        en: 'Building frontend products, engineering systems and stronger teams.',
        es: 'Construyendo productos frontend, sistemas de ingeniería y equipos más sólidos.',
      },
      {
        path: '/projects',
        en: 'Building systems, tools and ideas for better software development.',
        es: 'Construyendo sistemas, herramientas e ideas para desarrollar mejor software.',
      },
      {
        path: '/content',
        en: 'Articles, talks and practical insights',
        es: 'Artículos, charlas e ideas prácticas',
      },
      {
        path: '/contact',
        en: 'Start a thoughtful conversation',
        es: 'Iniciemos una conversación con propósito',
      },
    ];

    for (const locale of ['en', 'es'] as const) {
      for (const page of pages) {
        await router.navigateByUrl(`/${locale}${page.path}`);
        await fixture.whenStable();
        fixture.detectChanges();

        const element = fixture.nativeElement as HTMLElement;
        expect(element.querySelector('h1')?.textContent).toContain(page[locale]);
        expect(element.querySelectorAll('h1')).toHaveLength(1);
        expect(element.querySelector('main#main-content')).not.toBeNull();
        expect(document.documentElement.lang).toBe(locale);
      }
    }
  });

  it('renders a localized Not Found page inside the shell', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/en/unknown');
    await fixture.whenStable();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Page not found',
    );
    expect(document.documentElement.lang).toBe('en');

    await router.navigateByUrl('/es/desconocida');
    await fixture.whenStable();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Página no encontrada',
    );
    expect(document.documentElement.lang).toBe('es');
  });

  it('lazy-loads localized project details and keeps Projects active', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    for (const locale of ['en', 'es'] as const) {
      await router.navigateByUrl(`/${locale}/projects/angular-design-system`);
      await fixture.whenStable();
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelectorAll('h1')).toHaveLength(1);
      expect(element.querySelector('h1')?.textContent).toContain('Angular Design System');
      expect(
        element.querySelector<HTMLAnchorElement>(`a[href="/${locale}/projects"]`),
      ).not.toBeNull();
      expect(
        element.querySelectorAll('gh-navigation .gh-navigation__link[aria-current="page"]'),
      ).toHaveLength(1);
      expect(document.documentElement.lang).toBe(locale);
    }
  });

  it('renders localized project-not-found content without redirecting', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/es/projects/unknown-project');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/es/projects/unknown-project');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Proyecto no encontrado',
    );
  });

  it('falls back from an invalid locale while preserving the remaining route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/fr/about');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/en/about');
    expect(document.documentElement.lang).toBe('en');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Engineering, leadership and better ways of building software.',
    );
  });

  it('marks only the exact current navigation item as active', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/es/projects');
    await fixture.whenStable();
    fixture.detectChanges();

    const activeLinks = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
      'gh-navigation .gh-navigation__link[aria-current="page"]',
    );
    expect(activeLinks).toHaveLength(1);
    expect(activeLinks[0]?.textContent).toContain('Proyectos');

    await router.navigateByUrl('/en/experience');
    await fixture.whenStable();
    fixture.detectChanges();
    const activeExperienceLinks = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLAnchorElement>(
      'gh-navigation .gh-navigation__link[aria-current="page"]',
    );
    expect(activeExperienceLinks).toHaveLength(1);
    expect(activeExperienceLinks[0]?.textContent).toContain('Experience');

    await router.navigateByUrl('/es/unknown');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll(
        'gh-navigation .gh-navigation__link[aria-current="page"]',
      ),
    ).toHaveLength(0);
  });

  it('updates localized title and description metadata without duplicates', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    fixture.detectChanges();

    await router.navigateByUrl('/en');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer');
    expect(meta.getTag('name="description"')?.content).toContain('Angular architecture');

    await router.navigateByUrl('/es');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer');
    expect(meta.getTag('name="description"')?.content).toContain('arquitectura Angular');

    await router.navigateByUrl('/en/about');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('About | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Learn about Gonzalo Herrera’s approach to frontend engineering, technical leadership, Angular architecture and AI-augmented software development.',
    );

    await router.navigateByUrl('/es/about');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Sobre mí | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Conoce el enfoque de Gonzalo Herrera sobre ingeniería frontend, liderazgo técnico, arquitectura Angular y desarrollo de software asistido por IA.',
    );
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);

    await router.navigateByUrl('/en/experience');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Experience | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Explore Gonzalo Herrera’s experience in frontend engineering, Angular architecture, technical leadership and AI-augmented software development.',
    );

    await router.navigateByUrl('/es/experience');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Experiencia | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Conoce la experiencia de Gonzalo Herrera en ingeniería frontend, arquitectura Angular, liderazgo técnico y desarrollo de software asistido por IA.',
    );

    await router.navigateByUrl('/en/projects');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Projects | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Explore projects by Gonzalo Herrera focused on Angular, design systems, developer experience and AI-augmented software engineering.',
    );

    await router.navigateByUrl('/es/projects');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Proyectos | Gonzalo Herrera');

    await router.navigateByUrl('/en/projects/angular-design-system');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Angular Design System | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toContain(
      'A reusable Angular Design System',
    );

    await router.navigateByUrl('/es/projects/angular-design-system');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Angular Design System | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toContain('Un Design System reutilizable');

    await router.navigateByUrl('/en/projects/unknown-project');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Project not found | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toBe(
      'The requested portfolio project could not be found.',
    );

    await router.navigateByUrl('/es/projects/unknown-project');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Proyecto no encontrado | Gonzalo Herrera');
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);

    await router.navigateByUrl('/es/unknown');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Página no encontrada | Gonzalo Herrera');
  });
});
