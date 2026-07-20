import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HomePage] }).compileComponents();
  });

  it('composes the complete English Home from public Design System patterns', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Think bigger. Build smarter.');
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('gh-feature-grid')).not.toBeNull();
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(1);
    expect(element.querySelector('gh-experience-timeline')).not.toBeNull();
    expect(element.querySelector('gh-content-highlight')).not.toBeNull();
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/projects"]')).not.toBeNull();
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/en/projects/angular-design-system"]'),
    ).not.toBeNull();
  });

  it('reacts to locale changes with structural and link parity', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    localeService.activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain('Qué ayudo a mejorar en los equipos');
    expect(element.textContent).toContain('En desarrollo');
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(1);
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/es/projects/angular-design-system"]'),
    ).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/projects"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/contact"]')).not.toBeNull();
  });
});
