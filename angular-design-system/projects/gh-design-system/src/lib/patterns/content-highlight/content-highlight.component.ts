import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhBadgeComponent } from '../../components/badge/badge.component';
import { GhCardComponent } from '../../components/cards/card/card.component';
import { GhTagComponent } from '../../components/tag/tag.component';
import { GhClusterComponent } from '../../layout/cluster/cluster.component';
import { GhStackComponent } from '../../layout/stack/stack.component';
import type {
  GhContentHighlightData,
  GhContentHighlightHeadingLevel,
  GhContentHighlightOrientation,
  GhContentHighlightSurface,
  GhContentHighlightTypeLabels,
} from './content-highlight.types';

const DEFAULT_TYPE_LABELS: GhContentHighlightTypeLabels = {
  article: 'Article',
  project: 'Project',
  linkedin: 'LinkedIn',
  resource: 'Resource',
  talk: 'Talk',
};

@Component({
  selector: 'gh-content-highlight',
  standalone: true,
  imports: [
    GhBadgeComponent,
    GhCardComponent,
    GhClusterComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './content-highlight.component.html',
  styleUrl: './content-highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-content-highlight',
    '[class.gh-content-highlight--horizontal]': 'orientation() === "horizontal"',
    '[class.gh-content-highlight--vertical]': 'orientation() === "vertical"',
    '[class.gh-content-highlight--surface-default]': 'surface() === "default"',
    '[class.gh-content-highlight--surface-accent]': 'surface() === "accent"',
    '[class.gh-content-highlight--surface-gradient]': 'surface() === "gradient"',
  },
})
export class GhContentHighlightComponent {
  readonly content = input.required<GhContentHighlightData>();
  readonly orientation = input<GhContentHighlightOrientation>('horizontal');
  readonly surface = input<GhContentHighlightSurface>('default');
  readonly headingLevel = input<GhContentHighlightHeadingLevel>(2);
  readonly typeLabels = input<GhContentHighlightTypeLabels>(DEFAULT_TYPE_LABELS);
  readonly tagsLabel = input('Content tags');
  readonly externalLinkLabel = input('opens in a new tab');
}
