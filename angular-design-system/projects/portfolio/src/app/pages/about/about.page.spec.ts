import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { AboutPage } from './about.page';

describe('AboutPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AboutPage] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.lang = 'en';
  });

  it('renders the complete English composition with one h1', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Engineering, leadership and better ways of building software.',
    );
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('#professional-story')).not.toBeNull();
    expect(element.querySelector('#engineering-philosophy')).not.toBeNull();
    expect(element.querySelector('#leadership-approach')).not.toBeNull();
    expect(element.querySelector('#ai-augmented-engineering')).not.toBeNull();
    expect(element.querySelector('#core-principles')).not.toBeNull();
    expect(element.querySelector('#technical-focus')).not.toBeNull();
    expect(element.querySelector('#working-style')).not.toBeNull();
    expect(element.querySelector('gh-contact-callout#about-contact')).not.toBeNull();
    expect(element.textContent).not.toContain('PR 13');
  });

  it('reacts to the active locale without manual subscriptions', () => {
    const fixture = TestBed.createComponent(AboutPage);
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain(
      'Ingeniería, liderazgo y mejores formas de construir software.',
    );
    expect(element.textContent).toContain('Cómo entiendo la ingeniería de software');
    expect(element.textContent).toContain('Construyamos algo mejor.');
    expect(element.querySelectorAll('h1')).toHaveLength(1);
  });

  it('keeps About calls to action localized', () => {
    const fixture = TestBed.createComponent(AboutPage);
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    fixture.detectChanges();

    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a'),
    ];
    expect(links.find((link) => link.textContent?.includes('Ver mi experiencia'))?.pathname).toBe(
      '/es/experience',
    );
    expect(links.find((link) => link.textContent?.includes('Contactarme'))?.pathname).toBe(
      '/es/contact',
    );
    expect(links.find((link) => link.textContent?.includes('Ver experiencia'))?.pathname).toBe(
      '/es/experience',
    );
  });
});
