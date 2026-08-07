import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhBadgeComponent,
  GhCardComponent,
  GhClusterComponent,
  GhContainerComponent,
  GhDividerComponent,
  GhGridComponent,
  GhHeroComponent,
  GhInlineComponent,
  GhNavigationComponent,
  GhProjectCardComponent,
  GhSectionComponent,
  GhStackComponent,
  GhTagComponent,
  GhThemeService,
} from 'gh-design-system';

import { LayoutPage } from './layout';

describe('LayoutPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({ imports: [LayoutPage] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders every Layout Primitive from the public package API', () => {
    const fixture = TestBed.createComponent(LayoutPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('gh-container')).not.toBeNull();
    expect(element.querySelector('gh-section')).not.toBeNull();
    expect(element.querySelector('gh-stack')).not.toBeNull();
    expect(element.querySelector('gh-inline')).not.toBeNull();
    expect(element.querySelector('gh-grid')).not.toBeNull();
    expect(element.querySelector('gh-cluster')).not.toBeNull();
    expect(element.querySelector('gh-divider')).not.toBeNull();
    expect(element.querySelector('.gh-divider--dashed')).not.toBeNull();
  });

  it('demonstrates one ambient layout containing Navigation, Main and Hero', () => {
    const fixture = TestBed.createComponent(LayoutPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const integration = element.querySelector('#layout-floating-integration')?.closest('section');
    const ambient = integration?.querySelector('gh-ambient-background');

    expect(ambient?.getAttribute('data-preset')).toBe('brand');
    expect(ambient?.querySelector('gh-navigation')).not.toBeNull();
    expect(ambient?.querySelector('[data-layout-region="main"]')).not.toBeNull();
    expect(ambient?.querySelector('gh-hero')).not.toBeNull();
    expect(integration?.textContent).toContain('Header Integration');
    expect(integration?.textContent).toContain('Hero Integration');
  });

  it('composes real Cards in Grid and real Tags and Badges in Cluster', () => {
    const fixture = TestBed.createComponent(LayoutPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const projectGrid = element.querySelector('#layout-grid')?.closest('section');
    const clusterSection = element.querySelector('#layout-cluster')?.closest('section');

    expect(projectGrid?.querySelectorAll('gh-project-card')).toHaveLength(3);
    expect(projectGrid?.querySelector('gh-card')).not.toBeNull();
    expect(clusterSection?.querySelectorAll('gh-tag').length).toBeGreaterThan(1);
    expect(clusterSection?.querySelectorAll('gh-badge').length).toBeGreaterThan(1);
  });

  it('continues rendering all primitives after a public theme change', () => {
    const fixture = TestBed.createComponent(LayoutPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('gh-grid').length,
    ).toBeGreaterThan(1);
  });

  it('uses the public standalone component classes in its compiled imports', () => {
    expect(GhContainerComponent).toBeDefined();
    expect(GhSectionComponent).toBeDefined();
    expect(GhStackComponent).toBeDefined();
    expect(GhInlineComponent).toBeDefined();
    expect(GhGridComponent).toBeDefined();
    expect(GhHeroComponent).toBeDefined();
    expect(GhClusterComponent).toBeDefined();
    expect(GhDividerComponent).toBeDefined();
    expect(GhCardComponent).toBeDefined();
    expect(GhProjectCardComponent).toBeDefined();
    expect(GhTagComponent).toBeDefined();
    expect(GhBadgeComponent).toBeDefined();
    expect(GhNavigationComponent).toBeDefined();
  });
});
