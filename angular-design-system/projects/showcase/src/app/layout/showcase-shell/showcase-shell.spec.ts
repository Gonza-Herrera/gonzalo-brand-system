import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ShowcaseShell } from './showcase-shell';

describe('ShowcaseShell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseShell],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the design system navigation', () => {
    const fixture = TestBed.createComponent(ShowcaseShell);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelectorAll('nav[aria-label="Design system documentation"] a'),
    ).toHaveLength(7);
    expect(compiled.querySelector('.skip-link')?.getAttribute('href')).toBe('#showcase-content');
  });

  it('opens and closes mobile navigation with buttons and Escape', () => {
    const fixture = TestBed.createComponent(ShowcaseShell);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.menu-toggle');

    toggle?.click();
    fixture.detectChanges();

    expect(
      compiled.querySelector('#showcase-navigation')?.classList.contains('sidebar--open'),
    ).toBe(true);
    expect(compiled.querySelector('.navigation-backdrop')).toBeTruthy();
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(
      compiled.querySelector('#showcase-navigation')?.classList.contains('sidebar--open'),
    ).toBe(false);
    expect(compiled.querySelector('.navigation-backdrop')).toBeNull();
  });
});
