import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhTagComponent,
  GhThemeService,
} from 'gh-design-system';

import { TagsPage } from './tags';

describe('TagsPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [TagsPage, GhTagComponent],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders real static, selectable and removable Tags', () => {
    const fixture = TestBed.createComponent(TagsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.gh-tag--static')).not.toBeNull();
    expect(element.querySelector('button.gh-tag--selectable')).not.toBeNull();
    expect(element.querySelector('.gh-tag--removable .gh-tag__remove')).not.toBeNull();
  });

  it('updates controlled selection and removal examples', () => {
    const fixture = TestBed.createComponent(TagsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const leadership = [
      ...element.querySelectorAll<HTMLButtonElement>('button.gh-tag--selectable'),
    ].find((button) => button.textContent?.includes('Leadership'));
    leadership?.click();
    fixture.detectChanges();

    expect(leadership?.getAttribute('aria-pressed')).toBe('true');

    const removeAngular = element.querySelector<HTMLButtonElement>(
      '.gh-tag__remove[aria-label="Remove Angular filter"]',
    );
    removeAngular?.click();
    fixture.detectChanges();

    expect(element.querySelector('.gh-tag__remove[aria-label="Remove Angular filter"]')).toBeNull();
  });

  it('continues rendering after a public theme change', () => {
    const fixture = TestBed.createComponent(TagsPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect((fixture.nativeElement as HTMLElement).querySelector('.gh-tag')).not.toBeNull();
  });
});
