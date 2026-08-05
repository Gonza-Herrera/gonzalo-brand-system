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
    ).toHaveLength(15);
    expect(compiled.querySelector('a[href="/surfaces"]')?.textContent).toContain('Surfaces');
    expect(compiled.querySelector('a[href="/ambient-backgrounds"]')?.textContent).toContain(
      'Ambient Backgrounds',
    );
    expect(compiled.querySelector('a[href="/layout"]')?.textContent).toContain('Layout');
    expect(compiled.querySelector('a[href="/forms"]')?.textContent).toContain('Forms');
    expect(compiled.querySelector('a[href="/patterns"]')?.textContent).toContain('Patterns');
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
