import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GhBadgeComponent } from '../../badge/badge.component';
import { GhTagComponent } from '../../tag/tag.component';
import { GhCardComponent } from '../card/card.component';
import type { GhArticleCardData, GhArticleCardHeadingLevel } from './article-card.types';

@Component({
  selector: 'gh-article-card',
  standalone: true,
  imports: [GhBadgeComponent, GhCardComponent, GhTagComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhArticleCardComponent {
  readonly article = input.required<GhArticleCardData>();
  readonly headingLevel = input<GhArticleCardHeadingLevel>(2);
  readonly articleLabel = input('Article');
  readonly featuredLabel = input('Featured');
  readonly topicsLabel = input('Topics');
  readonly externalLinkLabel = input('opens in a new tab');

  protected readonly externalAriaLabel = computed(() =>
    this.article().external ? `${this.article().title} (${this.externalLinkLabel()})` : undefined,
  );
  protected readonly cardAriaLabel = computed(
    () => `${this.articleLabel()}: ${this.article().title}`,
  );
}
