import { TestBed } from '@angular/core/testing';

import {
  PORTFOLIO_EXTERNAL_LINKS,
  type PortfolioExternalLinks,
} from '../../core/config/portfolio.config';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ContactService } from './services/contact.service';
import { ContactPage } from './contact.page';

const LINKEDIN_URL = 'https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/';

describe('ContactPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
      providers: [
        {
          provide: ContactService,
          useValue: {
            isConfigured: () => false,
            sendMessage: vi.fn(),
          },
        },
      ],
    }).compileComponents();
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
    const channels = element.querySelector('#contact-channels');
    expect(channels?.textContent).toContain('Contact channels');
    expect(channels?.textContent).toContain(
      'Choose the way that works best for you to get in touch.',
    );
    expect(channels?.textContent).not.toContain(
      'Public contact destinations appear here only after they have been verified and approved for publication.',
    );
    expect(channels?.textContent).toContain('LinkedIn');
    expect(channels?.textContent).toContain(
      'Let’s connect and talk about Angular, frontend engineering, technical leadership and AI-augmented software development.',
    );
    expect(channels?.textContent).toContain('View LinkedIn profile');
    expect(channels?.querySelector('[role="status"]')).toBeNull();
    expect(element.querySelector('#contact-form form')).not.toBeNull();
    expect(
      element.querySelectorAll(
        '#contact-form input:not([type="checkbox"]), #contact-form textarea',
      ),
    ).toHaveLength(4);
    expect(element.querySelector('#contact-botcheck')?.getAttribute('tabindex')).toBe('-1');
    expect(element.querySelector('#contact-privacy')?.textContent).toContain(
      'Before you send a message',
    );
    expect(element.querySelector('#contact-explore')?.textContent).toContain(
      'Explore more before we connect',
    );
  });

  it('renders only verified channels and creates localized internal destinations', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const linkedIn = element.querySelector<HTMLAnchorElement>(
      `#contact-channels a[href="${LINKEDIN_URL}"]`,
    );

    expect(element.querySelectorAll('#contact-channels a')).toHaveLength(1);
    expect(linkedIn).not.toBeNull();
    expect(linkedIn?.target).toBe('_blank');
    expect(linkedIn?.rel).toBe('noopener noreferrer');
    expect(linkedIn?.getAttribute('aria-label')).toBe(
      'Open Gonzalo Herrera’s LinkedIn profile in a new tab',
    );
    expect(linkedIn?.tabIndex).toBe(0);
    expect(element.querySelector('#contact-channels .gh-feature-grid__icon')).toBeNull();
    expect(
      [...element.querySelectorAll<HTMLAnchorElement>('#contact-explore a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['/en/experience', '/en/projects', '/en/content']);
    expect(element.querySelector('a[href*="example.com"]')).toBeNull();
    expect(element.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it('preserves the localized empty state when no channel is configured', () => {
    const emptyLinks: PortfolioExternalLinks = {
      email: undefined,
      linkedin: undefined,
      github: undefined,
    };
    TestBed.overrideProvider(PORTFOLIO_EXTERNAL_LINKS, { useValue: emptyLinks });

    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const channels = (fixture.nativeElement as HTMLElement).querySelector('#contact-channels');
    expect(channels?.querySelectorAll('a')).toHaveLength(0);
    expect(channels?.querySelector('[role="status"]')?.textContent).toContain(
      'No public contact channel is configured yet',
    );
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
    const channels = element.querySelector('#contact-channels');
    expect(channels?.textContent).toContain('Canales de contacto');
    expect(channels?.textContent).toContain(
      'Elige la forma que prefieras para ponerte en contacto conmigo.',
    );
    expect(channels?.textContent).not.toContain(
      'Los destinos públicos aparecen aquí únicamente después de ser verificados y aprobados para su publicación.',
    );
    expect(channels?.textContent).toContain(
      'Conectemos y conversemos sobre Angular, frontend, liderazgo técnico e inteligencia artificial aplicada al desarrollo de software.',
    );
    const linkedIn = element.querySelector<HTMLAnchorElement>(
      `#contact-channels a[href="${LINKEDIN_URL}"]`,
    );
    expect(linkedIn?.textContent).toContain('Ver perfil en LinkedIn');
    expect(linkedIn?.getAttribute('aria-label')).toBe(
      'Abrir el perfil de LinkedIn de Gonzalo Herrera en una nueva pestaña',
    );
    expect(channels?.querySelector('[role="status"]')).toBeNull();
    expect(
      [...element.querySelectorAll<HTMLAnchorElement>('#contact-explore a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['/es/experience', '/es/projects', '/es/content']);
  });
});
