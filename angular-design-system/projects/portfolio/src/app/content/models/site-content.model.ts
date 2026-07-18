import type { PortfolioAboutContent } from './about-content.model';
import type { PortfolioHomeContent } from './home-content.model';
import type { PortfolioPageContent } from './page-content.model';
import type { PortfolioShellContent } from './shell-content.model';

export interface PortfolioIdentityContent {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly description: string;
}

export interface PortfolioPagesContent {
  readonly home: PortfolioHomeContent;
  readonly about: PortfolioAboutContent;
  readonly experience: PortfolioPageContent;
  readonly projects: PortfolioPageContent;
  readonly content: PortfolioPageContent;
  readonly contact: PortfolioPageContent;
  readonly 'not-found': PortfolioPageContent;
}

export interface PortfolioSiteContent {
  readonly identity: PortfolioIdentityContent;
  readonly shell: PortfolioShellContent;
  readonly pages: PortfolioPagesContent;
}
