import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhCardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [GhCardComponent],
  template: `
    <gh-card
      [variant]="variant()"
      [padding]="padding()"
      [radius]="radius()"
      [interactive]="interactive()"
      [selected]="selected()"
      [fullHeight]="fullHeight()"
      ariaLabel="Design system card"
    >
      <div ghCardMedia data-testid="media">Media</div>
      <header ghCardHeader data-testid="header">Header</header>
      <div ghCardContent data-testid="content">Content</div>
      <p data-testid="default">Default content</p>
      <footer ghCardFooter data-testid="footer">Footer</footer>
    </gh-card>
  `,
})
class CardTestHost {
  readonly variant = signal<'outlined' | 'elevated' | 'subtle' | 'glass'>('outlined');
  readonly padding = signal<'none' | 'sm' | 'md' | 'lg'>('md');
  readonly radius = signal<'sm' | 'md' | 'lg' | 'xl'>('lg');
  readonly interactive = signal(false);
  readonly selected = signal(false);
  readonly fullHeight = signal(false);
}

describe('GhCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTestHost],
    }).compileComponents();
  });

  it('renders projected zones with non-interactive defaults', () => {
    const fixture = TestBed.createComponent(CardTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article.gh-card');

    expect(card).not.toBeNull();
    expect(card?.classList).toContain('gh-card--outlined');
    expect(card?.classList).toContain('gh-card--padding-md');
    expect(card?.classList).toContain('gh-card--radius-lg');
    expect(card?.getAttribute('aria-label')).toBe('Design system card');
    expect(card?.hasAttribute('tabindex')).toBe(false);
    expect(card?.getAttribute('role')).toBeNull();
    expect(element.querySelector('[data-testid="media"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="header"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="content"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="default"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="footer"]')).not.toBeNull();
  });

  it('applies variants, padding and radius inputs', () => {
    const fixture = TestBed.createComponent(CardTestHost);
    const host = fixture.componentInstance;

    host.variant.set('glass');
    host.padding.set('none');
    host.radius.set('xl');
    fixture.detectChanges();

    const card = (fixture.nativeElement as HTMLElement).querySelector('.gh-card');

    expect(card?.classList).toContain('gh-card--glass');
    expect(card?.classList).toContain('gh-card--padding-none');
    expect(card?.classList).toContain('gh-card--radius-xl');
  });

  it('applies visual interactive, selected and full-height states without changing semantics', () => {
    const fixture = TestBed.createComponent(CardTestHost);
    const host = fixture.componentInstance;

    host.interactive.set(true);
    host.selected.set(true);
    host.fullHeight.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const component = element.querySelector('gh-card');
    const card = element.querySelector('article.gh-card');

    expect(card?.classList).toContain('gh-card--interactive');
    expect(card?.classList).toContain('gh-card--selected');
    expect(card?.classList).toContain('gh-card--full-height');
    expect(component?.classList).toContain('gh-card-host--full-height');
    expect(card?.hasAttribute('tabindex')).toBe(false);
    expect(element.querySelector('button')).toBeNull();
    expect(element.querySelector('a')).toBeNull();
  });
});
