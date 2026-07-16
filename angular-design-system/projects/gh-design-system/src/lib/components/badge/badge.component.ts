import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { GhBadgeAppearance, GhBadgeRounded, GhBadgeSize, GhBadgeVariant } from './badge.types';

@Component({
  selector: 'gh-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhBadgeComponent {
  readonly variant = input<GhBadgeVariant>('neutral');
  readonly size = input<GhBadgeSize>('md');
  readonly appearance = input<GhBadgeAppearance>('soft');
  readonly rounded = input<GhBadgeRounded>('pill');

  protected readonly badgeClasses = computed(() =>
    [
      'gh-badge',
      `gh-badge--${this.variant()}`,
      `gh-badge--${this.size()}`,
      `gh-badge--${this.appearance()}`,
      `gh-badge--rounded-${this.rounded()}`,
    ].join(' '),
  );
}
