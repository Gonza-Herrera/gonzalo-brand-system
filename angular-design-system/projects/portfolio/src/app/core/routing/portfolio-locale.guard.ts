import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { PortfolioLocaleService } from '../services/portfolio-locale.service';
import { createInvalidLocaleFallbackUrl } from './portfolio-route.utils';

export const portfolioLocaleGuard: CanActivateFn = (route, state) => {
  const localeService = inject(PortfolioLocaleService);
  const locale = route.paramMap.get('locale');

  if (localeService.activateLocale(locale)) {
    return true;
  }

  const fallbackUrl = createInvalidLocaleFallbackUrl(PORTFOLIO_CONFIG.defaultLocale, state.url);
  return inject(Router).parseUrl(fallbackUrl);
};
