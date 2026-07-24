import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'showcase-header',
  standalone: true,
  imports: [RouterLink, ThemeToggle],
  templateUrl: './showcase-header.html',
  styleUrl: './showcase-header.scss',
})
export class ShowcaseHeader {
  readonly menuOpen = input(false);
  readonly menuToggled = output<void>();
}
