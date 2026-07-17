import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhStackComponent } from '../../layout/stack/stack.component';
import type { GhSectionHeadingAlignment, GhSectionHeadingLevel } from './section-heading.types';

@Component({
  selector: 'gh-section-heading',
  standalone: true,
  imports: [GhStackComponent],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-section-heading',
    '[class.gh-section-heading--start]': 'alignment() === "start"',
    '[class.gh-section-heading--center]': 'alignment() === "center"',
  },
})
export class GhSectionHeadingComponent {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly alignment = input<GhSectionHeadingAlignment>('start');
  readonly headingLevel = input<GhSectionHeadingLevel>(2);
}
