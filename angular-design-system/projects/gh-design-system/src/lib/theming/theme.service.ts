import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  type GhTheme,
  type GhThemePreference,
  isGhThemePreference,
} from './theme';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

@Injectable({ providedIn: 'root' })
export class GhThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly selectedPreference = signal<GhThemePreference>('system');
  private readonly systemTheme = signal<GhTheme>('light');

  readonly preference = this.selectedPreference.asReadonly();
  readonly resolvedTheme = computed<GhTheme>(() => {
    const preference = this.preference();
    return preference === 'system' ? this.systemTheme() : preference;
  });

  // Backward-compatible alias retained for existing consumers.
  readonly theme = this.resolvedTheme;

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    this.observeSystemTheme();
    this.applyPreference(this.readStoredPreference() ?? 'system', false);
  }

  setTheme(preference: GhThemePreference): void {
    this.applyPreference(preference, true);
  }

  toggleTheme(): void {
    this.setTheme(this.resolvedTheme() === 'light' ? 'dark' : 'light');
  }

  private observeSystemTheme(): void {
    const mediaQuery = this.document.defaultView?.matchMedia?.(DARK_MODE_QUERY);

    if (!mediaQuery) {
      return;
    }

    this.systemTheme.set(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (event: MediaQueryListEvent): void => {
      this.systemTheme.set(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', handleChange);
    });
  }

  private applyPreference(preference: GhThemePreference, persist: boolean): void {
    this.selectedPreference.set(preference);

    if (!this.isBrowser) {
      return;
    }

    if (preference === 'system') {
      this.document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    } else {
      this.document.documentElement.setAttribute(GH_THEME_ATTRIBUTE, preference);
    }

    if (persist) {
      this.storePreference(preference);
    }
  }

  private readStoredPreference(): GhThemePreference | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(GH_THEME_STORAGE_KEY);

      return isGhThemePreference(value) ? value : null;
    } catch {
      return null;
    }
  }

  private storePreference(preference: GhThemePreference): void {
    try {
      this.document.defaultView?.localStorage.setItem(GH_THEME_STORAGE_KEY, preference);
    } catch {
      // Storage can be unavailable in privacy-focused browsing contexts.
    }
  }
}
