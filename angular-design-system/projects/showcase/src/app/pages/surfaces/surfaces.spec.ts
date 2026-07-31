import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhDividerComponent,
  GhGlassPanelComponent,
  GhSurfaceComponent,
  GhThemeService,
} from 'gh-design-system';

import { SurfacesPage } from './surfaces';

describe('SurfacesPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({ imports: [SurfacesPage] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders every public Surface material and the Glass Panel composition', () => {
    const fixture = TestBed.createComponent(SurfacesPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    for (const variant of ['solid', 'glass-subtle', 'glass', 'glass-elevated', 'glass-floating']) {
      expect(element.querySelector(`gh-surface[data-variant="${variant}"]`)).not.toBeNull();
    }

    expect(
      element.querySelector('gh-glass-panel > gh-surface[data-variant="glass-elevated"]'),
    ).not.toBeNull();
    expect(element.querySelector('gh-glass-panel gh-surface[data-variant="solid"]')).not.toBeNull();
    expect(element.querySelectorAll('gh-tag')).toHaveLength(3);
    expect(element.querySelector('.overflow-sample')).not.toBeNull();
  });

  it('shows visual states without invalid interactive nesting', () => {
    const fixture = TestBed.createComponent(SurfacesPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const interactiveSurface = element.querySelector('gh-surface[data-interactive="true"]');
    const disabledSurface = element.querySelector('gh-surface[data-disabled="true"]');

    expect(
      interactiveSurface?.querySelector('a[href="/surfaces#surface-composition"]'),
    ).not.toBeNull();
    expect(disabledSurface?.querySelector('button:disabled')).not.toBeNull();
    expect(element.querySelector('a button, button a')).toBeNull();
    expect(interactiveSurface?.hasAttribute('role')).toBe(false);
    expect(interactiveSurface?.hasAttribute('tabindex')).toBe(false);
  });

  it('reuses the existing public Divider without a competing variant API', () => {
    const fixture = TestBed.createComponent(SurfacesPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('gh-divider').length).toBeGreaterThan(1);
    expect(GhDividerComponent).toBeDefined();
    expect(GhSurfaceComponent).toBeDefined();
    expect(GhGlassPanelComponent).toBeDefined();
  });

  it('continues rendering materials after a public theme change', () => {
    const fixture = TestBed.createComponent(SurfacesPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        'gh-surface[data-variant="glass-floating"]',
      ),
    ).not.toBeNull();
  });
});
