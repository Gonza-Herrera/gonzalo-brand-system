import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhSurfaceComponent } from '../surface/surface.component';
import type { GhSurfacePadding, GhSurfaceRadius } from '../surface/surface.types';
import type { GhGlassPanelVariant } from './glass-panel.types';

@Component({
  selector: 'gh-glass-panel',
  standalone: true,
  imports: [GhSurfaceComponent],
  templateUrl: './glass-panel.component.html',
  styleUrl: './glass-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhGlassPanelComponent {
  readonly variant = input<GhGlassPanelVariant>('glass');
  readonly padding = input<GhSurfacePadding>('md');
  readonly radius = input<GhSurfaceRadius>('default');
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
}
