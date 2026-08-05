import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import type { GhIconButtonSize, GhIconButtonType, GhIconButtonVariant } from './icon-button.types';

@Component({
  selector: 'gh-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhIconButtonComponent {
  readonly variant = input<GhIconButtonVariant>('secondary');
  readonly size = input<GhIconButtonSize>('md');
  readonly type = input<GhIconButtonType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  readonly ariaExpanded = input<boolean | undefined>(undefined, { alias: 'aria-expanded' });
  readonly ariaControls = input<string | undefined>(undefined, { alias: 'aria-controls' });

  private readonly button = viewChild.required<ElementRef<HTMLButtonElement>>('button');

  protected readonly interactionDisabled = computed(() => this.disabled() || this.loading());
  protected readonly buttonClasses = computed(
    () =>
      `gh-icon-button gh-icon-button--${this.variant()} gh-icon-button--${this.size()}${
        this.loading() ? ' gh-icon-button--loading' : ''
      }`,
  );

  focus(options?: FocusOptions): void {
    this.button().nativeElement.focus(options);
  }
}
