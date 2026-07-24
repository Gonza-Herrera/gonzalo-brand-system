import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhClusterComponent,
  GhContainerComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  GhTagComponent,
} from 'gh-design-system';

import type { PortfolioCareerSummaryContent } from '../../../content/models/experience-content.model';

@Component({
  selector: 'app-experience-summary-section',
  standalone: true,
  imports: [
    GhClusterComponent,
    GhContainerComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './experience-summary-section.component.html',
  styleUrl: './experience-summary-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSummarySectionComponent {
  readonly content = input.required<PortfolioCareerSummaryContent>();
}
