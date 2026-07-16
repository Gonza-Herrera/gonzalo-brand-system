import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import type { GhCardPadding, GhCardRadius, GhCardVariant } from './card.types';

@Component({
  selector: 'gh-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.gh-card-host--full-height]': 'fullHeight()',
  },
})
export class GhCardComponent {
  readonly variant = input<GhCardVariant>('outlined');
  readonly padding = input<GhCardPadding>('md');
  readonly radius = input<GhCardRadius>('lg');
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly selected = input(false, { transform: booleanAttribute });
  readonly fullHeight = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly cardClasses = computed(() => {
    const classes = [
      'gh-card',
      `gh-card--${this.variant()}`,
      `gh-card--padding-${this.padding()}`,
      `gh-card--radius-${this.radius()}`,
    ];

    if (this.interactive()) {
      classes.push('gh-card--interactive');
    }

    if (this.selected()) {
      classes.push('gh-card--selected');
    }

    if (this.fullHeight()) {
      classes.push('gh-card--full-height');
    }

    return classes.join(' ');
  });
}
