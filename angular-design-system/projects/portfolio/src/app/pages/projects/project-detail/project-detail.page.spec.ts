import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';
import { ProjectDetailPage } from './project-detail.page';

describe('ProjectDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectDetailPage] }).compileComponents();
  });

  function createDetail(slug: string): ComponentFixture<ProjectDetailPage> {
    const fixture = TestBed.createComponent(ProjectDetailPage);
    fixture.componentRef.setInput('slug', slug);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the complete English Angular Design System case study', () => {
    const fixture = createDetail('angular-design-system');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Angular Design System');
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.textContent).toContain('Project summary');
    expect(element.textContent).toContain('Context');
    expect(element.textContent).toContain('Problem');
    expect(element.textContent).toContain('Goals');
    expect(element.textContent).toContain('Constraints');
    expect(element.textContent).toContain('Role and responsibilities');
    expect(element.textContent).toContain('Approach');
    expect(element.textContent).toContain('Architecture');
    expect(element.querySelectorAll('#decisions gh-card')).toHaveLength(4);
    expect(element.querySelectorAll('#implementation gh-card')).toHaveLength(4);
    expect(element.querySelectorAll('#challenges gh-card')).toHaveLength(4);
    expect(element.querySelectorAll('#results gh-card')).toHaveLength(5);
    expect(element.textContent).toContain('Lessons learned');
    expect(element.textContent).toContain('Next steps');
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(3);
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/projects"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/contact"]')).not.toBeNull();
  });

  it('renders equivalent Spanish content and localized internal links', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    const fixture = createDetail('angular-design-system');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain('Resumen del proyecto');
    expect(element.textContent).toContain('Rol y responsabilidades');
    expect(element.textContent).toContain('Decisiones clave');
    expect(element.textContent).toContain('Resultados actuales');
    expect(element.textContent).toContain('Aprendizajes');
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/projects"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/contact"]')).not.toBeNull();
  });

  it('renders a concise, honest overview for a valid concept without empty case-study sections', () => {
    const fixture = createDetail('ai-code-review-assistant');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('AI Code Review Assistant');
    expect(element.textContent).toContain('Case study not available');
    expect(element.textContent).toContain('documented as a concept');
    expect(element.querySelector('#context')).toBeNull();
    expect(element.querySelector('#decisions')).toBeNull();
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(3);
  });

  it('renders a localized explicit not-found state for an invalid slug', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    const fixture = createDetail('unknown-project');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Proyecto no encontrado');
    expect(element.textContent).toContain('no existe o no está disponible');
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/projects"]')).not.toBeNull();
    expect(element.querySelector('gh-hero')).toBeNull();
    expect(element.querySelector('gh-contact-callout')).toBeNull();
  });
});
