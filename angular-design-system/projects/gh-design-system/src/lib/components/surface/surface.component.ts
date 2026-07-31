import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhSurfacePadding, GhSurfaceRadius, GhSurfaceVariant } from './surface.types';

@Component({
  selector: 'gh-surface',
  standalone: true,
  templateUrl: './surface.component.html',
  styleUrl: './surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-interactive]': 'interactive() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
  },
})
export class GhSurfaceComponent {
  readonly variant = input<GhSurfaceVariant>('solid');
  readonly padding = input<GhSurfacePadding>('md');
  readonly radius = input<GhSurfaceRadius>('default');
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
}
