import { Component } from '@angular/core';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { SHADOW_TOKENS } from '../../shared/data/foundation-tokens.generated';

@Component({
  selector: 'showcase-shadows-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection],
  templateUrl: './shadows.html',
  styleUrl: './shadows.scss',
})
export class ShadowsPage {
  protected readonly shadowTokens = SHADOW_TOKENS;
  protected readonly codeExample = `.elevated-surface {
  background: var(--gh-surface-elevated);
  border-radius: var(--gh-radius-lg);
  box-shadow: var(--gh-shadow-md);
}`;
}
