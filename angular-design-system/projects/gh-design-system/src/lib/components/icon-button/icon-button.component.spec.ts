import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhIconButtonComponent } from './icon-button.component';

@Component({
  standalone: true,
  imports: [GhIconButtonComponent],
  template: `
    <span id="external-label">Open navigation</span>
    <gh-icon-button
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [loading]="loading()"
      [aria-label]="ariaLabel()"
      [aria-labelledby]="ariaLabelledby()"
      [aria-expanded]="ariaExpanded()"
      [aria-controls]="ariaControls()"
      (click)="handleClick()"
    >
      <svg data-testid="icon"></svg>
    </gh-icon-button>
  `,
})
class IconButtonTestHost {
  readonly variant = signal<'primary' | 'secondary' | 'ghost' | 'danger'>('secondary');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly ariaLabel = signal<string | undefined>('Open navigation');
  readonly ariaLabelledby = signal<string | undefined>(undefined);
  readonly ariaExpanded = signal<boolean | undefined>(undefined);
  readonly ariaControls = signal<string | undefined>(undefined);
  clickCount = 0;

  handleClick(): void {
    this.clickCount += 1;
  }
}

describe('GhIconButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IconButtonTestHost] }).compileComponents();
  });

  it('renders a native button with compact defaults and the consumer accessible name', () => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('button');

    expect(button?.type).toBe('button');
    expect(button?.getAttribute('aria-label')).toBe('Open navigation');
    expect(button?.getAttribute('data-variant')).toBe('secondary');
    expect(button?.getAttribute('data-size')).toBe('md');
    expect(button?.getAttribute('role')).toBeNull();
    expect(button?.getAttribute('tabindex')).toBeNull();
    expect(element.querySelector('.gh-icon-button__content [data-testid="icon"]')).not.toBeNull();
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'reflects the %s variant without changing semantics',
    (variant) => {
      const fixture = TestBed.createComponent(IconButtonTestHost);
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      const button = (fixture.nativeElement as HTMLElement).querySelector('button');
      expect(button?.classList).toContain(`gh-icon-button--${variant}`);
      expect(button?.getAttribute('data-variant')).toBe(variant);
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('reflects the %s size', (size) => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.componentInstance.size.set(size);
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(button?.classList).toContain(`gh-icon-button--${size}`);
    expect(button?.getAttribute('data-size')).toBe(size);
  });

  it('keeps aria-labelledby supplied by the consumer and does not invent a label', () => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.componentInstance.ariaLabel.set(undefined);
    fixture.componentInstance.ariaLabelledby.set('external-label');
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(button?.getAttribute('aria-label')).toBeNull();
    expect(button?.getAttribute('aria-labelledby')).toBe('external-label');

    fixture.componentInstance.ariaLabelledby.set(undefined);
    fixture.detectChanges();
    expect(button?.getAttribute('aria-labelledby')).toBeNull();
  });

  it('forwards disclosure relationships and exposes focus for composed navigation controls', () => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.componentInstance.ariaExpanded.set(false);
    fixture.componentInstance.ariaControls.set('test-navigation');
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      'button',
    );
    const iconButton = fixture.debugElement.children.find(
      (child) => child.componentInstance instanceof GhIconButtonComponent,
    )?.componentInstance as GhIconButtonComponent | undefined;

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-controls')).toBe('test-navigation');

    iconButton?.focus();
    expect(document.activeElement).toBe(button);
  });

  it('uses native disabled behavior and blocks activation', () => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      'button',
    );
    button?.click();

    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('data-disabled')).toBe('true');
    expect(fixture.componentInstance.clickCount).toBe(0);
  });

  it('preserves its accessible name, size and interaction lock while loading', () => {
    const fixture = TestBed.createComponent(IconButtonTestHost);
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('button');
    button?.click();

    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-label')).toBe('Open navigation');
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(button?.getAttribute('data-loading')).toBe('true');
    expect(element.querySelector('.gh-icon-button__spinner')).not.toBeNull();
    expect(fixture.componentInstance.clickCount).toBe(0);
  });
});
