import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhContainerComponent,
  GhFeatureGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhFeatureGridColumns,
  type GhFeatureGridVariant,
  type GhSectionSurface,
} from 'gh-design-system';

import type {
  PortfolioPhilosophyContent,
  PortfolioPrinciplesContent,
  PortfolioWorkingStyleContent,
} from '../../../content/models/about-content.model';

type AboutFeatureSectionContent =
  PortfolioPhilosophyContent | PortfolioPrinciplesContent | PortfolioWorkingStyleContent;

@Component({
  selector: 'app-about-feature-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhFeatureGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './about-feature-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutFeatureSectionComponent {
  readonly sectionId = input.required<string>();
  readonly content = input.required<AboutFeatureSectionContent>();
  readonly externalLinkLabel = input.required<string>();
  readonly surface = input<GhSectionSurface>('transparent');
  readonly variant = input<GhFeatureGridVariant>('cards');
  readonly columns = input<GhFeatureGridColumns>(3);
}
