import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  GhContainerComponent,
  GhContentHighlightComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhContentHighlightData,
} from 'gh-design-system';

import type { PortfolioFeaturedContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioHref } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-home-featured-content-section',
  standalone: true,
  imports: [
    GhContainerComponent,
    GhContentHighlightComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './home-featured-content-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturedContentSectionComponent {
  readonly content = input.required<PortfolioFeaturedContent>();
  readonly locale = input.required<PortfolioLocale>();
  readonly externalLinkLabel = input.required<string>();

  protected readonly highlight = computed((): GhContentHighlightData => {
    const { id: _id, link, ...item } = this.content().item;
    return {
      ...item,
      href: resolvePortfolioHref(this.locale(), link),
      linkLabel: link.label,
      external: link.external ?? false,
    };
  });
}
