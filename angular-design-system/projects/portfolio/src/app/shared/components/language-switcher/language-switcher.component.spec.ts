import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Routes } from '@angular/router';

import { PORTFOLIO_CONFIG } from '../../../core/config/portfolio.config';
import { portfolioLocaleGuard } from '../../../core/routing/portfolio-locale.guard';
import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';
import { LanguageSwitcherComponent } from './language-switcher.component';

@Component({ standalone: true, template: '' })
class EmptyRouteComponent {}

const testRoutes: Routes = [
  {
    path: ':locale',
    canActivate: [portfolioLocaleGuard],
    children: [
      { path: '', pathMatch: 'full', component: EmptyRouteComponent },
      { path: 'about', component: EmptyRouteComponent },
      { path: 'experience', component: EmptyRouteComponent },
      { path: 'projects', component: EmptyRouteComponent },
      { path: 'projects/:slug', component: EmptyRouteComponent },
      { path: 'content', component: EmptyRouteComponent },
      { path: 'content/:slug', component: EmptyRouteComponent },
    ],
  },
];

describe('LanguageSwitcherComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem(PORTFOLIO_CONFIG.localeStorageKey);

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [provideRouter(testRoutes)],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem(PORTFOLIO_CONFIG.localeStorageKey);
  });

  it('renders accessible EN and ES links for the equivalent page', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/en/projects');
    await fixture.whenStable();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('a');

    expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe('Language');
    expect(links).toHaveLength(2);
    expect(links[0]?.getAttribute('hreflang')).toBe('en');
    expect(links[0]?.getAttribute('aria-current')).toBe('page');
    expect(links[1]?.getAttribute('href')).toBe('/es/projects');
    expect(links[1]?.getAttribute('lang')).toBe('es');
  });

  it('changes locale, preserves the page and persists the manual selection', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    const localeService = TestBed.inject(PortfolioLocaleService);
    fixture.detectChanges();

    await router.navigateByUrl('/en/about');
    await fixture.whenStable();
    fixture.detectChanges();

    const spanishLink = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
      'a',
    )[1];
    spanishLink?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/es/about');
    expect(localeService.locale()).toBe('es');
    expect(localeService.storedLocale()).toBe('es');
    const currentSpanishLink = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLAnchorElement>('a[hreflang="es"]');
    expect(currentSpanishLink?.getAttribute('aria-current')).toBe('page');
  });

  it('builds the opposite Home URL without an extra segment', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/es');
    await fixture.whenStable();
    fixture.detectChanges();

    const englishLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'a[hreflang="en"]',
    );
    expect(englishLink?.getAttribute('href')).toBe('/en');
  });

  it('preserves the Experience route when changing language', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/en/experience');
    await fixture.whenStable();
    fixture.detectChanges();

    const spanishLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'a[hreflang="es"]',
    );
    expect(spanishLink?.getAttribute('href')).toBe('/es/experience');
  });

  it('preserves a stable project slug when changing language', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/en/projects/angular-design-system');
    await fixture.whenStable();
    fixture.detectChanges();

    const spanishLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'a[hreflang="es"]',
    );
    expect(spanishLink?.getAttribute('href')).toBe('/es/projects/angular-design-system');
  });

  it('preserves a stable content slug when changing language', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    await router.navigateByUrl('/en/content/angular-14-vs-angular-20');
    await fixture.whenStable();
    fixture.detectChanges();

    const spanishLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'a[hreflang="es"]',
    );
    expect(spanishLink?.getAttribute('href')).toBe('/es/content/angular-14-vs-angular-20');
  });
});
