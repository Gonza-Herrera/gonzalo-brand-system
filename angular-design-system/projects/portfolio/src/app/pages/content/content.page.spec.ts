import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ContentPage } from './content.page';

describe('ContentPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContentPage] }).compileComponents();
  });

  it('renders the complete English Hub with one h1 and public Design System composition', () => {
    const fixture = TestBed.createComponent(ContentPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Ideas, lessons');
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('gh-content-highlight')).not.toBeNull();
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(3);
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(element.textContent).not.toContain('Signal Forms vs Reactive Forms');
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/contact"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/projects"]')).not.toBeNull();
  });

  it('filters published cards with native accessible buttons', () => {
    const fixture = TestBed.createComponent(ContentPage);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const buttons = [...element.querySelectorAll<HTMLButtonElement>('.content-filters button')];
    const angular = buttons.find((button) => button.textContent?.trim() === 'Angular');

    expect(buttons).toHaveLength(4);
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true');
    angular?.click();
    fixture.detectChanges();

    expect(angular?.getAttribute('aria-pressed')).toBe('true');
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(1);
    expect(element.querySelector('gh-article-card')?.textContent).toContain('Angular 14');
  });

  it('renders the localized empty state and resets to all published content', () => {
    const fixture = TestBed.createComponent(ContentPage);
    fixture.detectChanges();

    fixture.componentInstance.setFilter('developer-experience');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(0);
    expect(element.querySelector('[role="status"]')?.textContent).toContain('No content found');

    element.querySelector<HTMLButtonElement>('.content-empty button')?.click();
    fixture.detectChanges();
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(3);
  });

  it('reacts to Spanish locale with localized filters, links and content', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    const fixture = TestBed.createComponent(ContentPage);
    fixture.detectChanges();

    localeService.activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Ideas, aprendizajes');
    expect(element.textContent).toContain('Liderazgo Técnico');
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(3);
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/es/content/building-ai-agents"]'),
    ).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/contact"]')).not.toBeNull();
  });
});
