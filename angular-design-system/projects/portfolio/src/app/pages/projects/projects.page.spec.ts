import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ProjectsPage } from './projects.page';

describe('ProjectsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsPage] }).compileComponents();
  });

  it('renders the complete English page with one h1 and editorial project order', () => {
    const fixture = TestBed.createComponent(ProjectsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll('gh-project-card');

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Building systems, tools and ideas');
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.textContent).toContain('Reusable foundations and practical engineering ideas');
    expect(cards).toHaveLength(4);
    expect(cards[0]?.textContent).toContain('Angular Design System');
    expect(cards[1]?.textContent).toContain('AI Code Review Assistant');
    expect(cards[2]?.textContent).toContain('Angular Accelerator Kit');
    expect(cards[3]?.textContent).toContain('AI Toolkit for Developers');
    expect(element.querySelectorAll('gh-project-card h3')).toHaveLength(4);
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/en/projects/angular-design-system"]'),
    ).not.toBeNull();
    expect(element.querySelectorAll('.project-card__actions a')).toHaveLength(1);
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/contact"]')).not.toBeNull();
    expect(element.innerHTML).not.toContain('example.com');
  });

  it('reacts to Spanish locale with localized statuses, links and content parity', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    const fixture = TestBed.createComponent(ProjectsPage);
    fixture.detectChanges();

    localeService.activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Construyendo sistemas, herramientas e ideas',
    );
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(4);
    expect(element.textContent).toContain('En desarrollo');
    expect(element.textContent).toContain('Concepto');
    expect(element.textContent).toContain('Ingeniería con IA');
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/es/projects/angular-design-system"]'),
    ).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/contact"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/experience"]')).not.toBeNull();
  });
});
