import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhAmbientIntensity, GhAmbientPreset } from './ambient-background.types';

@Component({
  selector: 'gh-ambient-background',
  standalone: true,
  templateUrl: './ambient-background.component.html',
  styleUrl: './ambient-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-preset]': 'preset()',
    '[attr.data-intensity]': 'intensity()',
  },
})
export class GhAmbientBackgroundComponent {
  readonly preset = input<GhAmbientPreset>('subtle');
  readonly intensity = input<GhAmbientIntensity>('default');
}
