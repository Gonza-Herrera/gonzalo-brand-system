import { Component } from '@angular/core';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { SPACING_TOKENS } from '../../shared/data/foundation-tokens.generated';

@Component({
  selector: 'showcase-spacing-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection],
  templateUrl: './spacing.html',
  styleUrl: './spacing.scss',
})
export class SpacingPage {
  protected readonly spacingTokens = SPACING_TOKENS;
  protected readonly codeExample = `.stack {
  display: grid;
  gap: var(--gh-space-md);
  padding-block: var(--gh-space-section);
}`;
}
