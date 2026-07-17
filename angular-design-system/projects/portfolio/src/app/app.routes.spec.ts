import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/routing/portfolio-title.strategy';

describe('Portfolio routing', () => {
  beforeEach(async () => {
    document.documentElement.lang = 'en';

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
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
      { path: '', en: 'Gonzalo Herrera', es: 'Gonzalo Herrera' },
      { path: '/about', en: 'Professional story', es: 'Historia profesional' },
      {
        path: '/experience',
        en: 'Engineering and leadership experience',
        es: 'Experiencia en ingeniería y liderazgo',
      },
      {
        path: '/projects',
        en: 'Selected projects and case studies',
        es: 'Proyectos y casos de estudio seleccionados',
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
      'Professional story',
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

    await router.navigateByUrl('/en/about');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('About | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toContain('professional story');

    await router.navigateByUrl('/es/about');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Sobre mí | Gonzalo Herrera');
    expect(meta.getTag('name="description"')?.content).toContain('historia profesional');
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);

    await router.navigateByUrl('/es/unknown');
    await fixture.whenStable();
    expect(title.getTitle()).toBe('Página no encontrada | Gonzalo Herrera');
  });
});
