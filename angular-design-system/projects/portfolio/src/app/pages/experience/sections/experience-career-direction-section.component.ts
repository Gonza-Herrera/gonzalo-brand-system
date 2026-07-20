import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhClusterComponent,
  GhContainerComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  GhTagComponent,
} from 'gh-design-system';

import type { PortfolioExperienceCareerDirectionContent } from '../../../content/models/experience-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-experience-career-direction-section',
  standalone: true,
  imports: [
    GhClusterComponent,
    GhContainerComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './experience-career-direction-section.component.html',
  styleUrl: './experience-career-direction-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCareerDirectionSectionComponent {
  readonly content = input.required<PortfolioExperienceCareerDirectionContent>();
  readonly locale = input.required<PortfolioLocale>();

  protected readonly projectsAction = computed(() =>
    resolvePortfolioAction(this.locale(), this.content().projectsAction),
  );
}
