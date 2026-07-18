import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhCardComponent,
  GhContainerComponent,
  GhFeatureGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioAiEngineeringContent } from '../../../content/models/about-content.model';

@Component({
  selector: 'app-about-ai-section',
  standalone: true,
  imports: [
    GhCardComponent,
    GhContainerComponent,
    GhFeatureGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './about-ai-section.component.html',
  styleUrl: './about-ai-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutAiSectionComponent {
  readonly content = input.required<PortfolioAiEngineeringContent>();
  readonly externalLinkLabel = input.required<string>();
}
