import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GhContactCalloutComponent,
  GhContainerComponent,
  GhGridComponent,
  GhHeroComponent,
  GhHeroVisualDirective,
  GhProjectCardComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  GhTagComponent,
} from 'gh-design-system';

import { mapProjectToCard } from '../../content/utils/project-card.mapper';
import { selectProjectsInEditorialOrder } from '../../content/utils/project-selectors';
import { resolvePortfolioAction } from '../../core/routing/portfolio-link.utils';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    GhContactCalloutComponent,
    GhContainerComponent,
    GhGridComponent,
    GhHeroComponent,
    GhHeroVisualDirective,
    GhProjectCardComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() => this.localeService.content().pages.projects);
  protected readonly locale = this.localeService.locale;
  protected readonly projects = computed(() =>
    selectProjectsInEditorialOrder(this.content().items),
  );
  protected readonly projectCards = computed(() =>
    this.projects().map((project) =>
      mapProjectToCard(project, this.locale(), this.content().grid.cardLabels),
    ),
  );
  protected readonly categories = computed(() =>
    this.projects()
      .map((project) => project.categoryLabel)
      .filter((category, index, categories) => categories.indexOf(category) === index),
  );
  protected readonly contactActions = computed(() =>
    this.content().contact.actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
