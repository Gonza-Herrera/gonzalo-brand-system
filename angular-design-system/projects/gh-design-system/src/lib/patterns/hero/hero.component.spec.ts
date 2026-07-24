import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhHeroComponent, GhHeroVisualDirective } from './hero.component';

@Component({
  standalone: true,
  imports: [GhHeroComponent, GhHeroVisualDirective],
  template: `
    <gh-hero
      eyebrow="Engineering"
      title="Think bigger. Build smarter."
      description="Calm, reusable software foundations."
      layout="split"
      alignment="center"
      surface="glass"
      [headingLevel]="2"
      [actions]="actions"
    >
      <div ghHeroVisual data-testid="visual">Visual composition</div>
    </gh-hero>
  `,
})
class HeroTestHost {
  readonly actions = [
    { label: 'Work', href: '/work', variant: 'primary' as const },
    { label: 'LinkedIn', href: 'https://example.com', external: true },
  ];
}

describe('GhHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTestHost, GhHeroComponent],
    }).compileComponents();
  });

  it('renders semantic content, projected visual and native action links', () => {
    const fixture = TestBed.createComponent(HeroTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.gh-pattern-action');

    expect(element.querySelector('h2')?.textContent).toContain('Think bigger');
    expect(element.textContent).toContain('Engineering');
    expect(element.textContent).toContain('Calm, reusable');
    expect(element.querySelector('[data-testid="visual"]')).not.toBeNull();
    expect(links).toHaveLength(2);
    expect(links[1]?.target).toBe('_blank');
    expect(links[1]?.rel).toContain('noopener');
    expect(element.querySelector('gh-hero')?.classList).toContain('gh-hero--surface-glass');
    expect(element.querySelector('gh-hero')?.classList).toContain('gh-hero--align-center');
  });

  it('defaults to an h1 and omits an empty visual region', () => {
    const fixture = TestBed.createComponent(GhHeroComponent);
    fixture.componentRef.setInput('title', 'Configurable hero');
    fixture.componentRef.setInput('layout', 'content-only');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Configurable hero');
    expect(element.querySelector('.gh-hero__visual')).toBeNull();
    expect(element.querySelector('gh-section')).not.toBeNull();
    expect(element.querySelector('gh-container')).not.toBeNull();
  });
});
