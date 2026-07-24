import { Component } from '@angular/core';
import {
  GhBadgeComponent,
  type GhBadgeAppearance,
  type GhBadgeSize,
  type GhBadgeVariant,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface BadgeVariantExample {
  readonly label: string;
  readonly description: string;
  readonly variant: GhBadgeVariant;
}

@Component({
  selector: 'showcase-badges-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection, GhBadgeComponent],
  templateUrl: './badges.html',
  styleUrl: './badges.scss',
})
export class BadgesPage {
  protected readonly variants = [
    { label: 'Neutral', description: 'General information and counts.', variant: 'neutral' },
    { label: 'Info', description: 'Contextual information or guidance.', variant: 'info' },
    { label: 'Success', description: 'Positive and completed states.', variant: 'success' },
    { label: 'Warning', description: 'States requiring attention.', variant: 'warning' },
    { label: 'Danger', description: 'Errors and critical states.', variant: 'danger' },
    { label: 'Accent', description: 'Highlighted brand categories.', variant: 'accent' },
  ] as const satisfies readonly BadgeVariantExample[];
  protected readonly appearances = [
    'soft',
    'solid',
  ] as const satisfies readonly GhBadgeAppearance[];
  protected readonly sizes = ['sm', 'md'] as const satisfies readonly GhBadgeSize[];

  protected readonly successExample = `<gh-badge variant="success">
  Ready
</gh-badge>`;
  protected readonly accentExample = `<gh-badge
  variant="accent"
  appearance="solid"
>
  Angular
</gh-badge>`;
  protected readonly countExample = `<gh-badge variant="neutral">
  3
</gh-badge>`;
}
