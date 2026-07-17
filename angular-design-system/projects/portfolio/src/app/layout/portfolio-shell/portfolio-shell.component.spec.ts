import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { PortfolioShellComponent } from './portfolio-shell.component';

describe('PortfolioShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioShellComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('composes the accessible shell from public design-system components', () => {
    const fixture = TestBed.createComponent(PortfolioShellComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const skipLink = element.querySelector<HTMLAnchorElement>('.skip-link');
    const main = element.querySelector<HTMLElement>('main');

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(skipLink?.textContent).toContain('Skip to main content');
    expect(element.firstElementChild).toBe(skipLink);
    expect(element.querySelector('gh-navigation')).not.toBeNull();
    expect(main?.id).toBe('main-content');
    expect(main?.getAttribute('tabindex')).toBe('-1');
    expect(main?.querySelector('router-outlet')).not.toBeNull();
    expect(element.querySelector('gh-footer')).not.toBeNull();
    expect(element.querySelector('app-language-switcher')).not.toBeNull();
    expect(element.querySelector('app-theme-switcher')).not.toBeNull();
  });

  it('localizes navigation, controls and footer from the locale service', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');

    const fixture = TestBed.createComponent(PortfolioShellComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const navigationText = element.querySelector('gh-navigation')?.textContent;
    const footerText = element.querySelector('gh-footer')?.textContent;

    expect(element.querySelector('.skip-link')?.textContent).toContain(
      'Saltar al contenido principal',
    );
    expect(navigationText).toContain('Inicio');
    expect(navigationText).toContain('Experiencia');
    expect(navigationText).toContain('Proyectos');
    expect(element.querySelector('app-language-switcher nav')?.getAttribute('aria-label')).toBe(
      'Idioma',
    );
    expect(footerText).toContain('Ayudo a equipos');
    expect(footerText).toContain('Navegación del pie');
  });
});
