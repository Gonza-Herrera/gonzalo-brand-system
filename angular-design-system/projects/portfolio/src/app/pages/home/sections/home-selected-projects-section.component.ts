import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhContainerComponent,
  GhGridComponent,
  GhProjectCardComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import type { PortfolioSelectedProjectsContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { mapProjectToCard } from '../../../content/utils/project-card.mapper';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-home-selected-projects-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhGridComponent,
    GhProjectCardComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './home-selected-projects-section.component.html',
  styleUrl: './home-section-action.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSelectedProjectsSectionComponent {
  readonly content = input.required<PortfolioSelectedProjectsContent>();
  readonly locale = input.required<PortfolioLocale>();

  protected readonly viewAllAction = computed(() =>
    resolvePortfolioAction(this.locale(), this.content().viewAllAction),
  );
  protected readonly projects = computed(() =>
    this.content().items.map((item) =>
      mapProjectToCard(item, this.locale(), this.content().cardLabels),
    ),
  );
}
