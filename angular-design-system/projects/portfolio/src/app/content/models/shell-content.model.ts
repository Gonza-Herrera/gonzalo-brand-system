import type { PortfolioFooterContent } from './footer-content.model';
import type { PortfolioNavigationContent } from './navigation-content.model';

export interface PortfolioShellContent {
  readonly accessibility: {
    readonly skipToContent: string;
  };
  readonly brand: {
    readonly name: string;
    readonly role: string;
    readonly homeAriaLabel: string;
  };
  readonly navigation: PortfolioNavigationContent;
  readonly language: {
    readonly label: string;
    readonly englishLabel: string;
    readonly spanishLabel: string;
  };
  readonly theme: {
    readonly label: string;
    readonly lightLabel: string;
    readonly darkLabel: string;
    readonly systemLabel: string;
  };
  readonly footer: PortfolioFooterContent;
}
