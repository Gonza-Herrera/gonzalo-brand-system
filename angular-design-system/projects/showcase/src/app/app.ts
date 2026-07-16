import { Component, inject } from '@angular/core';
import { GhThemeService } from 'gh-design-system';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(GhThemeService);

  protected readonly activeTheme = this.themeService.theme;

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
