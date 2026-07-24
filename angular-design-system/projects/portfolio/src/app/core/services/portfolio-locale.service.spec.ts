import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { PortfolioLocaleService } from './portfolio-locale.service';

describe('PortfolioLocaleService', () => {
  beforeEach(() => {
    document.documentElement.lang = 'en';
    localStorage.removeItem(PORTFOLIO_CONFIG.localeStorageKey);
  });

  afterEach(() => {
    document.documentElement.lang = 'en';
    localStorage.removeItem(PORTFOLIO_CONFIG.localeStorageKey);
  });

  it('starts deterministically in English and validates supported locales', () => {
    const service = TestBed.inject(PortfolioLocaleService);

    expect(service.defaultLocale).toBe('en');
    expect(service.supportedLocales).toEqual(['en', 'es']);
    expect(service.locale()).toBe('en');
    expect(service.isSupportedLocale('en')).toBe(true);
    expect(service.isSupportedLocale('es')).toBe(true);
    expect(service.isSupportedLocale('fr')).toBe(false);
  });

  it('activates localized shell content and updates the document language', () => {
    const service = TestBed.inject(PortfolioLocaleService);

    expect(service.activateLocale('es')).toBe(true);
    expect(service.locale()).toBe('es');
    expect(service.content().shell.navigation.items[1]?.label).toBe('Sobre mí');
    expect(service.content().shell.theme.darkLabel).toBe('Oscuro');
    expect(document.documentElement.lang).toBe('es');
    expect(service.activateLocale('fr')).toBe(false);
    expect(service.locale()).toBe('es');
  });

  it('builds equivalent localized URLs and persists only valid selections', () => {
    const service = TestBed.inject(PortfolioLocaleService);

    expect(service.buildLocalizedUrl('es', '/en/projects')).toBe('/es/projects');
    expect(service.buildLocalizedUrl('en', '/es')).toBe('/en');
    expect(service.rememberLocale('es')).toBe(true);
    expect(service.storedLocale()).toBe('es');
    expect(service.rememberLocale('fr')).toBe(false);
    expect(service.storedLocale()).toBe('es');
  });

  it('remains deterministic without browser storage', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const service = TestBed.inject(PortfolioLocaleService);

    expect(service.locale()).toBe('en');
    expect(service.storedLocale()).toBeNull();
    expect(service.rememberLocale('es')).toBe(false);
    expect(service.activateLocale('es')).toBe(true);
    expect(service.locale()).toBe('es');
  });
});
