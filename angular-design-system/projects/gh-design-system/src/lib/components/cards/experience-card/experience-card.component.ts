import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GhBadgeComponent } from '../../badge/badge.component';
import { GhTagComponent } from '../../tag/tag.component';
import { GhCardComponent } from '../card/card.component';
import type { GhExperienceCardData, GhExperienceWorkMode } from './experience-card.types';

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
