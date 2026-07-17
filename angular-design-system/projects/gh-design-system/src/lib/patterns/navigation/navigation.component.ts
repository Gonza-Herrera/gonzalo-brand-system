import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { GhContainerComponent } from '../../layout/container/container.component';
import type { GhNavigationItem } from './navigation.types';

@Component({
  selector: 'gh-navigation',
  standalone: true,
  imports: [GhContainerComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-navigation-host',
  },
})
export class GhNavigationComponent {
  readonly brand = input.required<string>();
  readonly brandHref = input('/');
  readonly items = input<readonly GhNavigationItem[]>([]);
  readonly sticky = input(true);
  readonly transparent = input(false);
  readonly showThemeControl = input(false);
  readonly menuLabel = input('Open navigation menu');
  readonly closeMenuLabel = input('Close navigation menu');
  readonly navigationLabel = input('Main navigation');
  readonly menuId = input('gh-navigation-menu');
  readonly externalLinkLabel = input('opens in a new tab');

  protected readonly menuOpen = signal(false);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);

    if (restoreFocus) {
      this.menuToggle()?.nativeElement.focus();
    }
  }

  protected handleEscape(event: Event): void {
    if (!this.menuOpen()) {
      return;
    }

    event.preventDefault();
    this.closeMenu(true);
  }
}
