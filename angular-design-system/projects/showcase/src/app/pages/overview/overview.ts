import { Component } from '@angular/core';

import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface FoundationStatus {
  readonly area: string;
  readonly description: string;
  readonly status: 'Ready' | 'In progress' | 'Planned';
}

@Component({
  selector: 'showcase-overview-page',
  standalone: true,
  imports: [DocumentationSection],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class OverviewPage {
  protected readonly statuses = [
    {
      area: 'Foundations',
      description: 'Color, typography, spacing, radii and elevation.',
      status: 'Ready',
    },
    {
      area: 'Tokens',
      description: 'Primitive and semantic values generated from JSON.',
      status: 'Ready',
    },
    {
      area: 'Themes',
      description: 'Light, dark and system preference support.',
      status: 'Ready',
    },
    {
      area: 'Components',
      description: 'Button, Badge and Tag are available; additional primitives will follow.',
      status: 'In progress',
    },
    {
      area: 'Patterns',
      description: 'Reusable compositions will follow proven components.',
      status: 'Planned',
    },
    {
      area: 'Documentation',
      description: 'Foundation guidance is active and expanding.',
      status: 'In progress',
    },
  ] as const satisfies readonly FoundationStatus[];
}
