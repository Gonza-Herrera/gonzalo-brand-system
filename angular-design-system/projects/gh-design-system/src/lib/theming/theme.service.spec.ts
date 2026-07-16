import { TestBed } from '@angular/core/testing';

import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY } from './theme';
import { GhThemeService } from './theme.service';

describe('GhThemeService', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('applies and persists an explicit theme', () => {
    const service = TestBed.inject(GhThemeService);

    service.setTheme('dark');

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(localStorage.getItem(GH_THEME_STORAGE_KEY)).toBe('dark');
  });

  it('toggles between the supported themes', () => {
    const service = TestBed.inject(GhThemeService);

    service.setTheme('light');
    service.toggleTheme();

    expect(service.theme()).toBe('dark');
  });

  it('prioritizes a stored explicit preference', () => {
    localStorage.setItem(GH_THEME_STORAGE_KEY, 'dark');

    const service = TestBed.inject(GhThemeService);

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
  });
});
