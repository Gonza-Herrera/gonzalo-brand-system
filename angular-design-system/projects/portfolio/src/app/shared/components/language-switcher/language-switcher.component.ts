import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';

interface LanguageOption {
  readonly locale: PortfolioLocale;
  readonly shortLabel: string;
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly router = inject(Router);
  private readonly localeService = inject(PortfolioLocaleService);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly locale = this.localeService.locale;
  protected readonly label = computed(() => this.localeService.content().shell.language.label);
  protected readonly options = computed<readonly LanguageOption[]>(() => {
    const language = this.localeService.content().shell.language;
    const currentUrl = this.currentUrl();

    return [
      {
        locale: 'en',
        shortLabel: 'EN',
        label: language.englishLabel,
        href: this.localeService.buildLocalizedUrl('en', currentUrl),
      },
      {
        locale: 'es',
        shortLabel: 'ES',
        label: language.spanishLabel,
        href: this.localeService.buildLocalizedUrl('es', currentUrl),
      },
    ];
  });

  protected rememberLocale(locale: PortfolioLocale): void {
    this.localeService.rememberLocale(locale);
  }
}
