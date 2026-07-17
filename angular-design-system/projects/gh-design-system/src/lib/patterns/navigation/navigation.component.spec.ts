import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhNavigationComponent } from './navigation.component';

@Component({
  standalone: true,
  imports: [GhNavigationComponent],
  template: `
    <gh-navigation brand="Brand" menuId="test-menu" [items]="items" [showThemeControl]="true">
      <a ghNavigationActions href="/contact">Contact</a>
      <span ghNavigationThemeControl>Theme</span>
    </gh-navigation>
  `,
})
class NavigationTestHost {
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
  });

  it('starts closed and opens and closes the mobile menu with its real button', () => {
    const fixture = TestBed.createComponent(NavigationTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const toggle = element.querySelector<HTMLButtonElement>('.gh-navigation__toggle');
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
});
