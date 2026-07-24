import { TestBed } from '@angular/core/testing';
import {
  GH_THEME_ATTRIBUTE,
  GH_THEME_STORAGE_KEY,
  GhArticleCardComponent,
  GhCardComponent,
  GhExperienceCardComponent,
  GhProjectCardComponent,
  GhThemeService,
} from 'gh-design-system';

import { CardsPage } from './cards';

describe('CardsPage', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [
        CardsPage,
        GhArticleCardComponent,
        GhCardComponent,
        GhExperienceCardComponent,
        GhProjectCardComponent,
      ],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders all public Card family components', () => {
    const fixture = TestBed.createComponent(CardsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('gh-card')).not.toBeNull();
    expect(element.querySelectorAll('gh-article-card')).toHaveLength(2);
    expect(element.querySelectorAll('gh-experience-card')).toHaveLength(2);
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(3);
    expect(element.querySelector('.gh-card--glass')).not.toBeNull();
    expect(element.querySelector('.gh-card--selected')).not.toBeNull();
  });

  it('uses native links without invalid interactive nesting', () => {
    const fixture = TestBed.createComponent(CardsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('gh-article-card h2 a')).not.toBeNull();
    expect(element.querySelector('.project-card__actions a')).not.toBeNull();
    expect(element.querySelector('a button, button a')).toBeNull();
  });

  it('continues rendering after a public theme change', () => {
    const fixture = TestBed.createComponent(CardsPage);
    const themeService = TestBed.inject(GhThemeService);

    fixture.detectChanges();
    themeService.setTheme('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute(GH_THEME_ATTRIBUTE)).toBe('dark');
    expect((fixture.nativeElement as HTMLElement).querySelector('article.gh-card')).not.toBeNull();
  });
});
