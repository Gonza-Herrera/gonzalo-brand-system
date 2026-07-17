import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GhContainerComponent } from '../../layout/container/container.component';
import { GhInlineComponent } from '../../layout/inline/inline.component';
import { GhSectionComponent } from '../../layout/section/section.component';
import { GhStackComponent } from '../../layout/stack/stack.component';
import type {
  GhContactAction,
  GhContactCalloutAlignment,
  GhContactCalloutSurface,
} from './contact-callout.types';

@Component({
  selector: 'gh-contact-callout',
  standalone: true,
  imports: [GhContainerComponent, GhInlineComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './contact-callout.component.html',
  styleUrl: './contact-callout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-contact-callout',
    '[class.gh-contact-callout--start]': 'alignment() === "start"',
    '[class.gh-contact-callout--center]': 'alignment() === "center"',
    '[class.gh-contact-callout--subtle]': 'surface() === "subtle"',
    '[class.gh-contact-callout--accent]': 'surface() === "accent"',
    '[class.gh-contact-callout--gradient]': 'surface() === "gradient"',
  },
})
export class GhContactCalloutComponent {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly actions = input<readonly GhContactAction[]>([]);
  readonly alignment = input<GhContactCalloutAlignment>('center');
  readonly surface = input<GhContactCalloutSurface>('gradient');
  readonly externalLinkLabel = input('opens in a new tab');
}
