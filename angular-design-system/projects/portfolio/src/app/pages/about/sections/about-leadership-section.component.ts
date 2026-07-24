import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhContainerComponent,
  GhFeatureGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioLeadershipContent } from '../../../content/models/about-content.model';

@Component({
  selector: 'app-about-leadership-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhFeatureGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './about-leadership-section.component.html',
  styleUrl: './about-leadership-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutLeadershipSectionComponent {
  readonly content = input.required<PortfolioLeadershipContent>();
  readonly externalLinkLabel = input.required<string>();
}
