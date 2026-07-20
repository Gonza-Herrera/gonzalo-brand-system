import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GhBadgeComponent } from '../../badge/badge.component';
import { GhTagComponent } from '../../tag/tag.component';
import { GhCardComponent } from '../card/card.component';
import {
  GH_EXPERIENCE_CARD_DEFAULT_LABELS,
  type GhExperienceCardData,
  type GhExperienceCardHeadingLevel,
  type GhExperienceCardLabels,
  type GhExperienceWorkMode,
} from './experience-card.types';

const WORK_MODE_LABELS: Readonly<Record<GhExperienceWorkMode, string>> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

@Component({
  selector: 'gh-experience-card',
  standalone: true,
  imports: [GhBadgeComponent, GhCardComponent, GhTagComponent],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhExperienceCardComponent {
  readonly experience = input.required<GhExperienceCardData>();
  readonly highlighted = input(false);
  readonly headingLevel = input<GhExperienceCardHeadingLevel>(2);
  readonly labels = input<GhExperienceCardLabels>(GH_EXPERIENCE_CARD_DEFAULT_LABELS);

  protected readonly ariaLabel = computed(
    () => `${this.experience().role} ${this.labels().at} ${this.experience().company}`,
  );
  protected readonly period = computed(() => {
    const experience = this.experience();
    return experience.endDate
      ? `${experience.startDate} — ${experience.endDate}`
      : experience.startDate;
  });
  protected readonly workModeLabel = computed(() => {
    const experience = this.experience();
    return (
      experience.workModeLabel ??
      (experience.workMode ? WORK_MODE_LABELS[experience.workMode] : undefined)
    );
  });
}
