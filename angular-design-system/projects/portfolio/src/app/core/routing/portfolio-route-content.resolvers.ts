import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';

import type { PortfolioContentHubContent } from '../../content/models/content-hub-content.model';
import type { PortfolioProjectsContent } from '../../content/models/projects-content.model';
import { PortfolioLocaleService } from '../services/portfolio-locale.service';

export const PORTFOLIO_PROJECTS_CONTENT_DATA = 'portfolioProjectsContent';
export const PORTFOLIO_CONTENT_HUB_DATA = 'portfolioContentHub';

export const portfolioProjectsContentResolver: ResolveFn<PortfolioProjectsContent> = () => {
  const locale = inject(PortfolioLocaleService).locale();
  return import('../../content/projects-content.registry').then((registry) =>
    registry.getPortfolioProjectsContent(locale),
  );
};

export const portfolioContentHubResolver: ResolveFn<PortfolioContentHubContent> = () => {
  const locale = inject(PortfolioLocaleService).locale();
  return import('../../content/content-hub-content.registry').then((registry) =>
    registry.getPortfolioContentHubContent(locale),
  );
};
