import type {
  PortfolioContactChannelContent,
  PortfolioContactChannelId,
} from '../models/contact-content.model';
import type { PortfolioExternalLinks } from '../../core/config/portfolio.config';

export interface ResolvedPortfolioContactChannel extends PortfolioContactChannelContent {
  readonly href: string;
}

function hasExpectedProtocol(channelId: PortfolioContactChannelId, href: string): boolean {
  return channelId === 'email'
    ? href.startsWith('mailto:') && href.slice('mailto:'.length).split('?')[0].trim().length > 0
    : href.startsWith('https://');
}

export function resolvePortfolioContactChannels(
  channels: readonly PortfolioContactChannelContent[],
  links: PortfolioExternalLinks,
): readonly ResolvedPortfolioContactChannel[] {
  return channels.flatMap((channel) => {
    const href = links[channel.id]?.trim();

    return href && hasExpectedProtocol(channel.id, href) ? [{ ...channel, href }] : [];
  });
}
