import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhArticleCardComponent } from './article-card.component';
import type { GhArticleCardData } from './article-card.types';

@Component({
  standalone: true,
  imports: [GhArticleCardComponent],
  template: `<gh-article-card [article]="article()" />`,
})
class ArticleCardTestHost {
  readonly article = signal<GhArticleCardData>({
    title: 'Signal Forms in practice',
    href: 'https://example.com/article',
    excerpt: 'A practical guide to typed Angular forms.',
    imageSrc: '/article.jpg',
    imageAlt: 'Angular form interface',
    publishedAt: 'July 2026',
    readingTime: '6 min read',
    category: 'Angular',
    external: true,
    featured: true,
  });
}

describe('GhArticleCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardTestHost],
    }).compileComponents();
  });

  it('renders article content, metadata and a safe native external link', () => {
    const fixture = TestBed.createComponent(ArticleCardTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector<HTMLAnchorElement>('h2 a');
    const image = element.querySelector<HTMLImageElement>('img');

    expect(element.querySelector('article.gh-card')).not.toBeNull();
    expect(link?.textContent).toContain('Signal Forms in practice');
    expect(link?.href).toBe('https://example.com/article');
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toContain('noopener');
    expect(link?.rel).toContain('noreferrer');
    expect(link?.getAttribute('aria-label')).toContain('opens in a new tab');
    expect(element.querySelector('.article-card__excerpt')?.textContent).toContain(
      'practical guide',
    );
    expect(element.querySelector('.article-card__metadata')?.textContent).toContain('6 min read');
    expect(element.querySelector('.gh-badge--accent')?.textContent).toContain('Angular');
    expect(element.querySelector('.gh-badge--info')?.textContent).toContain('Featured');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.alt).toBe('Angular form interface');
  });

  it('supports an article without image or optional metadata', () => {
    const fixture = TestBed.createComponent(ArticleCardTestHost);
    fixture.componentInstance.article.set({
      title: 'Design systems',
      href: '/articles/design-systems',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector<HTMLAnchorElement>('h2 a');

    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('.article-card__excerpt')).toBeNull();
    expect(element.querySelector('.article-card__metadata')).toBeNull();
    expect(link?.getAttribute('target')).toBeNull();
    expect(link?.getAttribute('rel')).toBeNull();
    expect(link?.getAttribute('aria-label')).toBeNull();
  });
});
