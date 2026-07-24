import { TestBed } from '@angular/core/testing';
import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY, GhThemeService } from 'gh-design-system';

import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({ imports: [ThemeSwitcherComponent] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders a localized native select with light, dark and system options', () => {
    TestBed.inject(GhThemeService).setTheme('system');
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const select = element.querySelector<HTMLSelectElement>('select');

    expect(element.querySelector('label')?.textContent).toContain('Theme');
    expect(select?.querySelectorAll('option')).toHaveLength(3);
    expect(select?.value).toBe('system');
  });

  it('applies and persists explicit themes and can return to system', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    const themeService = TestBed.inject(GhThemeService);
    fixture.detectChanges();

    const select = (fixture.nativeElement as HTMLElement).querySelector<HTMLSelectElement>(
      'select',
    );
    if (!select) {
      throw new Error('Theme select was not rendered.');
    }

    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(themeService.preference()).toBe('dark');
    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect(localStorage.getItem(GH_THEME_STORAGE_KEY)).toBe('dark');

    select.value = 'system';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(themeService.preference()).toBe('system');
    expect(document.documentElement.hasAttribute(GH_THEME_ATTRIBUTE)).toBe(false);
  });

  it('updates its accessible label and options for Spanish', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    TestBed.inject(PortfolioLocaleService).activateLocale('es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('label')?.textContent).toContain('Tema');
    expect(element.querySelector('select')?.textContent).toContain('Claro');
    expect(element.querySelector('select')?.textContent).toContain('Oscuro');
    expect(element.querySelector('select')?.textContent).toContain('Sistema');
  });
});
