import type { GhHeroAction } from 'gh-design-system';

import type { PortfolioNavigationPageId } from './page-content.model';

export type PortfolioActionVariant = NonNullable<GhHeroAction['variant']>;

interface PortfolioLinkBase {
  readonly label: string;
  readonly variant?: PortfolioActionVariant;
  readonly ariaLabel?: string;
}

export type PortfolioLinkContent = PortfolioLinkBase &
  (
    | {
        readonly pageId: PortfolioNavigationPageId;
        readonly href?: never;
        readonly external?: false;
      }
    | {
        readonly href: string;
        readonly external: true;
        readonly pageId?: never;
      }
  );
