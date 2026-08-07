import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhContactCalloutComponent,
  GhContentHighlightComponent,
  GhExperienceTimelineComponent,
  GhFeatureGridComponent,
  GhFooterComponent,
  GhHeroComponent,
  GhNavigationComponent,
  GhSectionHeadingComponent,
  GhThemeService,
} from 'gh-design-system';

import { PatternsPage } from './patterns';

describe('PatternsPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
    await TestBed.configureTestingModule({ imports: [PatternsPage] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders every Brand Pattern from the public package API', () => {
    const fixture = TestBed.createComponent(PatternsPage);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('gh-navigation')).not.toBeNull();
    expect(element.querySelector('gh-footer')).not.toBeNull();
    expect(element.querySelector('gh-section-heading')).not.toBeNull();
    expect(element.querySelector('gh-feature-grid')).not.toBeNull();
    expect(element.querySelector('gh-experience-timeline')).not.toBeNull();
    expect(element.querySelector('gh-content-highlight')).not.toBeNull();
    expect(element.querySelector('gh-contact-callout')).not.toBeNull();
    expect(
      element.querySelector('[data-testid="patterns-navigation-guidance"]')?.textContent,
    ).toContain('One Header filter');
    expect(element.querySelector('gh-navigation a[aria-current="page"]')).not.toBeNull();
    expect(element.querySelector('.pattern-language-selector')).not.toBeNull();
    expect(element.querySelector('gh-ambient-background[data-preset="brand"]')).not.toBeNull();
    expect(
      element.querySelector('[data-testid="patterns-navigation-motion-guidelines"]')?.textContent,
    ).toContain('Pressed');
    expect(
      element.querySelector('[data-testid="patterns-navigation-motion-guidelines"]')?.textContent,
    ).toContain('Selector');
  });

  it('renders the composed landing with public primitives and components', () => {
    const fixture = TestBed.createComponent(PatternsPage);
    fixture.detectChanges();
    const landing = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="patterns-landing"]',
    );

    expect(landing?.querySelector('gh-navigation')).not.toBeNull();
    expect(landing?.querySelector('gh-hero')).not.toBeNull();
    expect(landing?.querySelector('gh-grid')).not.toBeNull();
    expect(landing?.querySelector('gh-project-card')).not.toBeNull();
    expect(landing?.querySelector('gh-experience-card')).not.toBeNull();
    expect(landing?.querySelector('gh-contact-callout')).not.toBeNull();
    expect(landing?.querySelector('gh-footer')).not.toBeNull();
  });

  it('continues rendering the landing after a public theme change', () => {
    const fixture = TestBed.createComponent(PatternsPage);
    const themeService = TestBed.inject(GhThemeService);
    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[data-testid="patterns-landing"]'),
    ).not.toBeNull();
  });

  it('uses the exported standalone component classes', () => {
    expect(GhHeroComponent).toBeDefined();
    expect(GhNavigationComponent).toBeDefined();
    expect(GhFooterComponent).toBeDefined();
    expect(GhSectionHeadingComponent).toBeDefined();
    expect(GhFeatureGridComponent).toBeDefined();
    expect(GhExperienceTimelineComponent).toBeDefined();
    expect(GhContentHighlightComponent).toBeDefined();
    expect(GhContactCalloutComponent).toBeDefined();
  });
});
