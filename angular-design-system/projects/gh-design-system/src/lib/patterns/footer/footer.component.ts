import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhContainerComponent } from '../../layout/container/container.component';
import { GhGridComponent } from '../../layout/grid/grid.component';
import { GhStackComponent } from '../../layout/stack/stack.component';
import type { GhFooterGroup } from './footer.types';

@Component({
  selector: 'gh-footer',
  standalone: true,
  imports: [GhContainerComponent, GhGridComponent, GhStackComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhFooterComponent {
  readonly brand = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly linkGroups = input<readonly GhFooterGroup[]>([]);
  readonly copyright = input<string | undefined>(undefined);
  readonly showTagline = input(false);
  readonly tagline = input<string | undefined>(undefined);
  readonly externalLinkLabel = input('opens in a new tab');
}
