import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GhBadgeComponent } from '../../badge/badge.component';
import type { GhBadgeVariant } from '../../badge/badge.types';
import { GhTagComponent } from '../../tag/tag.component';
import { GhCardComponent } from '../card/card.component';
import type {
  GhProjectCardData,
  GhProjectCardHeadingLevel,
  GhProjectCardOrientation,
  GhProjectStatus,
} from './project-card.types';

const PROJECT_STATUS_PRESENTATION: Readonly<
  Record<GhProjectStatus, { readonly label: string; readonly variant: GhBadgeVariant }>
> = {
  concept: { label: 'Concept', variant: 'neutral' },
  'in-progress': { label: 'In progress', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
  archived: { label: 'Archived', variant: 'warning' },
};

@Component({
  selector: 'gh-project-card',
  standalone: true,
  imports: [GhBadgeComponent, GhCardComponent, GhTagComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhProjectCardComponent {
  readonly project = input.required<GhProjectCardData>();
  readonly orientation = input<GhProjectCardOrientation>('vertical');
  readonly headingLevel = input<GhProjectCardHeadingLevel>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly featuredLabel = input('Featured');
  readonly technologiesLabel = input('Technologies');
  readonly linksLabel = input('Project links');

  protected readonly hasLinks = computed(() =>
    Boolean(this.project().projectUrl || this.project().repositoryUrl),
  );
  protected readonly statusPresentation = computed(() => {
    const status = this.project().status;
    return status ? PROJECT_STATUS_PRESENTATION[status] : undefined;
  });
  protected readonly cardAriaLabel = computed(
    () => this.ariaLabel() ?? `Project: ${this.project().title}`,
  );
}
