import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhCardComponent } from '../../components/cards/card/card.component';
import { GhGridComponent } from '../../layout/grid/grid.component';
import { GhStackComponent } from '../../layout/stack/stack.component';
import type {
  GhFeatureGridColumns,
  GhFeatureGridVariant,
  GhFeatureItem,
} from './feature-grid.types';

@Component({
  selector: 'gh-feature-grid',
  standalone: true,
  imports: [GhCardComponent, GhGridComponent, GhStackComponent],
  templateUrl: './feature-grid.component.html',
  styleUrl: './feature-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-feature-grid',
    '[class.gh-feature-grid--cards]': 'variant() === "cards"',
    '[class.gh-feature-grid--minimal]': 'variant() === "minimal"',
  },
})
export class GhFeatureGridComponent {
  readonly features = input.required<readonly GhFeatureItem[]>();
  readonly columns = input<GhFeatureGridColumns>('auto');
  readonly variant = input<GhFeatureGridVariant>('cards');
  readonly externalLinkLabel = input('opens in a new tab');
}
