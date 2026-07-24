import type { PortfolioExternalLinks } from '../../core/config/portfolio.config';
import { EN_CONTACT_CONTENT } from '../en/contact.content';
import { resolvePortfolioContactChannels } from './contact-channel.mapper';

describe('Contact channel mapper', () => {
  it('returns only configured destinations with the expected protocol', () => {
    const links: PortfolioExternalLinks = {
      email: undefined,
      linkedin: undefined,
      github: 'https://github.com/angular/angular',
    };

    expect(resolvePortfolioContactChannels(EN_CONTACT_CONTENT.channels.items, links)).toEqual([
      {
        ...EN_CONTACT_CONTENT.channels.items[2],
        href: 'https://github.com/angular/angular',
      },
    ]);
  });

  it('omits empty and protocol-incompatible values', () => {
    const links: PortfolioExternalLinks = {
      email: 'mailto:',
      linkedin: ' ',
      github: 'http://github.com/angular/angular',
    };

    expect(resolvePortfolioContactChannels(EN_CONTACT_CONTENT.channels.items, links)).toEqual([]);
  });

  it('does not mutate localized channel content', () => {
    const snapshot = JSON.stringify(EN_CONTACT_CONTENT.channels.items);
    resolvePortfolioContactChannels(EN_CONTACT_CONTENT.channels.items, {
      email: undefined,
      linkedin: undefined,
      github: 'https://github.com/angular/angular',
    });
    expect(JSON.stringify(EN_CONTACT_CONTENT.channels.items)).toBe(snapshot);
  });
});
