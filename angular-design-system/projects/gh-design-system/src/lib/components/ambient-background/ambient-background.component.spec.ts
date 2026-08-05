import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhAmbientBackgroundComponent } from './ambient-background.component';
import {
  GH_AMBIENT_INTENSITIES,
  GH_AMBIENT_PRESETS,
  type GhAmbientIntensity,
  type GhAmbientPreset,
} from './ambient-background.types';

@Component({
  standalone: true,
  imports: [GhAmbientBackgroundComponent],
  template: `
    <gh-ambient-background [preset]="preset()" [intensity]="intensity()">
      <h2 data-testid="heading">Projected heading</h2>
      <button data-testid="action" type="button">Projected action</button>
    </gh-ambient-background>
  `,
})
class AmbientBackgroundTestHost {
  readonly preset = signal<GhAmbientPreset>('subtle');
  readonly intensity = signal<GhAmbientIntensity>('default');
}

describe('GhAmbientBackgroundComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientBackgroundTestHost],
    }).compileComponents();
  });

  it('uses the safe environmental defaults without adding semantics', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundTestHost);
    fixture.detectChanges();

    const host = (fixture.nativeElement as HTMLElement).querySelector(
      'gh-ambient-background',
    ) as HTMLElement;

    expect(host.dataset['preset']).toBe('subtle');
    expect(host.dataset['intensity']).toBe('default');
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.hasAttribute('tabindex')).toBe(false);
  });

  it('projects content without changing its semantics or keyboard behavior', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const heading = element.querySelector('[data-testid="heading"]');
    const action = element.querySelector('[data-testid="action"]');

    expect(heading?.tagName).toBe('H2');
    expect(action?.tagName).toBe('BUTTON');
    expect(action?.getAttribute('type')).toBe('button');
  });

  it('keeps its single visual layer decorative and non-focusable', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundTestHost);
    fixture.detectChanges();

    const visual = (fixture.nativeElement as HTMLElement).querySelector(
      '.gh-ambient-background__visual',
    ) as HTMLElement;

    expect(visual.getAttribute('aria-hidden')).toBe('true');
    expect(visual.hasAttribute('role')).toBe(false);
    expect(visual.hasAttribute('tabindex')).toBe(false);
    expect(visual.children.length).toBe(0);
  });

  it('exposes every supported preset as a stable data attribute', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundTestHost);
    const host = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-ambient-background') as HTMLElement;

    for (const preset of GH_AMBIENT_PRESETS) {
      fixture.componentInstance.preset.set(preset);
      fixture.detectChanges();
      expect(host().dataset['preset']).toBe(preset);
    }
  });

  it('exposes every supported intensity as a stable data attribute', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundTestHost);
    const host = () =>
      (fixture.nativeElement as HTMLElement).querySelector('gh-ambient-background') as HTMLElement;

    for (const intensity of GH_AMBIENT_INTENSITIES) {
      fixture.componentInstance.intensity.set(intensity);
      fixture.detectChanges();
      expect(host().dataset['intensity']).toBe(intensity);
    }
  });

  it('uses OnPush change detection', () => {
    const definition = GhAmbientBackgroundComponent as unknown as {
      ɵcmp: { readonly onPush: boolean };
    };

    expect(definition.ɵcmp.onPush).toBe(true);
  });
});
