import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhBadgeComponent,
  GhThemeService,
} from 'gh-design-system';

import { BadgesPage } from './badges';

describe('BadgesPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [BadgesPage, GhBadgeComponent],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders the public Badge component for all variants', () => {
    const fixture = TestBed.createComponent(BadgesPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const variants = ['neutral', 'info', 'success', 'warning', 'danger', 'accent'];

    for (const variant of variants) {
      expect(element.querySelector(`.gh-badge--${variant}`)).not.toBeNull();
    }
  });

  it('renders both appearances and survives a theme change', () => {
    const fixture = TestBed.createComponent(BadgesPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.gh-badge--soft')).not.toBeNull();
    expect(element.querySelector('.gh-badge--solid')).not.toBeNull();
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
  });
});
