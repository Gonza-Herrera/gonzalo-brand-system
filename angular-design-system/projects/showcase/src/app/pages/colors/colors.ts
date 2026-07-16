import { Component } from '@angular/core';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { PRIMITIVE_COLOR_TOKENS } from '../../shared/data/foundation-tokens.generated';

interface SemanticColorPreview {
  readonly cssValue: string;
  readonly cssVariable: string;
  readonly kind: 'action' | 'background' | 'border' | 'focus' | 'text';
  readonly name: string;
}

@Component({
  selector: 'showcase-colors-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class ColorsPage {
  protected readonly brandColors = PRIMITIVE_COLOR_TOKENS.filter(
    (token) => token.category === 'brand',
  );
  protected readonly supportingColors = PRIMITIVE_COLOR_TOKENS.filter(
    (token) => token.category === 'supporting',
  );
  protected readonly semanticColors = [
    {
      name: 'Background Primary',
      cssVariable: '--gh-background-primary',
      cssValue: 'var(--gh-background-primary)',
      kind: 'background',
    },
    {
      name: 'Background Secondary',
      cssVariable: '--gh-background-secondary',
      cssValue: 'var(--gh-background-secondary)',
      kind: 'background',
    },
    {
      name: 'Surface Primary',
      cssVariable: '--gh-surface-primary',
      cssValue: 'var(--gh-surface-primary)',
      kind: 'background',
    },
    {
      name: 'Text Primary',
      cssVariable: '--gh-text-primary',
      cssValue: 'var(--gh-text-primary)',
      kind: 'text',
    },
    {
      name: 'Text Secondary',
      cssVariable: '--gh-text-secondary',
      cssValue: 'var(--gh-text-secondary)',
      kind: 'text',
    },
    {
      name: 'Text Accent',
      cssVariable: '--gh-text-accent',
      cssValue: 'var(--gh-text-accent)',
      kind: 'text',
    },
    {
      name: 'Border Default',
      cssVariable: '--gh-border-default',
      cssValue: 'var(--gh-border-default)',
      kind: 'border',
    },
    {
      name: 'Focus Ring',
      cssVariable: '--gh-focus-ring',
      cssValue: 'var(--gh-focus-ring)',
      kind: 'focus',
    },
    {
      name: 'Primary Action',
      cssVariable: '--gh-action-primary-background',
      cssValue: 'var(--gh-action-primary-background)',
      kind: 'action',
    },
  ] as const satisfies readonly SemanticColorPreview[];
  protected readonly codeExample = `.example {
  color: var(--gh-text-primary);
  background: var(--gh-surface-primary);
  border-color: var(--gh-border-default);
}`;
}
