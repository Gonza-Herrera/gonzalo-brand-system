import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhArticleCardComponent } from './article-card.component';
import type { GhArticleCardData } from './article-card.types';

@Component({
  standalone: true,
  imports: [GhArticleCardComponent],
  template: `
    <gh-article-card
      [article]="article()"
      [headingLevel]="headingLevel()"
      [articleLabel]="articleLabel()"
      [featuredLabel]="featuredLabel()"
      [topicsLabel]="topicsLabel()"
      [externalLinkLabel]="externalLinkLabel()"
    />
  `,
})
class ArticleCardTestHost {
  readonly headingLevel = signal<2 | 3>(2);
  readonly articleLabel = signal('Article');
  readonly featuredLabel = signal('Featured');
  readonly topicsLabel = signal('Topics');
  readonly externalLinkLabel = signal('opens in a new tab');
  readonly article = signal<GhArticleCardData>({
    title: 'Signal Forms in practice',
    href: 'https://example.com/article',
    excerpt: 'A practical guide to typed Angular forms.',
    imageSrc: '/article.jpg',
    imageAlt: 'Angular form interface',
    imageWidth: 1200,
    imageHeight: 675,
    publishedAt: 'July 2026',
    publishedAtDateTime: '2026-07',
    readingTime: '6 min read',
    type: 'Guide',
    category: 'Angular',
    tags: ['Signals', 'Forms'],
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
    expect(element.querySelector('.gh-badge--accent')?.textContent).toContain('Guide');
    expect(element.querySelector('.gh-badge--neutral')?.textContent).toContain('Angular');
    expect(element.querySelector('.gh-badge--info')?.textContent).toContain('Featured');
    expect(element.querySelectorAll('gh-tag')).toHaveLength(2);
    expect(element.querySelector('time')?.getAttribute('datetime')).toBe('2026-07');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.alt).toBe('Angular form interface');
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(675);
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

  it('localizes card labels and supports an h3 in page compositions', () => {
    const fixture = TestBed.createComponent(ArticleCardTestHost);
    fixture.componentInstance.headingLevel.set(3);
    fixture.componentInstance.articleLabel.set('Contenido');
    fixture.componentInstance.featuredLabel.set('Destacado');
    fixture.componentInstance.topicsLabel.set('Temas');
    fixture.componentInstance.externalLinkLabel.set('se abre en una pestaña nueva');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('h3')?.textContent).toContain('Signal Forms');
    expect(element.querySelector('article')?.getAttribute('aria-label')).toContain('Contenido');
    expect(element.querySelector('.gh-badge--info')?.textContent).toContain('Destacado');
    expect(element.querySelector('ul')?.getAttribute('aria-label')).toBe('Temas');
    expect(element.querySelector('h3 a')?.getAttribute('aria-label')).toContain(
      'se abre en una pestaña nueva',
    );
  });
});
