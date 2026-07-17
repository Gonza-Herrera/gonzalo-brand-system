import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PortfolioShellComponent } from './portfolio-shell.component';

describe('PortfolioShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioShellComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the accessible full-height application structure', () => {
    const fixture = TestBed.createComponent(PortfolioShellComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const skipLink = element.querySelector<HTMLAnchorElement>('.skip-link');
    const main = element.querySelector<HTMLElement>('main');

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(element.firstElementChild).toBe(skipLink);
    expect(element.querySelector('header')).not.toBeNull();
    expect(main?.id).toBe('main-content');
    expect(main?.getAttribute('tabindex')).toBe('-1');
    expect(main?.querySelector('router-outlet')).not.toBeNull();
    expect(element.querySelector('footer')).not.toBeNull();
    expect(element.querySelectorAll('gh-container')).toHaveLength(2);
  });
});
