import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SHOWCASE_NAVIGATION } from '../../core/config/showcase-navigation';

@Component({
  selector: 'showcase-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './showcase-sidebar.html',
  styleUrl: './showcase-sidebar.scss',
})
export class ShowcaseSidebar {
  readonly open = input(false);
  readonly navigationSelected = output<void>();

  protected readonly navigation = SHOWCASE_NAVIGATION;
}
