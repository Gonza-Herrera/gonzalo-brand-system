import { Component } from '@angular/core';
import {
  GhButtonComponent,
  GhDividerComponent,
  GhGlassPanelComponent,
  GhGridComponent,
  GhStackComponent,
  GhSurfaceComponent,
  GhTagComponent,
  type GhSurfacePadding,
  type GhSurfaceRadius,
  type GhSurfaceVariant,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface SurfaceExample {
  readonly label: string;
  readonly description: string;
  readonly variant: GhSurfaceVariant;
}

@Component({
  selector: 'showcase-surfaces-page',
  standalone: true,
  imports: [
    CodePreview,
    DocumentationSection,
    GhButtonComponent,
    GhDividerComponent,
    GhGlassPanelComponent,
    GhGridComponent,
    GhStackComponent,
    GhSurfaceComponent,
    GhTagComponent,
  ],
  templateUrl: './surfaces.html',
  styleUrl: './surfaces.scss',
})
export class SurfacesPage {
  protected readonly materials = [
    {
      label: 'Solid',
      description: 'Safe default and strongest content containment.',
      variant: 'solid',
    },
    {
      label: 'Glass Subtle',
      description: 'Restrained grouping with the lowest filtered depth.',
      variant: 'glass-subtle',
    },
    {
      label: 'Glass',
      description: 'Balanced material for a primary bounded panel.',
      variant: 'glass',
    },
    {
      label: 'Glass Elevated',
      description: 'Stronger containment for an important panel.',
      variant: 'glass-elevated',
    },
    {
      label: 'Glass Floating',
      description: 'Highest approved depth for compact floating UI.',
      variant: 'glass-floating',
    },
  ] as const satisfies readonly SurfaceExample[];

  protected readonly paddings = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ] as const satisfies readonly GhSurfacePadding[];
  protected readonly radii = [
    'none',
    'small',
    'default',
    'large',
  ] as const satisfies readonly GhSurfaceRadius[];

  protected readonly surfaceExample = `<gh-surface variant="glass" padding="lg">
  <h2>Project summary</h2>
  <p>Content keeps its own semantic structure.</p>
</gh-surface>`;
  protected readonly interactiveExample = `<gh-surface variant="glass-elevated" interactive>
  <a href="/projects">View projects</a>
</gh-surface>`;
  protected readonly panelExample = `<gh-glass-panel padding="lg">
  <h2>Related content</h2>
  <gh-divider />
  <gh-surface variant="solid" padding="sm">
    Nested solid content
  </gh-surface>
</gh-glass-panel>`;
}
