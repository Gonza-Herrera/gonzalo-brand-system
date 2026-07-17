import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  type GhFooterGroup,
  GhFooterComponent,
  type GhNavigationItem,
  GhNavigationComponent,
} from 'gh-design-system';
import { filter, map } from 'rxjs';

import { createLocalizedPath, getPageIdFromUrl } from '../../core/routing/portfolio-route.utils';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-portfolio-shell',
  standalone: true,
  imports: [
    GhFooterComponent,
    GhNavigationComponent,
    LanguageSwitcherComponent,
    RouterOutlet,
    ThemeSwitcherComponent,
  ],
  templateUrl: './portfolio-shell.component.html',
  styleUrl: './portfolio-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioShellComponent {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly router = inject(Router);
  private readonly localeService = inject(PortfolioLocaleService);
  private initialNavigationRendered = false;
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly content = this.localeService.content;
  protected readonly locale = this.localeService.locale;
  protected readonly homeUrl = computed(() => createLocalizedPath(this.locale(), 'home'));
  protected readonly activePageId = computed(() => getPageIdFromUrl(this.currentUrl()));
  protected readonly navigationItems = computed<readonly GhNavigationItem[]>(() => {
    const locale = this.locale();
    const activePageId = this.activePageId();

    return this.content().shell.navigation.items.map((item) => ({
      label: item.label,
      href: createLocalizedPath(locale, item.id),
      active: item.id === activePageId,
      ariaLabel: item.ariaLabel,
    }));
  });
  protected readonly footerGroups = computed<readonly GhFooterGroup[]>(() => [
    {
      title: this.content().shell.footer.navigationLabel,
      links: this.content().shell.navigation.items.map((item) => ({
        label: item.label,
        href: createLocalizedPath(this.locale(), item.id),
        ariaLabel: item.ariaLabel,
      })),
    },
  ]);

  constructor() {
    effect(() => {
      const url = this.currentUrl();

      if (!this.isBrowser) {
        return;
      }

      if (!this.initialNavigationRendered) {
        this.initialNavigationRendered = true;
        return;
      }

      if (url.includes('#')) {
        return;
      }

      const focusMain = (): void => {
        this.document.getElementById('main-content')?.focus({ preventScroll: true });
      };
      const view = this.document.defaultView;

      if (view?.requestAnimationFrame) {
        view.requestAnimationFrame(focusMain);
      } else {
        queueMicrotask(focusMain);
      }
    });
  }
}
