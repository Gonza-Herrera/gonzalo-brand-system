import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhBadgeComponent } from './badge.component';

@Component({
  standalone: true,
  imports: [GhBadgeComponent],
  template: `
    <gh-badge
      [variant]="variant()"
      [size]="size()"
      [appearance]="appearance()"
      [rounded]="rounded()"
    >
      <svg ghBadgeIconStart data-testid="badge-icon"></svg>
      Ready
    </gh-badge>
  `,
})
class BadgeTestHost {
  readonly variant = signal<'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent'>(
    'neutral',
  );
  readonly size = signal<'sm' | 'md'>('md');
  readonly appearance = signal<'soft' | 'solid'>('soft');
  readonly rounded = signal<'default' | 'pill'>('pill');
}

describe('GhBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeTestHost],
    }).compileComponents();
  });

  it('renders projected content with non-interactive defaults', () => {
    const fixture = TestBed.createComponent(BadgeTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const badge = element.querySelector('.gh-badge');

    expect(badge?.tagName).toBe('SPAN');
    expect(badge?.textContent).toContain('Ready');
    expect(badge?.classList).toContain('gh-badge--neutral');
    expect(badge?.classList).toContain('gh-badge--md');
    expect(badge?.classList).toContain('gh-badge--soft');
    expect(badge?.classList).toContain('gh-badge--rounded-pill');
    expect(element.querySelector('button')).toBeNull();
    expect(badge?.getAttribute('role')).toBeNull();
  });

  it('applies variant, size, appearance and rounded inputs', () => {
    const fixture = TestBed.createComponent(BadgeTestHost);
    const host = fixture.componentInstance;

    host.variant.set('warning');
    host.size.set('sm');
    host.appearance.set('solid');
    host.rounded.set('default');
    fixture.detectChanges();

    const badge = (fixture.nativeElement as HTMLElement).querySelector('.gh-badge');

    expect(badge?.classList).toContain('gh-badge--warning');
    expect(badge?.classList).toContain('gh-badge--sm');
    expect(badge?.classList).toContain('gh-badge--solid');
    expect(badge?.classList).toContain('gh-badge--rounded-default');
  });

  it('projects an optional decorative start indicator', () => {
    const fixture = TestBed.createComponent(BadgeTestHost);
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '.gh-badge__icon [data-testid="badge-icon"]',
      ),
    ).not.toBeNull();
  });
});
