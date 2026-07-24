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

import type { PortfolioTechnicalFocusContent } from '../../../content/models/about-content.model';

@Component({
  selector: 'app-about-technical-focus-section',
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
  templateUrl: './about-technical-focus-section.component.html',
  styleUrl: './about-technical-focus-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTechnicalFocusSectionComponent {
  readonly content = input.required<PortfolioTechnicalFocusContent>();
}
