import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhExperienceCardComponent } from '../../components/cards/experience-card/experience-card.component';
import type { GhExperienceCardData } from '../../components/cards/experience-card/experience-card.types';
import type { GhExperienceTimelineOrientation } from './experience-timeline.types';

@Component({
  selector: 'gh-experience-timeline',
  standalone: true,
  imports: [GhExperienceCardComponent],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-experience-timeline',
    '[class.gh-experience-timeline--vertical]': 'orientation() === "vertical"',
    '[class.gh-experience-timeline--compact]': 'orientation() === "compact"',
    '[class.gh-experience-timeline--connector]': 'showConnector()',
  },
})
export class GhExperienceTimelineComponent {
  readonly experiences = input.required<readonly GhExperienceCardData[]>();
  readonly orientation = input<GhExperienceTimelineOrientation>('vertical');
  readonly showConnector = input(true, { transform: booleanAttribute });
}
