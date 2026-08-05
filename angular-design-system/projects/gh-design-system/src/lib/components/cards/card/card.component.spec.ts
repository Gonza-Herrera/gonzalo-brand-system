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
      <footer ghCardFooter data-testid="footer">
        Footer
        @if (withActions()) {
          <a href="/details">Details</a>
          <button type="button">Native action</button>
        }
      </footer>
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
  readonly withActions = signal(false);
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
    expect(card?.getAttribute('data-variant')).toBe('outlined');
    expect(card?.getAttribute('data-padding')).toBe('md');
    expect(card?.getAttribute('data-radius')).toBe('lg');
    expect(card?.hasAttribute('tabindex')).toBe(false);
    expect(card?.getAttribute('role')).toBeNull();
    expect(element.querySelector('[data-testid="media"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="header"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="content"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="default"]')).not.toBeNull();
    expect(element.querySelector('[data-testid="footer"]')).not.toBeNull();
  });

  it.each(['outlined', 'elevated', 'subtle', 'glass'] as const)(
    'reflects the %s material without changing article semantics',
    (variant) => {
      const fixture = TestBed.createComponent(CardTestHost);
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      const card = (fixture.nativeElement as HTMLElement).querySelector('article.gh-card');
      expect(card?.classList).toContain(`gh-card--${variant}`);
      expect(card?.getAttribute('data-variant')).toBe(variant);
      expect(card?.getAttribute('role')).toBeNull();
      expect(card?.hasAttribute('tabindex')).toBe(false);
    },
  );

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
    expect(card?.getAttribute('data-interactive')).toBe('true');
    expect(card?.getAttribute('data-selected')).toBe('true');
    expect(card?.getAttribute('data-full-height')).toBe('true');
    expect(card?.getAttribute('aria-selected')).toBeNull();
    expect(element.querySelector('button')).toBeNull();
    expect(element.querySelector('a')).toBeNull();
  });

  it('keeps projected links and buttons native and in their footer slot', () => {
    const fixture = TestBed.createComponent(CardTestHost);
    fixture.componentInstance.withActions.set(true);
    fixture.componentInstance.interactive.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const footer = element.querySelector('.gh-card__footer');
    const link = footer?.querySelector('a');
    const button = footer?.querySelector<HTMLButtonElement>('button');

    expect(link?.getAttribute('href')).toBe('/details');
    expect(button?.type).toBe('button');
    expect(element.querySelector('article')?.getAttribute('role')).toBeNull();
    expect(element.querySelector('article')?.hasAttribute('tabindex')).toBe(false);
    expect(element.querySelector('a button, button a')).toBeNull();
  });

  it('keeps media, header, content, default content and footer in DOM order', () => {
    const fixture = TestBed.createComponent(CardTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const projected = ['media', 'header', 'content', 'default', 'footer'].map((testId) =>
      element.querySelector(`[data-testid="${testId}"]`),
    );

    expect(projected.every((node) => node !== null)).toBe(true);

    for (let index = 1; index < projected.length; index += 1) {
      const previousNode = projected[index - 1];
      const currentNode = projected[index];

      if (!previousNode || !currentNode) {
        throw new Error('Expected every projected Card slot to be rendered.');
      }

      expect(
        Boolean(
          previousNode.compareDocumentPosition(currentNode) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ).toBe(true);
    }
  });
});
