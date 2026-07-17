import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import {
  isPortfolioLocale,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

@Injectable({ providedIn: 'root' })
export class PortfolioLocaleStorageService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  read(): PortfolioLocale | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const value = this.document.defaultView?.localStorage.getItem(
        PORTFOLIO_CONFIG.localeStorageKey,
      );
      return isPortfolioLocale(value) ? value : null;
    } catch {
      return null;
    }
  }

  write(value: unknown): boolean {
    if (!this.isBrowser || !isPortfolioLocale(value)) {
      return false;
    }

    try {
      const storage = this.document.defaultView?.localStorage;

      if (!storage) {
        return false;
      }

      storage.setItem(PORTFOLIO_CONFIG.localeStorageKey, value);
      return true;
    } catch {
      return false;
    }
  }
}
