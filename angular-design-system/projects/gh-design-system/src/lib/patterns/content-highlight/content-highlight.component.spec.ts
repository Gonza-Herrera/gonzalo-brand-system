import { TestBed } from '@angular/core/testing';

import { GhContentHighlightComponent } from './content-highlight.component';

describe('GhContentHighlightComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhContentHighlightComponent],
    }).compileComponents();
  });

  it('renders editorial content with optional media, metadata and a safe native link', () => {
    const fixture = TestBed.createComponent(GhContentHighlightComponent);
    fixture.componentRef.setInput('content', {
      type: 'article',
      eyebrow: 'Angular',
      title: 'Reactive Forms vs Signal Forms',
      description: 'A practical comparison.',
      href: 'https://example.com/article',
      linkLabel: 'Read the article',
      external: true,
      imageSrc: '/article.svg',
      imageAlt: 'Abstract form controls',
      tags: ['Angular', 'Forms'],
    });
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('surface', 'gradient');
    fixture.componentRef.setInput('headingLevel', 3);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector<HTMLAnchorElement>('.gh-content-highlight__link');

    expect(element.querySelector('gh-card')).not.toBeNull();
    expect(element.querySelector('gh-badge')?.textContent).toContain('Article');
    expect(element.querySelector('h3')?.textContent).toContain('Reactive Forms');
    expect(element.querySelector('img')?.alt).toBe('Abstract form controls');
    expect(element.querySelectorAll('gh-tag')).toHaveLength(2);
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toBe('noopener noreferrer');
    expect(element.classList).toContain('gh-content-highlight--surface-gradient');
  });

  it('does not render absent optional media or tags', () => {
    const fixture = TestBed.createComponent(GhContentHighlightComponent);
    fixture.componentRef.setInput('content', {
      type: 'project',
      title: 'Design System',
      href: '/projects/design-system',
      linkLabel: 'View project',
    });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('gh-tag')).toBeNull();
    expect(element.querySelector('h2')?.textContent).toContain('Design System');
  });
});
