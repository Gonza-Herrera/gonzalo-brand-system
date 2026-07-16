import { TestBed } from '@angular/core/testing';
import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY, GhThemeService } from 'gh-design-system';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders the design-system foundations', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('A calm foundation');
    expect(compiled.querySelectorAll('.foundation-section')).toHaveLength(5);
  });

  it('switches between light and dark themes', () => {
    const fixture = TestBed.createComponent(App);
    const themeService = TestBed.inject(GhThemeService);
    const compiled = fixture.nativeElement as HTMLElement;

    themeService.setTheme('light');
    fixture.detectChanges();
    compiled.querySelector<HTMLButtonElement>('.theme-toggle')?.click();

    expect(themeService.theme()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
  });
});
