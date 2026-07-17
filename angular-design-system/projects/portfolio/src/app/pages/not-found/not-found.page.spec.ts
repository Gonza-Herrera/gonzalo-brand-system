import { TestBed } from '@angular/core/testing';

import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
  it('renders an accessible 404 and a native link home', async () => {
    await TestBed.configureTestingModule({ imports: [NotFoundPage] }).compileComponents();
    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const homeLink = element.querySelector<HTMLAnchorElement>('a');

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Page not found');
    expect(homeLink?.getAttribute('href')).toBe('/');
    expect(homeLink?.textContent).toContain('Return home');
    expect(element.querySelector('button')).toBeNull();
  });
});
