import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhContainerComponent,
  GhFeatureGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioHomeExpertiseContent } from '../../../content/models/home-content.model';

@Component({
  selector: 'app-home-expertise-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhFeatureGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './home-expertise-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeExpertiseSectionComponent {
  readonly content = input.required<PortfolioHomeExpertiseContent>();
  readonly externalLinkLabel = input.required<string>();
}
