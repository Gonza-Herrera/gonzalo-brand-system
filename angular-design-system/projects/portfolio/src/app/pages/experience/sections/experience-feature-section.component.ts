import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhContainerComponent,
  GhFeatureGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhSectionSurface,
} from 'gh-design-system';

import type {
  PortfolioExperienceLeadershipContent,
  PortfolioExperienceWaysOfWorkingContent,
} from '../../../content/models/experience-content.model';

type ExperienceFeatureSectionContent =
  PortfolioExperienceLeadershipContent | PortfolioExperienceWaysOfWorkingContent;

@Component({
  selector: 'app-experience-feature-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhFeatureGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './experience-feature-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceFeatureSectionComponent {
  readonly sectionId = input.required<string>();
  readonly content = input.required<ExperienceFeatureSectionContent>();
  readonly externalLinkLabel = input.required<string>();
  readonly surface = input<GhSectionSurface>('transparent');
}
