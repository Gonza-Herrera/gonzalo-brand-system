import { TestBed } from '@angular/core/testing';
import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY, GhThemeService } from 'gh-design-system';

import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders accessible light, dark and system options', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    expect(buttons).toHaveLength(3);
    expect(compiled.querySelector('legend')?.textContent).toContain('Theme preference');
    expect(buttons[2]?.getAttribute('aria-pressed')).toBe('true');
  });

  it('updates and exposes the selected preference', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'button',
    );
    buttons[1]?.click();
    fixture.detectChanges();

    expect(themeService.preference()).toBe('dark');
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('true');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
  });
});
