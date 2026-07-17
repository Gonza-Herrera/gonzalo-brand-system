import type { GhHeroAction } from 'gh-design-system';

import type { PortfolioLinkContent } from '../../content/models/home-content.model';
import type { PortfolioLocale } from '../../content/models/portfolio-locale.type';
import { createLocalizedPath } from '../../core/routing/portfolio-route.utils';

export interface ResolvedPortfolioAction extends GhHeroAction {
  readonly href: string;
}

export function resolvePortfolioHref(locale: PortfolioLocale, link: PortfolioLinkContent): string {
  return link.external ? link.href : createLocalizedPath(locale, link.pageId);
}

export function resolvePortfolioAction(
  locale: PortfolioLocale,
  link: PortfolioLinkContent,
): ResolvedPortfolioAction {
  return {
    label: link.label,
    href: resolvePortfolioHref(locale, link),
    external: link.external ?? false,
    variant: link.variant,
    ariaLabel: link.ariaLabel,
  };
}
