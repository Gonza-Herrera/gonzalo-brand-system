import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhContainerComponent,
  GhGridComponent,
  GhProjectCardComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhProjectCardData,
} from 'gh-design-system';

import type { PortfolioSelectedProjectsContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction, resolvePortfolioHref } from '../home-link.utils';

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
    this.content().items.map((item): GhProjectCardData => {
      const { id: _id, projectLink, repositoryLink, ...project } = item;
      return {
        ...project,
        projectUrl: projectLink ? resolvePortfolioHref(this.locale(), projectLink) : undefined,
        projectLinkLabel: projectLink?.label,
        repositoryUrl: repositoryLink
          ? resolvePortfolioHref(this.locale(), repositoryLink)
          : undefined,
        repositoryLinkLabel: repositoryLink?.label,
      };
    }),
  );
}
