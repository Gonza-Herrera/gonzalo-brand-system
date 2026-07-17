import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { isPortfolioPageId, type PortfolioPageId } from '../../content/models/page-content.model';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { PortfolioLocaleService } from '../services/portfolio-locale.service';

@Injectable()
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly localeService = inject(PortfolioLocaleService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageId = this.findPageId(snapshot);
    const pageContent = this.localeService.content().pages[pageId];

    this.title.setTitle(
      pageContent.metaTitleIsAbsolute
        ? pageContent.metaTitle
        : `${pageContent.metaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
    );
    this.meta.updateTag({ name: 'description', content: pageContent.metaDescription });
  }

  private findPageId(snapshot: RouterStateSnapshot): PortfolioPageId {
    let route: ActivatedRouteSnapshot | null = snapshot.root;
    let pageId: unknown;

    while (route) {
      pageId = route.data['pageId'] ?? pageId;
      route = route.firstChild;
    }

    return isPortfolioPageId(pageId) ? pageId : 'home';
  }
}
