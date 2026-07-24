import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ExperiencePage } from './experience.page';

describe('ExperiencePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExperiencePage] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.lang = 'en';
  });

  it('renders the complete English composition with one h1 and all stable sections', () => {
    const fixture = TestBed.createComponent(ExperiencePage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Building frontend products, engineering systems and stronger teams.',
    );
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('#career-summary')).not.toBeNull();
    expect(element.querySelector('#professional-experience')).not.toBeNull();
    expect(element.querySelector('#leadership-impact')).not.toBeNull();
    expect(element.querySelector('#ways-of-working')).not.toBeNull();
    expect(element.querySelector('#capabilities')).not.toBeNull();
    expect(element.querySelector('#career-direction')).not.toBeNull();
    expect(element.querySelector('gh-contact-callout#contact')).not.toBeNull();
    expect(element.querySelector('gh-experience-timeline')).not.toBeNull();
    const experienceCards = [...element.querySelectorAll('gh-experience-card')];
    expect(experienceCards).toHaveLength(5);
    expect(experienceCards[0]?.textContent).toContain('ICBC Bank');
    expect(experienceCards[0]?.textContent).toContain('February 2023 — Present');
    expect(experienceCards[0]?.textContent).toContain('Current');
    expect(experienceCards.at(-1)?.textContent).toContain('Develative');
    expect(experienceCards.at(-1)?.textContent).toContain('Project Manager');
    expect(element.textContent).toContain('Responsibilities');
    expect(element.textContent).toContain('Technologies');
    expect(element.textContent).toContain('Capabilities');
    expect(element.textContent).not.toContain('approved repository source');
    expect(element.textContent).not.toContain('PR 14');
  });

  it('reacts to Spanish locale changes without subscriptions or structural drift', () => {
    const fixture = TestBed.createComponent(ExperiencePage);
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Construyendo productos frontend, sistemas de ingeniería y equipos más sólidos.',
    );
    expect(element.textContent).toContain('Impacto más allá de la implementación');
    expect(element.textContent).toContain('Hacia dónde conduce esta experiencia');
    const experienceCards = [...element.querySelectorAll('gh-experience-card')];
    expect(experienceCards).toHaveLength(5);
    expect(experienceCards[0]?.textContent).toContain('Banco ICBC');
    expect(experienceCards[0]?.textContent).toContain('Febrero de 2023 — Actualidad');
    expect(experienceCards[0]?.textContent).toContain('Actualidad');
    expect(experienceCards.at(-1)?.textContent).toContain('Project Manager');
    expect(element.textContent).toContain('Responsabilidades');
    expect(element.textContent).toContain('Tecnologías');
    expect(element.textContent).toContain('Capacidades');
    expect(element.textContent).not.toContain('fuente aprobada del repositorio');
  });

  it('keeps every Experience action localized and native', () => {
    const fixture = TestBed.createComponent(ExperiencePage);
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    fixture.detectChanges();

    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a'),
    ];
    expect(links.find((link) => link.textContent?.includes('Explorar proyectos'))?.pathname).toBe(
      '/es/projects',
    );
    expect(links.find((link) => link.textContent?.includes('Contactarme'))?.pathname).toBe(
      '/es/contact',
    );
    expect(links.find((link) => link.textContent?.includes('Ver proyectos'))?.pathname).toBe(
      '/es/projects',
    );
    expect(links.every((link) => link.tagName === 'A')).toBe(true);
  });
});
