import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY, type GhTheme, isGhTheme } from './theme';

@Injectable({ providedIn: 'root' })
export class GhThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly activeTheme = signal<GhTheme>('light');

  readonly theme = this.activeTheme.asReadonly();

  constructor() {
    this.applyTheme(this.resolveInitialTheme(), false);
  }

  setTheme(theme: GhTheme): void {
    this.applyTheme(theme, true);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private resolveInitialTheme(): GhTheme {
    if (!this.isBrowser) {
      return 'light';
    }

    const storedTheme = this.readStoredTheme();

    if (storedTheme) {
      return storedTheme;
    }

    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private applyTheme(theme: GhTheme, persist: boolean): void {
    this.activeTheme.set(theme);

    if (!this.isBrowser) {
      return;
    }

    this.document.documentElement.setAttribute(GH_THEME_ATTRIBUTE, theme);

    if (persist) {
      this.storeTheme(theme);
    }
  }

  private readStoredTheme(): GhTheme | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(GH_THEME_STORAGE_KEY);

      return isGhTheme(value) ? value : null;
    } catch {
      return null;
    }
  }

  private storeTheme(theme: GhTheme): void {
    try {
      this.document.defaultView?.localStorage.setItem(GH_THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in privacy-focused browsing contexts.
    }
  }
}
