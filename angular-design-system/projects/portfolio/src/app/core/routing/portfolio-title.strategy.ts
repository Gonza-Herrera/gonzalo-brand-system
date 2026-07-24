import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { findProjectBySlug } from '../../content/utils/project-selectors';
import { findContentBySlug } from '../../content/utils/content-selectors';
import { isPortfolioPageId, type PortfolioPageId } from '../../content/models/page-content.model';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { PortfolioLocaleService } from '../services/portfolio-locale.service';
import { SeoService } from '../seo/seo.service';

@Injectable()
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly localeService = inject(PortfolioLocaleService);
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const deepestRoute = this.findDeepestRoute(snapshot);
    const pageId = this.findPageId(deepestRoute);
    const pageContent = this.localeService.content().pages[pageId];
    const locale = this.localeService.locale();

    if (deepestRoute.data['projectDetail'] === true) {
      const projectsContent = this.localeService.content().pages.projects;
      const slug = deepestRoute.paramMap.get('slug') ?? '';
      const project = findProjectBySlug(projectsContent.items, slug);

      this.seo.updatePageMetadata({
        pageId: project ? 'projects' : 'not-found',
        locale,
        path: snapshot.url,
        indexable: Boolean(project),
        metadata: {
          title: `${project?.title ?? projectsContent.detail.notFoundMetaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
          description: project?.shortDescription ?? projectsContent.detail.notFoundMetaDescription,
          robots: project ? 'index, follow' : 'noindex, nofollow',
        },
      });
      return;
    }

    if (deepestRoute.data['contentDetail'] === true) {
      const contentHub = this.localeService.content().pages.content;
      const slug = deepestRoute.paramMap.get('slug') ?? '';
      const item = findContentBySlug(contentHub.items, slug);

      this.seo.updatePageMetadata({
        pageId: item ? 'content' : 'not-found',
        locale,
        path: snapshot.url,
        indexable: Boolean(item),
        metadata: {
          title: `${item?.title ?? contentHub.detail.notFoundMetaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
          description: item?.excerpt ?? contentHub.detail.notFoundMetaDescription,
          robots: item ? 'index, follow' : 'noindex, nofollow',
        },
      });
      return;
    }

    this.seo.updatePageMetadata({
      pageId,
      locale,
      path: snapshot.url,
      metadata: {
        title: pageContent.metaTitleIsAbsolute
          ? pageContent.metaTitle
          : `${pageContent.metaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
        description: pageContent.metaDescription,
        robots: pageId === 'not-found' ? 'noindex, nofollow' : 'index, follow',
      },
    });
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
