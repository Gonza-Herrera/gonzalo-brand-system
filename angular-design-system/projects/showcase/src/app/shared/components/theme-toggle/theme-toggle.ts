import { Component, inject } from '@angular/core';
import { type GhThemePreference, GhThemeService } from 'gh-design-system';

interface ThemeOption {
  readonly label: string;
  readonly value: GhThemePreference;
}

@Component({
  selector: 'showcase-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService = inject(GhThemeService);

  protected readonly preference = this.themeService.preference;
  protected readonly resolvedTheme = this.themeService.resolvedTheme;
  protected readonly options = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ] as const satisfies readonly ThemeOption[];

  protected setTheme(preference: GhThemePreference): void {
    this.themeService.setTheme(preference);
  }
}
