import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhCardComponent,
  GhClusterComponent,
  GhContainerComponent,
  GhGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  GhTagComponent,
} from 'gh-design-system';

import type { PortfolioExperienceCapabilitiesContent } from '../../../content/models/experience-content.model';

@Component({
  selector: 'app-experience-capabilities-section',
  standalone: true,
  imports: [
    GhCardComponent,
    GhClusterComponent,
    GhContainerComponent,
    GhGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './experience-capabilities-section.component.html',
  styleUrl: './experience-capabilities-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCapabilitiesSectionComponent {
  readonly content = input.required<PortfolioExperienceCapabilitiesContent>();
}
