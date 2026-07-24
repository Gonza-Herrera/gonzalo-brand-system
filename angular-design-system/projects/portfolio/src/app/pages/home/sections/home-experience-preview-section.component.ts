import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhContainerComponent,
  GhExperienceTimelineComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioExperiencePreviewContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-home-experience-preview-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhExperienceTimelineComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './home-experience-preview-section.component.html',
  styleUrls: ['./home-experience-preview-section.component.scss', './home-section-action.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeExperiencePreviewSectionComponent {
  readonly content = input.required<PortfolioExperiencePreviewContent>();
  readonly locale = input.required<PortfolioLocale>();

  protected readonly viewAllAction = computed(() =>
    resolvePortfolioAction(this.locale(), this.content().viewAllAction),
  );
}
