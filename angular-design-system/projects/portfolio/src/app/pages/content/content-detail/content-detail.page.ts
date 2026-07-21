import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  GhArticleCardComponent,
  GhBadgeComponent,
  GhCardComponent,
  GhContactCalloutComponent,
  GhContainerComponent,
  GhGridComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  GhTagComponent,
  type GhArticleCardData,
} from 'gh-design-system';

import type { PortfolioContentItem } from '../../../content/models/content-hub-content.model';
import { getContentDetail } from '../../../content/content-details.registry';
import { mapContentToArticleCard } from '../../../content/utils/article-card.mapper';
import { findContentBySlug, selectRelatedContent } from '../../../content/utils/content-selectors';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';
import { createLocalizedPath } from '../../../core/routing/portfolio-route.utils';
import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';

interface PortfolioRelatedContentView {
  readonly item: PortfolioContentItem;
  readonly card: GhArticleCardData;
}

@Component({
  selector: 'app-content-detail-page',
  standalone: true,
  imports: [
    GhArticleCardComponent,
    GhBadgeComponent,
    GhCardComponent,
    GhContactCalloutComponent,
    GhContainerComponent,
    GhGridComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    GhTagComponent,
  ],
  templateUrl: './content-detail.page.html',
  styleUrl: './content-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentDetailPage {
  readonly slug = input.required<string>();

  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly locale = this.localeService.locale;
  protected readonly content = computed(() => this.localeService.content().pages.content);
  protected readonly item = computed(() => findContentBySlug(this.content().items, this.slug()));
  protected readonly detail = computed(() => {
    const item = this.item();
    return item ? getContentDetail(this.locale(), item.id) : undefined;
  });
  protected readonly backUrl = computed(() => createLocalizedPath(this.locale(), 'content'));
  protected readonly relatedItems = computed(() => {
    const item = this.item();
    return item
      ? selectRelatedContent(item, this.content().items, 3, this.detail()?.relatedContentIds)
      : [];
  });
  protected readonly relatedCards = computed<readonly PortfolioRelatedContentView[]>(() =>
    this.relatedItems()
      .map((item) => ({
        item,
        card: mapContentToArticleCard(item, this.locale(), this.content().grid.cardLabels),
      }))
      .filter((view): view is PortfolioRelatedContentView => view.card !== undefined),
  );
  protected readonly contactActions = computed(() =>
    this.content().contact.actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
