import { Component } from '@angular/core';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { RADIUS_TOKENS } from '../../shared/data/foundation-tokens.generated';

@Component({
  selector: 'showcase-radii-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection],
  templateUrl: './radii.html',
  styleUrl: './radii.scss',
})
export class RadiiPage {
  protected readonly radiusTokens = RADIUS_TOKENS;
  protected readonly codeExample = `.surface {
  border: var(--gh-border-width-default) solid var(--gh-border-default);
  border-radius: var(--gh-radius-lg);
  background: var(--gh-surface-primary);
}`;
}
