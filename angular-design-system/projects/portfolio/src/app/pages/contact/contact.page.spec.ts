import { TestBed } from '@angular/core/testing';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ContactPage } from './contact.page';

describe('ContactPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactPage] }).compileComponents();
  });

  it('renders the complete English Contact page with one h1', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Let’s talk about building better software.',
    );
    expect(element.querySelector('gh-hero')).not.toBeNull();
    expect(element.querySelector('#contact-topics')?.textContent).toContain('What we can discuss');
    expect(element.querySelector('#contact-channels')?.textContent).toContain(
      'No public contact channel is configured yet',
    );
    expect(element.querySelector('#contact-form form')).not.toBeNull();
    expect(element.querySelector('#contact-privacy')?.textContent).toContain(
      'Before you send a message',
    );
    expect(element.querySelector('#contact-explore')?.textContent).toContain(
      'Explore more before we connect',
    );
  });

  it('omits unconfigured channels and creates localized internal destinations', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('#contact-channels a')).toHaveLength(0);
    expect(
      [...element.querySelectorAll<HTMLAnchorElement>('#contact-explore a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['/en/experience', '/en/projects', '/en/content']);
    expect(element.querySelector('a[href*="example.com"]')).toBeNull();
    expect(element.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it('renders Spanish content and Spanish Explore routes from the locale service', () => {
    const localeService = TestBed.inject(PortfolioLocaleService);
    localeService.activateLocale('es');
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain(
      'Conversemos sobre cómo construir mejor software.',
    );
    expect(element.querySelector('#contact-topics')?.textContent).toContain(
      'Sobre qué podemos conversar',
    );
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'Todavía no hay un canal de contacto público configurado',
    );
    expect(
      [...element.querySelectorAll<HTMLAnchorElement>('#contact-explore a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['/es/experience', '/es/projects', '/es/content']);
  });
});
