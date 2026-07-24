import { PORTFOLIO_CONFIG } from '../core/config/portfolio.config';
import { EN_CONTACT_CONTENT } from './en/contact.content';
import { ES_CONTACT_CONTENT } from './es/contact.content';
import {
  PORTFOLIO_CONTACT_CHANNEL_IDS,
  PORTFOLIO_CONTACT_HIGHLIGHT_IDS,
  PORTFOLIO_CONTACT_TOPIC_IDS,
} from './models/contact-content.model';
import { resolvePortfolioContactChannels } from './utils/contact-channel.mapper';

describe('Portfolio Contact content', () => {
  it('keeps stable IDs and structure aligned across locales', () => {
    expect(EN_CONTACT_CONTENT.hero.highlights.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_HIGHLIGHT_IDS,
    );
    expect(ES_CONTACT_CONTENT.hero.highlights.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_HIGHLIGHT_IDS,
    );
    expect(EN_CONTACT_CONTENT.topics.items.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_TOPIC_IDS,
    );
    expect(ES_CONTACT_CONTENT.topics.items.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_TOPIC_IDS,
    );
    expect(EN_CONTACT_CONTENT.channels.items.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_CHANNEL_IDS,
    );
    expect(ES_CONTACT_CONTENT.channels.items.map((item) => item.id)).toEqual(
      PORTFOLIO_CONTACT_CHANNEL_IDS,
    );
    expect(Object.keys(EN_CONTACT_CONTENT.channels)).toEqual(
      Object.keys(ES_CONTACT_CONTENT.channels),
    );
    expect(Object.keys(EN_CONTACT_CONTENT.form.fields)).toEqual(
      Object.keys(ES_CONTACT_CONTENT.form.fields),
    );
    expect(Object.keys(EN_CONTACT_CONTENT.form.fields)).toEqual([
      'name',
      'email',
      'subject',
      'message',
    ]);
    expect(EN_CONTACT_CONTENT.explore.actions.map((action) => action.pageId)).toEqual(
      ES_CONTACT_CONTENT.explore.actions.map((action) => action.pageId),
    );
  });

  it('contains complete localized labels and metadata', () => {
    for (const content of [EN_CONTACT_CONTENT, ES_CONTACT_CONTENT]) {
      expect(content.metaTitle.length).toBeGreaterThan(0);
      expect(content.metaDescription.length).toBeGreaterThan(0);
      expect(content.hero.title.length).toBeGreaterThan(0);
      expect(content.topics.items.every((item) => item.title && item.description)).toBe(true);
      expect(content.channels.items.every((item) => item.label && item.ariaLabel)).toBe(true);
      expect(
        Object.values(content.form.fields).every(
          (field) => field.label.length > 0 && field.maxLengthMessage.length > 0,
        ),
      ).toBe(true);
      expect(content.form.unavailable.title.length).toBeGreaterThan(0);
      expect(content.form.success.title.length).toBeGreaterThan(0);
      expect(content.form.error.title.length).toBeGreaterThan(0);
      expect(content.form.botcheckLabel.length).toBeGreaterThan(0);
      expect(content.form.fallbackEmailLabel.length).toBeGreaterThan(0);
      expect(
        Object.values(content.form.fields).every((field) => field.placeholder.length > 0),
      ).toBe(true);
    }
  });

  it('centralizes Web3Forms configuration without committing a real access key', () => {
    expect(PORTFOLIO_CONFIG.contactForm).toEqual({
      provider: 'web3forms',
      endpoint: 'https://api.web3forms.com/submit',
      accessKey: '',
      fromName: 'Gonzalo Herrera Portfolio',
    });
  });

  it('publishes only the verified LinkedIn destination from central configuration', () => {
    expect(PORTFOLIO_CONFIG.urls).toEqual({
      email: undefined,
      linkedin: 'https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/',
      github: undefined,
    });
    expect(
      resolvePortfolioContactChannels(EN_CONTACT_CONTENT.channels.items, PORTFOLIO_CONFIG.urls),
    ).toEqual([
      {
        ...EN_CONTACT_CONTENT.channels.items[1],
        href: 'https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/',
      },
    ]);

    for (const content of [EN_CONTACT_CONTENT, ES_CONTACT_CONTENT]) {
      const serialized = JSON.stringify(content);
      expect(serialized).not.toContain('EMAIL_REAL');
      expect(serialized).not.toContain('http://');
      expect(serialized).not.toContain('https://');
      expect(serialized).not.toContain('mailto:');
    }

    expect(EN_CONTACT_CONTENT.form.fields.email.placeholder).toBe('you@example.com');
    expect(ES_CONTACT_CONTENT.form.fields.email.placeholder).toBe('tu@ejemplo.com');
  });

  it('keeps the verified LinkedIn content exact, localized and URL-free', () => {
    const english = EN_CONTACT_CONTENT.channels.items[1];
    const spanish = ES_CONTACT_CONTENT.channels.items[1];
    const verifiedUrl = 'https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/';

    expect(english).toEqual({
      id: 'linkedin',
      label: 'LinkedIn',
      description:
        'Let’s connect and talk about Angular, frontend engineering, technical leadership and AI-augmented software development.',
      actionLabel: 'View LinkedIn profile',
      ariaLabel: 'Open Gonzalo Herrera’s LinkedIn profile in a new tab',
      external: true,
    });
    expect(spanish).toEqual({
      id: 'linkedin',
      label: 'LinkedIn',
      description:
        'Conectemos y conversemos sobre Angular, frontend, liderazgo técnico e inteligencia artificial aplicada al desarrollo de software.',
      actionLabel: 'Ver perfil en LinkedIn',
      ariaLabel: 'Abrir el perfil de LinkedIn de Gonzalo Herrera en una nueva pestaña',
      external: true,
    });
    expect(JSON.stringify(english)).not.toContain(verifiedUrl);
    expect(JSON.stringify(spanish)).not.toContain(verifiedUrl);
  });

  it('uses the approved evergreen Contact Channels heading copy', () => {
    expect(EN_CONTACT_CONTENT.channels).toMatchObject({
      eyebrow: 'Contact channels',
      title: 'Choose the way that works best for you to get in touch.',
      description: '',
    });
    expect(ES_CONTACT_CONTENT.channels).toMatchObject({
      eyebrow: 'Canales de contacto',
      title: 'Elige la forma que prefieras para ponerte en contacto conmigo.',
      description: '',
    });

    const localizedChannels = JSON.stringify([
      EN_CONTACT_CONTENT.channels,
      ES_CONTACT_CONTENT.channels,
    ]);
    expect(localizedChannels).not.toContain(
      'Public contact destinations appear here only after they have been verified and approved for publication.',
    );
    expect(localizedChannels).not.toContain(
      'Los destinos públicos aparecen aquí únicamente después de ser verificados y aprobados para su publicación.',
    );
  });
});
