import { Component } from '@angular/core';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { TYPOGRAPHY_TOKENS } from '../../shared/data/foundation-tokens.generated';

@Component({
  selector: 'showcase-typography-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection],
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class TypographyPage {
  protected readonly typographyTokens = TYPOGRAPHY_TOKENS;
  protected readonly fontFamilies = [
    {
      name: 'Manrope',
      role: 'Display, hero and headings',
      cssVariable: TYPOGRAPHY_TOKENS[0].familyVariable,
      cssValue: TYPOGRAPHY_TOKENS[0].familyCssValue,
      value: TYPOGRAPHY_TOKENS[0].familyValue,
    },
    {
      name: 'Inter',
      role: 'Interface and body content',
      cssVariable: TYPOGRAPHY_TOKENS[4].familyVariable,
      cssValue: TYPOGRAPHY_TOKENS[4].familyCssValue,
      value: TYPOGRAPHY_TOKENS[4].familyValue,
    },
    {
      name: 'System UI',
      role: 'Resilient fallback',
      cssVariable: 'Fallback in both family tokens',
      cssValue: 'system-ui, sans-serif',
      value: 'system-ui, sans-serif',
    },
  ] as const;
  protected readonly codeExample = `h1 {
  font-family: var(--gh-font-family-display);
  font-size: var(--gh-font-size-h1);
  line-height: var(--gh-line-height-heading);
}

body {
  font-family: var(--gh-font-family-body);
}`;
}
