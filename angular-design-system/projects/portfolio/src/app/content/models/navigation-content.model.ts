import type { PortfolioNavigationPageId, PortfolioPagePath } from './page-content.model';

export interface PortfolioNavigationItemContent {
  readonly id: PortfolioNavigationPageId;
  readonly label: string;
  readonly path: PortfolioPagePath;
  readonly ariaLabel?: string;
}

export interface PortfolioNavigationContent {
  readonly label: string;
  readonly openMenuLabel: string;
  readonly closeMenuLabel: string;
  readonly externalLinkLabel: string;
  readonly items: readonly PortfolioNavigationItemContent[];
}
