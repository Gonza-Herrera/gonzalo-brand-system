import { DOCUMENT } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { GhThemeService } from 'gh-design-system';

import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/routing/portfolio-title.strategy';
import {
  PORTFOLIO_LOCALE_TRANSITION_CLASS,
  PORTFOLIO_REDUCED_MOTION_QUERY,
  shouldAnimateLocaleTransition,
} from './core/routing/portfolio-view-transition.utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          const document = inject(DOCUMENT);
          const prefersReducedMotion =
            document.defaultView?.matchMedia?.(PORTFOLIO_REDUCED_MOTION_QUERY).matches ?? false;

          if (!shouldAnimateLocaleTransition(from, to, prefersReducedMotion)) {
            return;
          }

          const root = document.documentElement;
          const clearTransitionClass = (): void => {
            root.classList.remove(PORTFOLIO_LOCALE_TRANSITION_CLASS);
          };

          root.classList.add(PORTFOLIO_LOCALE_TRANSITION_CLASS);
          void transition.finished.then(clearTransitionClass, clearTransitionClass);
        },
      }),
    ),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
    provideAppInitializer(() => {
      inject(GhThemeService);
    }),
  ],
};
