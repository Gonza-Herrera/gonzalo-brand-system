import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhContainerComponent,
  GhExperienceTimelineComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioExperienceTimelineContent } from '../../../content/models/experience-content.model';
import { mapPortfolioExperiencesToTimeline } from '../../../content/utils/experience-card.mapper';

@Component({
  selector: 'app-experience-timeline-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhExperienceTimelineComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './experience-timeline-section.component.html',
  styleUrl: './experience-timeline-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineSectionComponent {
  readonly content = input.required<PortfolioExperienceTimelineContent>();

  protected readonly timelineItems = computed(() =>
    mapPortfolioExperiencesToTimeline(this.content().items, this.content().labels),
  );
}
