import { InjectionToken } from '@angular/core';

import {
  PORTFOLIO_LOCALES,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';

export const WEB3FORMS_CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';

export interface PortfolioContactFormConfig {
  readonly provider: 'web3forms';
  readonly endpoint: string;
  readonly accessKey: string;
  readonly fromName: string;
}

export interface PortfolioExternalLinks {
  readonly email: string | undefined;
  readonly linkedin: string | undefined;
  readonly github: string | undefined;
}

export interface PortfolioConfig {
  readonly identity: {
    readonly name: string;
  };
  readonly contactForm: PortfolioContactFormConfig;
  readonly urls: PortfolioExternalLinks;
  readonly defaultLocale: PortfolioLocale;
  readonly supportedLocales: readonly PortfolioLocale[];
  readonly localeStorageKey: string;
}

export const PORTFOLIO_CONFIG = {
  identity: {
    name: 'Gonzalo Herrera',
  },
  contactForm: {
    provider: 'web3forms',
    endpoint: WEB3FORMS_CONTACT_ENDPOINT,
    accessKey: '2cdcf0da-e705-45af-9ac2-5fe142578784',
    fromName: 'Gonzalo Herrera Portfolio',
  },
  urls: {
    email: undefined,
    linkedin: 'https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/',
    github: undefined,
  },
  defaultLocale: 'en',
  supportedLocales: PORTFOLIO_LOCALES,
  localeStorageKey: 'gh-portfolio-locale',
} as const satisfies PortfolioConfig;

export const CONTACT_FORM_CONFIG = new InjectionToken<PortfolioContactFormConfig>(
  'CONTACT_FORM_CONFIG',
  {
    providedIn: 'root',
    factory: () => PORTFOLIO_CONFIG.contactForm,
  },
);

export const PORTFOLIO_EXTERNAL_LINKS = new InjectionToken<PortfolioExternalLinks>(
  'PORTFOLIO_EXTERNAL_LINKS',
  {
    providedIn: 'root',
    factory: () => PORTFOLIO_CONFIG.urls,
  },
);
