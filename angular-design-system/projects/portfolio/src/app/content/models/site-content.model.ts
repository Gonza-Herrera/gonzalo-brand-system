import type { PortfolioPageContent, PortfolioPageId } from './page-content.model';

export interface PortfolioIdentityContent {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly description: string;
}

export interface PortfolioSiteContent {
  readonly identity: PortfolioIdentityContent;
  readonly pages: Readonly<Record<PortfolioPageId, PortfolioPageContent>>;
}
