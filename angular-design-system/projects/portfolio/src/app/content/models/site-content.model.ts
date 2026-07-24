import type { PortfolioAboutContent } from './about-content.model';
import type { PortfolioContentHubContent } from './content-hub-content.model';
import type { PortfolioExperienceContent } from './experience-content.model';
import type { PortfolioHomeContent } from './home-content.model';
import type { PortfolioPageContent, PortfolioPageMetadata } from './page-content.model';
import type { PortfolioProjectsContent } from './projects-content.model';
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
  readonly experience: PortfolioExperienceContent;
  readonly projects: PortfolioProjectsContent;
  readonly content: PortfolioContentHubContent;
  readonly contact: PortfolioPageMetadata;
  readonly 'not-found': PortfolioPageContent;
}

export interface PortfolioSiteShellContent {
  readonly identity: PortfolioIdentityContent;
  readonly shell: PortfolioShellContent;
}

export interface PortfolioSiteContent extends PortfolioSiteShellContent {
  readonly pages: PortfolioPagesContent;
}
