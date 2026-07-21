import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { findProjectBySlug } from '../../content/utils/project-selectors';
import { findContentBySlug } from '../../content/utils/content-selectors';
import { isPortfolioPageId, type PortfolioPageId } from '../../content/models/page-content.model';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { PortfolioLocaleService } from '../services/portfolio-locale.service';

@Injectable()
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly localeService = inject(PortfolioLocaleService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const deepestRoute = this.findDeepestRoute(snapshot);
    const pageId = this.findPageId(deepestRoute);
    const pageContent = this.localeService.content().pages[pageId];

    if (deepestRoute.data['projectDetail'] === true) {
      const projectsContent = this.localeService.content().pages.projects;
      const slug = deepestRoute.paramMap.get('slug') ?? '';
      const project = findProjectBySlug(projectsContent.items, slug);

      this.title.setTitle(
        `${project?.title ?? projectsContent.detail.notFoundMetaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
      );
      this.meta.updateTag({
        name: 'description',
        content: project?.shortDescription ?? projectsContent.detail.notFoundMetaDescription,
      });
      return;
    }

    if (deepestRoute.data['contentDetail'] === true) {
      const contentHub = this.localeService.content().pages.content;
      const slug = deepestRoute.paramMap.get('slug') ?? '';
      const item = findContentBySlug(contentHub.items, slug);

      this.title.setTitle(
        `${item?.title ?? contentHub.detail.notFoundMetaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
      );
      this.meta.updateTag({
        name: 'description',
        content: item?.excerpt ?? contentHub.detail.notFoundMetaDescription,
      });
      return;
    }

    this.title.setTitle(
      pageContent.metaTitleIsAbsolute
        ? pageContent.metaTitle
        : `${pageContent.metaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
    );
    this.meta.updateTag({ name: 'description', content: pageContent.metaDescription });
  }

  private findDeepestRoute(snapshot: RouterStateSnapshot): ActivatedRouteSnapshot {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private findPageId(route: ActivatedRouteSnapshot): PortfolioPageId {
    return isPortfolioPageId(route.data['pageId']) ? route.data['pageId'] : 'home';
  }
}
