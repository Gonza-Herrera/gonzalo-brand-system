import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhGlassPanelComponent } from './glass-panel.component';
import { GH_GLASS_PANEL_VARIANTS, type GhGlassPanelVariant } from './glass-panel.types';
import type { GhSurfacePadding, GhSurfaceRadius } from '../surface/surface.types';

@Component({
  standalone: true,
  imports: [GhGlassPanelComponent],
  template: `
    <gh-glass-panel
      [variant]="variant()"
      [padding]="padding()"
      [radius]="radius()"
      [interactive]="interactive()"
      [disabled]="disabled()"
    >
      <p data-testid="content">Panel content</p>
    </gh-glass-panel>
  `,
})
class GlassPanelTestHost {
  readonly variant = signal<GhGlassPanelVariant>('glass');
  readonly padding = signal<GhSurfacePadding>('md');
  readonly radius = signal<GhSurfaceRadius>('default');
  readonly interactive = signal(false);
  readonly disabled = signal(false);
}

describe('GhGlassPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GlassPanelTestHost] }).compileComponents();
  });

  it('composes Surface with the default glass material and projected content', () => {
    const fixture = TestBed.createComponent(GlassPanelTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const surface = element.querySelector('gh-glass-panel > gh-surface');

    expect(surface).not.toBeNull();
    expect(surface?.getAttribute('data-variant')).toBe('glass');
    expect(surface?.getAttribute('data-padding')).toBe('md');
    expect(surface?.getAttribute('data-radius')).toBe('default');
    expect(surface?.querySelector('[data-testid="content"]')?.textContent).toContain(
      'Panel content',
    );
  });

  it('forwards every permitted glass material to Surface', () => {
    const fixture = TestBed.createComponent(GlassPanelTestHost);
    const surface = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-surface') as HTMLElement;

    for (const variant of GH_GLASS_PANEL_VARIANTS) {
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      expect(surface().dataset['variant']).toBe(variant);
    }
  });

  it('forwards spacing, shape and visual states without adding semantics', () => {
    const fixture = TestBed.createComponent(GlassPanelTestHost);
    fixture.componentInstance.padding.set('xl');
    fixture.componentInstance.radius.set('large');
    fixture.componentInstance.interactive.set(true);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector(
      'gh-surface',
    ) as HTMLElement;

    expect(surface.dataset['padding']).toBe('xl');
    expect(surface.dataset['radius']).toBe('large');
    expect(surface.dataset['interactive']).toBe('true');
    expect(surface.dataset['disabled']).toBe('true');
    expect(surface.hasAttribute('role')).toBe(false);
    expect(surface.hasAttribute('tabindex')).toBe(false);
  });

  it('uses OnPush change detection', () => {
    const definition = GhGlassPanelComponent as unknown as {
      ɵcmp: { readonly onPush: boolean };
    };

    expect(definition.ɵcmp.onPush).toBe(true);
  });
});
