import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhButtonComponent,
  GhIconButtonComponent,
  GhThemeService,
} from 'gh-design-system';

import { ButtonsPage } from './buttons';

describe('ButtonsPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [ButtonsPage, GhButtonComponent, GhIconButtonComponent],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders the public component for every variant', () => {
    const fixture = TestBed.createComponent(ButtonsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const variants = ['primary', 'secondary', 'tertiary', 'ghost', 'danger'];

    for (const variant of variants) {
      expect(element.querySelector(`button.gh-button--${variant}`)).not.toBeNull();
    }
  });

  it('renders every Icon Button variant with a consumer-provided accessible name', () => {
    const fixture = TestBed.createComponent(ButtonsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const variants = ['primary', 'secondary', 'ghost', 'danger'];

    for (const variant of variants) {
      const button = element.querySelector<HTMLButtonElement>(`button.gh-icon-button--${variant}`);
      expect(button).not.toBeNull();
      expect(button?.getAttribute('aria-label')).toBeTruthy();
    }
  });

  it('continues rendering after a public theme change', () => {
    const fixture = TestBed.createComponent(ButtonsPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect((fixture.nativeElement as HTMLElement).querySelector('gh-button button')).not.toBeNull();
  });

  it('uses the real button in the form example', () => {
    const fixture = TestBed.createComponent(ButtonsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const submit = element.querySelector<HTMLButtonElement>('.form-example button[type="submit"]');
    submit?.click();
    fixture.detectChanges();

    expect(element.querySelector('.form-example > p')?.textContent).toContain(
      'submitted successfully',
    );
  });
});
