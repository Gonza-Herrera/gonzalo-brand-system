import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhNavigationComponent } from './navigation.component';

@Component({
  standalone: true,
  imports: [GhNavigationComponent],
  template: `
    <gh-navigation
      brand="Brand"
      menuId="test-menu"
      [items]="items"
      [showThemeControl]="true"
      [interceptInternalNavigation]="interceptInternalNavigation"
      (internalNavigate)="navigations.push($event)"
    >
      <a ghNavigationActions href="/contact">Contact</a>
      <span ghNavigationThemeControl>Theme</span>
    </gh-navigation>
  `,
})
class NavigationTestHost {
  interceptInternalNavigation = true;
  readonly navigations: string[] = [];
  readonly items = [
    { label: 'Home', href: '/', active: true },
    { label: 'External', href: 'https://example.com', external: true },
  ];
}

describe('GhNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NavigationTestHost] }).compileComponents();
  });

  it('renders brand, native links, active state and projected controls', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const external = element.querySelector<HTMLAnchorElement>('a[href="https://example.com"]');

    expect(element.querySelector('.gh-navigation__brand')?.textContent).toContain('Brand');
    expect(element.querySelectorAll('nav a')).toHaveLength(2);
    expect(element.querySelector('a[aria-current="page"]')?.textContent).toContain('Home');
    expect(external?.target).toBe('_blank');
    expect(external?.rel).toBe('noopener noreferrer');
    expect(element.querySelector('[ghNavigationActions]')).not.toBeNull();
    expect(element.querySelector('[ghNavigationThemeControl]')).not.toBeNull();
    expect(element.querySelector('gh-icon-button.gh-navigation__toggle button')).not.toBeNull();
  });

  it('starts closed and opens and closes the mobile menu with its real button', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const toggle = element.querySelector<HTMLButtonElement>('.gh-navigation__toggle button');
    const panel = element.querySelector('#test-menu');

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(panel?.classList).not.toContain('gh-navigation__panel--open');

    toggle?.click();
    fixture.detectChanges();
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(panel?.classList).toContain('gh-navigation__panel--open');

    element.querySelector<HTMLAnchorElement>('nav a')?.click();
    fixture.detectChanges();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and restores focus to the real menu button', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const header = element.querySelector<HTMLElement>('.gh-navigation');
    const toggle = element.querySelector<HTMLButtonElement>('.gh-navigation__toggle button');

    toggle?.click();
    fixture.detectChanges();
    header?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('emits intercepted internal navigation while preserving the semantic href', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const homeLink = element.querySelector<HTMLAnchorElement>('a[href="/"]')!;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    homeLink.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.navigations).toEqual(['/']);
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('preserves native navigation when interception is disabled', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.componentInstance.interceptInternalNavigation = false;
    fixture.detectChanges();
    const homeLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'a[href="/"]',
    )!;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    homeLink.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.navigations).toEqual([]);
  });

  it('does not intercept external links or modified internal clicks', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const externalLink = element.querySelector<HTMLAnchorElement>('a[href="https://example.com"]')!;
    const homeLink = element.querySelector<HTMLAnchorElement>('a[href="/"]')!;
    const externalEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const modifiedEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
    });

    externalLink.dispatchEvent(externalEvent);
    homeLink.dispatchEvent(modifiedEvent);

    expect(externalEvent.defaultPrevented).toBe(false);
    expect(modifiedEvent.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.navigations).toEqual([]);
  });

  it('intercepts the brand link through the same navigation contract', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const brandLink = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      '.gh-navigation__brand',
    )!;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    brandLink.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.navigations).toEqual(['/']);
  });
});
