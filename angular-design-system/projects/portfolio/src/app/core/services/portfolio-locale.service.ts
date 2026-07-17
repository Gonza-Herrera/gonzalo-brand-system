import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

import { getPortfolioContent } from '../../content/portfolio-content.registry';
import {
  isPortfolioLocale,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { switchLocaleInUrl } from '../routing/portfolio-route.utils';
import { PortfolioLocaleStorageService } from './portfolio-locale-storage.service';

@Injectable({ providedIn: 'root' })
export class PortfolioLocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(PortfolioLocaleStorageService);
  private readonly activeLocale = signal<PortfolioLocale>(PORTFOLIO_CONFIG.defaultLocale);

  readonly supportedLocales = PORTFOLIO_CONFIG.supportedLocales;
  readonly defaultLocale = PORTFOLIO_CONFIG.defaultLocale;
  readonly locale = this.activeLocale.asReadonly();
  readonly content = computed(() => getPortfolioContent(this.locale()));

  isSupportedLocale(value: unknown): value is PortfolioLocale {
    return isPortfolioLocale(value);
  }

  activateLocale(value: unknown): value is PortfolioLocale {
    if (!isPortfolioLocale(value)) {
      return false;
    }

    this.activeLocale.set(value);
    this.document.documentElement.setAttribute('lang', value);
    return true;
  }

  buildLocalizedUrl(locale: PortfolioLocale, currentUrl: string): string {
    return switchLocaleInUrl(locale, currentUrl);
  }

  rememberLocale(value: unknown): boolean {
    return this.storage.write(value);
  }

  storedLocale(): PortfolioLocale | null {
    return this.storage.read();
  }
}
