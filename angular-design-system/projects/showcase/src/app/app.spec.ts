import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { GH_THEME_ATTRIBUTE, GH_THEME_STORAGE_KEY } from 'gh-design-system';

import { App } from './app';
import { routes } from './app.routes';

describe('App routing', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.removeAttribute(GH_THEME_ATTRIBUTE);
    localStorage.removeItem(GH_THEME_STORAGE_KEY);
  });

  it('renders every documentation route with a page heading', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const expectedHeadings = new Map([
      ['/', 'Foundations for calm, intelligent interfaces.'],
      ['/colors', 'Color system'],
      ['/typography', 'Typography system'],
      ['/spacing', 'Spacing system'],
      ['/radii', 'Border radius system'],
      ['/shadows', 'Elevation and shadows'],
      ['/buttons', 'Button'],
      ['/badges', 'Badge'],
      ['/tags', 'Tag'],
      ['/cards', 'Card family'],
    ]);

    fixture.detectChanges();

    for (const [path, heading] of expectedHeadings) {
      await router.navigateByUrl(path);
      await fixture.whenStable();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain(heading);
    }
  });

  it('marks the active navigation item with aria-current', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await router.navigateByUrl('/colors');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[aria-current="page"]')?.textContent).toContain('Colors');
  });

  it('redirects unknown routes to overview', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await router.navigateByUrl('/missing-foundation');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Foundations for calm',
    );
  });
});
