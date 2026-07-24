import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { type GhThemePreference, GhThemeService, isGhThemePreference } from 'gh-design-system';

import { PortfolioLocaleService } from '../../../core/services/portfolio-locale.service';

interface ThemeOption {
  readonly value: GhThemePreference;
  readonly label: string;
}

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(GhThemeService);
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly preference = this.themeService.preference;
  protected readonly label = computed(() => this.localeService.content().shell.theme.label);
  protected readonly options = computed<readonly ThemeOption[]>(() => {
    const theme = this.localeService.content().shell.theme;

    return [
      { value: 'light', label: theme.lightLabel },
      { value: 'dark', label: theme.darkLabel },
      { value: 'system', label: theme.systemLabel },
    ];
  });

  protected setTheme(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value;

    if (isGhThemePreference(value)) {
      this.themeService.setTheme(value);
    }
  }
}
