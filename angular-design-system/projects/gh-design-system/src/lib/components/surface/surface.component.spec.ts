import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhSurfaceComponent } from './surface.component';
import {
  GH_SURFACE_PADDINGS,
  GH_SURFACE_RADII,
  GH_SURFACE_VARIANTS,
  type GhSurfacePadding,
  type GhSurfaceRadius,
  type GhSurfaceVariant,
} from './surface.types';

@Component({
  standalone: true,
  imports: [GhSurfaceComponent],
  template: `
    <gh-surface
      [variant]="variant()"
      [padding]="padding()"
      [radius]="radius()"
      [interactive]="interactive()"
      [disabled]="disabled()"
    >
      <h2 data-testid="heading">Projected heading</h2>
      <button data-testid="action" type="button">Projected action</button>
    </gh-surface>
  `,
})
class SurfaceTestHost {
  readonly variant = signal<GhSurfaceVariant>('solid');
  readonly padding = signal<GhSurfacePadding>('md');
  readonly radius = signal<GhSurfaceRadius>('default');
  readonly interactive = signal(false);
  readonly disabled = signal(false);
}

describe('GhSurfaceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SurfaceTestHost] }).compileComponents();
  });

  it('uses the safe, non-interactive defaults on the correct host selector', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector('gh-surface');

    expect(surface).not.toBeNull();
    expect(surface?.getAttribute('data-variant')).toBe('solid');
    expect(surface?.getAttribute('data-padding')).toBe('md');
    expect(surface?.getAttribute('data-radius')).toBe('default');
    expect(surface?.hasAttribute('data-interactive')).toBe(false);
    expect(surface?.hasAttribute('data-disabled')).toBe(false);
    expect(surface?.hasAttribute('role')).toBe(false);
    expect(surface?.hasAttribute('tabindex')).toBe(false);
    expect(surface?.hasAttribute('aria-disabled')).toBe(false);
    expect((surface as HTMLElement | null)?.onclick).toBeNull();
  });

  it('projects content without replacing or changing its semantics', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const heading = element.querySelector('[data-testid="heading"]');
    const action = element.querySelector('[data-testid="action"]');

    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent).toContain('Projected heading');
    expect(action?.tagName).toBe('BUTTON');
    expect(action?.getAttribute('type')).toBe('button');
  });

  it('exposes every supported material as a stable data attribute', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    const surface = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-surface') as HTMLElement;

    for (const variant of GH_SURFACE_VARIANTS) {
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      expect(surface().dataset['variant']).toBe(variant);
    }
  });

  it('exposes every supported padding value as a stable data attribute', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    const surface = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-surface') as HTMLElement;

    for (const padding of GH_SURFACE_PADDINGS) {
      fixture.componentInstance.padding.set(padding);
      fixture.detectChanges();

      expect(surface().dataset['padding']).toBe(padding);
    }
  });

  it('exposes every supported radius value as a stable data attribute', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    const surface = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-surface') as HTMLElement;

    for (const radius of GH_SURFACE_RADII) {
      fixture.componentInstance.radius.set(radius);
      fixture.detectChanges();

      expect(surface().dataset['radius']).toBe(radius);
    }
  });

  it('adds visual state attributes without adding control semantics', () => {
    const fixture = TestBed.createComponent(SurfaceTestHost);
    fixture.componentInstance.interactive.set(true);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      'gh-surface',
    ) as HTMLElement;

    expect(surface.dataset['interactive']).toBe('true');
    expect(surface.dataset['disabled']).toBe('true');
    expect(surface.hasAttribute('role')).toBe(false);
    expect(surface.hasAttribute('tabindex')).toBe(false);
    expect(surface.hasAttribute('aria-disabled')).toBe(false);
    expect(surface.onclick).toBeNull();
  });

  it('uses OnPush change detection', () => {
    const definition = GhSurfaceComponent as unknown as {
      ɵcmp: { readonly onPush: boolean };
    };

    expect(definition.ɵcmp.onPush).toBe(true);
  });
});
