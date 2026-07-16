import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY } from './theme';
import { GhThemeService } from './theme.service';

describe('GhThemeService', () => {
  let mediaMatches = false;
  let mediaChangeListener: ((event: MediaQueryListEvent) => void) | undefined;
  let originalMatchMedia: PropertyDescriptor | undefined;

  beforeEach(() => {
    mediaMatches = false;
    mediaChangeListener = undefined;
    originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((): Partial<MediaQueryList> => ({
        matches: mediaMatches,
        media: '(prefers-color-scheme: dark)',
        addEventListener: (_type: string, listener: EventListenerOrEventListenerObject): void => {
          mediaChangeListener = listener as (event: MediaQueryListEvent) => void;
        },
        removeEventListener: vi.fn(),
      })),
    });

    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    if (originalMatchMedia) {
      Object.defineProperty(window, 'matchMedia', originalMatchMedia);
    } else {
      Reflect.deleteProperty(window, 'matchMedia');
    }
  });

  it('uses system preference by default with a predictable light fallback', () => {
    const service = TestBed.inject(GhThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('light');
    expect(document.documentElement.hasAttribute(GH_THEME_ATTRIBUTE)).toBe(false);
  });

  it('resolves the initial system preference', () => {
    mediaMatches = true;

    const service = TestBed.inject(GhThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('reacts to system preference changes', () => {
    const service = TestBed.inject(GhThemeService);

    mediaChangeListener?.({ matches: true } as MediaQueryListEvent);

    expect(service.resolvedTheme()).toBe('dark');
  });

  it('applies and persists an explicit preference', () => {
    const service = TestBed.inject(GhThemeService);

    service.setTheme('dark');

    expect(service.preference()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(localStorage.getItem(GH_THEME_STORAGE_KEY)).toBe('dark');
  });

  it('restores a stored explicit preference', () => {
    localStorage.setItem(GH_THEME_STORAGE_KEY, 'dark');

    const service = TestBed.inject(GhThemeService);

    expect(service.preference()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
  });

  it('removes the explicit attribute when system is selected', () => {
    const service = TestBed.inject(GhThemeService);

    service.setTheme('dark');
    service.setTheme('system');

    expect(service.preference()).toBe('system');
    expect(document.documentElement.hasAttribute(GH_THEME_ATTRIBUTE)).toBe(false);
    expect(localStorage.getItem(GH_THEME_STORAGE_KEY)).toBe('system');
  });

  it('is safe and predictable outside the browser', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });

    const service = TestBed.inject(GhThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('light');
  });
});
