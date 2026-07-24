import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhCardComponent,
  GhContainerComponent,
  GhGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioProfessionalStoryContent } from '../../../content/models/about-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-about-story-section',
  standalone: true,
  imports: [
    GhCardComponent,
    GhContainerComponent,
    GhGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './about-story-section.component.html',
  styleUrl: './about-story-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutStorySectionComponent {
  readonly content = input.required<PortfolioProfessionalStoryContent>();
  readonly locale = input.required<PortfolioLocale>();

  protected readonly experienceAction = computed(() =>
    resolvePortfolioAction(this.locale(), this.content().experienceAction),
  );
}
