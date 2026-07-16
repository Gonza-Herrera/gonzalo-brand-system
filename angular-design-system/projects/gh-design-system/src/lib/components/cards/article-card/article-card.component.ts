import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GhBadgeComponent } from '../../badge/badge.component';
import { GhCardComponent } from '../card/card.component';
import type { GhArticleCardData } from './article-card.types';

@Component({
  selector: 'gh-article-card',
  standalone: true,
  imports: [GhBadgeComponent, GhCardComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhArticleCardComponent {
  readonly article = input.required<GhArticleCardData>();

  protected readonly externalAriaLabel = computed(() =>
    this.article().external ? `${this.article().title} (opens in a new tab)` : undefined,
  );
}
