import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  GhBadgeComponent,
  type GhBadgeVariant,
  GhCardComponent,
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

import type { PortfolioProjectStatus } from '../../../content/models/projects-content.model';
import { getPortfolioProjectsContent } from '../../../content/projects-content.registry';
import { mapProjectToCard } from '../../../content/utils/project-card.mapper';
import { findProjectBySlug, selectRelatedProjects } from '../../../content/utils/project-selectors';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';
import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';
import { createLocalizedPath } from '../../../core/routing/portfolio-route.utils';
import { ProjectTextSectionComponent } from './sections/project-text-section.component';

interface ProjectSummaryFact {
  readonly id: 'status' | 'type' | 'role' | 'focus';
  readonly label: string;
  readonly value: string;
}

const STATUS_VARIANTS: Readonly<Record<PortfolioProjectStatus, GhBadgeVariant>> = {
  concept: 'neutral',
  'in-progress': 'info',
  completed: 'success',
  archived: 'warning',
};

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    GhBadgeComponent,
    GhCardComponent,
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
    ProjectTextSectionComponent,
  ],
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage {
  readonly slug = input.required<string>();

  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly locale = this.localeService.locale;
  protected readonly content = computed(() =>
    getPortfolioProjectsContent(this.localeService.locale()),
  );
  protected readonly project = computed(() => findProjectBySlug(this.content().items, this.slug()));
  protected readonly caseStudy = computed(() => {
    const caseStudy = this.project()?.caseStudy;
    return caseStudy?.available ? caseStudy : undefined;
  });
  protected readonly unavailableCaseStudy = computed(() => {
    const caseStudy = this.project()?.caseStudy;
    return caseStudy && !caseStudy.available ? caseStudy : undefined;
  });
  protected readonly backUrl = computed(() => createLocalizedPath(this.locale(), 'projects'));
  protected readonly statusVariant = computed(() => {
    const project = this.project();
    return project ? STATUS_VARIANTS[project.status] : 'neutral';
  });
  protected readonly summaryFacts = computed<readonly ProjectSummaryFact[]>(() => {
    const project = this.project();
    if (!project) {
      return [];
    }

    const labels = this.content().detail;
    const summary = project.caseStudy.available ? project.caseStudy.summary : undefined;
    const facts: readonly (ProjectSummaryFact | undefined)[] = [
      { id: 'status', label: labels.status, value: project.statusLabel },
      { id: 'type', label: labels.type, value: summary?.type ?? project.categoryLabel },
      summary?.role ? { id: 'role', label: labels.role, value: summary.role } : undefined,
      summary?.focus ? { id: 'focus', label: labels.focus, value: summary.focus } : undefined,
    ];

    return facts.filter((fact): fact is ProjectSummaryFact => Boolean(fact));
  });
  protected readonly relatedProjects = computed(() => {
    const project = this.project();
    return project ? selectRelatedProjects(project, this.content().items, 3) : [];
  });
  protected readonly relatedCards = computed(() =>
    this.relatedProjects().map((project) =>
      mapProjectToCard(project, this.locale(), this.content().grid.cardLabels),
    ),
  );
  protected readonly contactActions = computed(() =>
    this.content().contact.actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
