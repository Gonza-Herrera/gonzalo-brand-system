import { Component, input, output, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GhIconButtonComponent } from 'gh-design-system';

import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'showcase-header',
  standalone: true,
  imports: [GhIconButtonComponent, RouterLink, ThemeToggle],
  templateUrl: './showcase-header.html',
  styleUrl: './showcase-header.scss',
})
export class ShowcaseHeader {
  readonly menuOpen = input(false);
  readonly menuToggled = output<void>();

  private readonly menuToggle = viewChild<GhIconButtonComponent>('menuToggle');

  focusMenuToggle(): void {
    this.menuToggle()?.focus();
  }
}
