import { Component } from '@angular/core';
import {
  GhBadgeComponent,
  GhButtonComponent,
  GhCardComponent,
  GhClusterComponent,
  GhContainerComponent,
  type GhContainerGutters,
  type GhContainerSize,
  GhDividerComponent,
  type GhDividerTone,
  GhGridComponent,
  type GhGridColumns,
  GhInlineComponent,
  type GhLayoutGap,
  GhProjectCardComponent,
  type GhProjectCardData,
  GhSectionComponent,
  type GhSectionSpacing,
  type GhSectionSurface,
  GhStackComponent,
  GhTagComponent,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

@Component({
  selector: 'showcase-layout-page',
  standalone: true,
  imports: [
    CodePreview,
    DocumentationSection,
    GhBadgeComponent,
    GhButtonComponent,
    GhCardComponent,
    GhClusterComponent,
    GhContainerComponent,
    GhDividerComponent,
    GhGridComponent,
    GhInlineComponent,
    GhProjectCardComponent,
    GhSectionComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutPage {
  protected readonly containerSizes = [
    'sm',
    'md',
    'lg',
    'xl',
    'wide',
    'full',
  ] as const satisfies readonly GhContainerSize[];
  protected readonly containerGutters = [
    'none',
    'sm',
    'md',
    'lg',
  ] as const satisfies readonly GhContainerGutters[];
  protected readonly sectionSpacings = [
    'none',
    'sm',
    'md',
    'lg',
  ] as const satisfies readonly GhSectionSpacing[];
  protected readonly sectionSurfaces = [
    'primary',
    'secondary',
    'subtle',
    'accent',
  ] as const satisfies readonly Exclude<GhSectionSurface, 'transparent'>[];
  protected readonly layoutGaps = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ] as const satisfies readonly GhLayoutGap[];
  protected readonly fixedColumns = [1, 2, 3, 4] as const satisfies readonly Exclude<
    GhGridColumns,
    'auto'
  >[];
  protected readonly dividerTones = [
    'subtle',
    'default',
    'strong',
  ] as const satisfies readonly GhDividerTone[];
  protected readonly technologies = [
    'Angular',
    'TypeScript',
    'Signals',
    'SCSS',
    'Accessibility',
    'SSR',
    'Hydration',
    'Design Tokens',
    'Leadership',
    'AI',
  ] as const;
  protected readonly gridItems = ['One', 'Two', 'Three', 'Four'] as const;
  protected readonly projects: readonly GhProjectCardData[] = [
    {
      title: 'Angular Design System',
      description: 'Token-driven foundations for accessible Angular products.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      status: 'completed',
      featured: true,
    },
    {
      title: 'Engineering Portfolio',
      description: 'A responsive composition for experience, projects and writing.',
      technologies: ['Accessibility', 'Performance'],
      status: 'in-progress',
    },
    {
      title: 'Leadership Notes',
      description: 'A calm reading experience for practical engineering guidance.',
      technologies: ['Content', 'Mentoring'],
      status: 'concept',
    },
  ];

  protected readonly sectionContainerExample = `<gh-section spacing="lg" surface="subtle">
  <gh-container size="xl">
    <h2>Experience</h2>
  </gh-container>
</gh-section>`;
  protected readonly stackExample = `<gh-stack gap="lg">
  <h2>Think bigger. Build smarter.</h2>
  <p>Helping teams build better software.</p>
</gh-stack>`;
  protected readonly gridExample = `<gh-grid columns="auto" minItemSize="md" gap="lg">
  @for (project of projects; track project.title) {
    <gh-project-card [project]="project" />
  }
</gh-grid>`;
  protected readonly clusterExample = `<gh-cluster gap="sm">
  <gh-tag>Angular</gh-tag>
  <gh-tag>Leadership</gh-tag>
  <gh-tag>AI</gh-tag>
</gh-cluster>`;
}
