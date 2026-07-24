import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NotFoundPage] }).compileComponents();
  });

  it('renders an accessible English 404 and a native localized link home', () => {
    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const homeLink = element.querySelector<HTMLAnchorElement>('a');

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Page not found');
    expect(homeLink?.getAttribute('href')).toBe('/en');
    expect(homeLink?.textContent).toContain('Back to home');
    expect(element.querySelector('button')).toBeNull();
  });

  it('renders the equivalent Spanish 404 and home URL', () => {
    TestBed.inject(PortfolioLocaleService).activateLocale('es');
    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Página no encontrada');
    expect(element.querySelector<HTMLAnchorElement>('a')?.getAttribute('href')).toBe('/es');
    expect(element.querySelector('a')?.textContent).toContain('Volver al inicio');
  });
});
