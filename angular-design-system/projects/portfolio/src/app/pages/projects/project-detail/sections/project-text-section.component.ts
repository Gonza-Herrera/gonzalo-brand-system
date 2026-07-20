import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GhContainerComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhSectionSurface,
} from 'gh-design-system';

import type { PortfolioProjectTextSectionContent } from '../../../../content/models/projects-content.model';

@Component({
  selector: 'app-project-text-section',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhSectionHeadingComponent, GhStackComponent],
  templateUrl: './project-text-section.component.html',
  styleUrl: './project-text-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTextSectionComponent {
  readonly content = input.required<PortfolioProjectTextSectionContent>();
  readonly surface = input<GhSectionSurface>('primary');
}
