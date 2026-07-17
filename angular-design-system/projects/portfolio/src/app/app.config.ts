import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { GhThemeService } from 'gh-design-system';

import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/routing/portfolio-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
    provideAppInitializer(() => {
      inject(GhThemeService);
    }),
  ],
};
