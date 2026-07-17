import { TestBed } from '@angular/core/testing';
import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY, GhThemeService } from 'gh-design-system';

import { appConfig } from './app.config';

describe('Portfolio theme integration', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('initializes the public theme service with a stable system preference', async () => {
    await TestBed.configureTestingModule({
      providers: [...(appConfig.providers ?? [])],
    }).compileComponents();

    const themeService = TestBed.inject(GhThemeService);

    expect(themeService.preference()).toBe('system');
    expect(['light', 'dark']).toContain(themeService.resolvedTheme());
    expect(document.documentElement.hasAttribute(GH_THEME_ATTRIBUTE)).toBe(false);
  });
});
