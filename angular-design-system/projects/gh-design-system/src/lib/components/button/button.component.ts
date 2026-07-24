import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import type { GhButtonSize, GhButtonType, GhButtonVariant } from './button.types';

@Component({
  selector: 'gh-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gh-button-host--full-width]': 'fullWidth()',
  },
})
export class GhButtonComponent {
  readonly variant = input<GhButtonVariant>('primary');
  readonly size = input<GhButtonSize>('md');
  readonly type = input<GhButtonType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly interactionDisabled = computed(() => this.disabled() || this.loading());
  protected readonly buttonClasses = computed(() => {
    const classes = ['gh-button', `gh-button--${this.variant()}`, `gh-button--${this.size()}`];

    if (this.loading()) {
      classes.push('gh-button--loading');
    }

    if (this.fullWidth()) {
      classes.push('gh-button--full-width');
    }

    return classes.join(' ');
  });
}
