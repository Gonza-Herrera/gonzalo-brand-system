import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { ShowcaseHeader } from '../showcase-header/showcase-header';
import { ShowcaseSidebar } from '../showcase-sidebar/showcase-sidebar';

@Component({
  selector: 'showcase-shell',
  standalone: true,
  imports: [RouterOutlet, ShowcaseHeader, ShowcaseSidebar],
  templateUrl: './showcase-shell.html',
  styleUrl: './showcase-shell.scss',
})
export class ShowcaseShell {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly header = viewChild.required(ShowcaseHeader);

  protected readonly menuOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.closeMenu();
        this.focusPageHeading();
      });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(restoreFocus = false): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);

    if (restoreFocus && wasOpen) {
      this.header().focusMenuToggle();
    }
  }

  @HostListener('document:keydown.escape')
  protected closeMenuOnEscape(): void {
    this.closeMenu(true);
  }

  private focusPageHeading(): void {
    if (!this.isBrowser) {
      return;
    }

    const focusHeading = (): void => {
      const heading = this.document.querySelector<HTMLElement>('#showcase-content h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus();
    };
    const view = this.document.defaultView;

    if (view?.requestAnimationFrame) {
      view.requestAnimationFrame(focusHeading);
    } else {
      queueMicrotask(focusHeading);
    }
  }
}
