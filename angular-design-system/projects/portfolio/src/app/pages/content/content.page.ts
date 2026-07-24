import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GhArticleCardComponent,
  GhContactCalloutComponent,
  GhContainerComponent,
  GhContentHighlightComponent,
  GhGridComponent,
  GhHeroComponent,
  GhHeroVisualDirective,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhArticleCardData,
} from 'gh-design-system';

import { getPortfolioContentHubContent } from '../../content/content-hub-content.registry';
import type {
  PortfolioContentFilter,
  PortfolioContentItem,
} from '../../content/models/content-hub-content.model';
import {
  mapContentToArticleCard,
  mapContentToHighlight,
} from '../../content/utils/article-card.mapper';
import {
  filterContent,
  selectFeaturedContent,
  selectPublishedCategories,
  selectPublishedContent,
} from '../../content/utils/content-selectors';
import { resolvePortfolioAction } from '../../core/routing/portfolio-link.utils';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';

interface PortfolioContentCardView {
  readonly item: PortfolioContentItem;
  readonly card: GhArticleCardData;
}

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [
    GhArticleCardComponent,
    GhContactCalloutComponent,
    GhContainerComponent,
    GhContentHighlightComponent,
    GhGridComponent,
    GhHeroComponent,
    GhHeroVisualDirective,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './content.page.html',
  styleUrl: './content.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() =>
    getPortfolioContentHubContent(this.localeService.locale()),
  );
  protected readonly locale = this.localeService.locale;
  protected readonly activeFilter = signal<PortfolioContentFilter>('all');
  protected readonly publishedItems = computed(() => selectPublishedContent(this.content().items));
  protected readonly featuredItem = computed(() => selectFeaturedContent(this.content().items));
  protected readonly featured = computed(() => {
    const item = this.featuredItem();
    return item
      ? mapContentToHighlight(item, this.locale(), this.content().featured.linkLabel)
      : undefined;
  });
  protected readonly availableCategories = computed(() =>
    selectPublishedCategories(this.content().items),
  );
  protected readonly filters = computed(() =>
    this.content().filters.options.filter(
      (option) => option.id === 'all' || this.availableCategories().includes(option.id),
    ),
  );
  protected readonly visibleItems = computed(() =>
    filterContent(this.content().items, this.activeFilter()),
  );
  protected readonly visibleCards = computed<readonly PortfolioContentCardView[]>(() =>
    this.visibleItems()
      .map((item) => ({
        item,
        card: mapContentToArticleCard(item, this.locale(), this.content().grid.cardLabels),
      }))
      .filter((view): view is PortfolioContentCardView => view.card !== undefined),
  );
  protected readonly contactActions = computed(() =>
    this.content().contact.actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );

  setFilter(filter: PortfolioContentFilter): void {
    this.activeFilter.set(filter);
  }
}
