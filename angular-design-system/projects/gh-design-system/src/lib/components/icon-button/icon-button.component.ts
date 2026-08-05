import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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

  protected readonly interactionDisabled = computed(() => this.disabled() || this.loading());
  protected readonly buttonClasses = computed(
    () =>
      `gh-icon-button gh-icon-button--${this.variant()} gh-icon-button--${this.size()}${
        this.loading() ? ' gh-icon-button--loading' : ''
      }`,
  );
}
