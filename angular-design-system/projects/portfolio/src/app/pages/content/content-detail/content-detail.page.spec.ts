import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';
import { ContentDetailPage } from './content-detail.page';

describe('ContentDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContentDetailPage] }).compileComponents();
  });

  it('renders a complete typed English article with semantic editorial blocks', () => {
    const fixture = TestBed.createComponent(ContentDetailPage);
    fixture.componentRef.setInput('slug', 'angular-14-vs-angular-20');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Angular 14 vs Angular 20');
    expect(element.querySelector('article')).not.toBeNull();
    expect(element.querySelectorAll('ol')).toHaveLength(1);
    expect(element.querySelector('pre code')?.textContent).toContain(
      'signal<PortfolioContentFilter>',
    );
    expect(element.querySelector('pre code portfoliocontentfilter')).toBeNull();
    expect(element.querySelector('table caption')?.textContent).toContain(
      'Architecture comparison',
    );
    expect(element.querySelectorAll('table thead th')).toHaveLength(3);
    expect(element.textContent).toContain('Key takeaways');
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(2);
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/content"]')).not.toBeNull();
  });

  it('renders the same slug from the Spanish detail registry', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    const fixture = TestBed.createComponent(ContentDetailPage);
    fixture.componentRef.setInput('slug', 'angular-14-vs-angular-20');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('revisión de arquitectura');
    expect(element.textContent).toContain('Ideas principales');
    expect(element.querySelector('table caption')?.textContent).toContain(
      'Comparación de arquitectura',
    );
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/content"]')).not.toBeNull();
  });

  it('renders text, lists and callouts while omitting unavailable blocks', () => {
    const fixture = TestBed.createComponent(ContentDetailPage);
    fixture.componentRef.setInput('slug', 'lessons-from-code-reviews');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Review for understanding');
    expect(element.querySelectorAll('.content-detail__list')).toHaveLength(3);
    expect(element.querySelector('gh-card')?.textContent).toContain('A useful standard');
    expect(element.querySelector('pre')).toBeNull();
    expect(element.querySelector('table')).toBeNull();
  });

  it('renders a localized not-found state for unknown or unpublished slugs', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    const fixture = TestBed.createComponent(ContentDetailPage);
    fixture.componentRef.setInput('slug', 'signals-forms-vs-reactive-forms');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Contenido no encontrado');
    expect(element.querySelector('article')).toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/content"]')).not.toBeNull();
  });
});
