import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import type { GhDividerOrientation, GhDividerStyle, GhDividerTone } from './divider.types';

@Component({
  selector: 'gh-divider',
  standalone: true,
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-divider-host',
    '[class.gh-divider-host--vertical]': 'orientation() === "vertical"',
  },
})
export class GhDividerComponent {
  readonly orientation = input<GhDividerOrientation>('horizontal');
  readonly style = input<GhDividerStyle>('solid');
  readonly tone = input<GhDividerTone>('subtle');
  readonly decorative = input(true, { transform: booleanAttribute });

  protected readonly dividerClasses = computed(
    () =>
      `gh-divider gh-divider--${this.orientation()} gh-divider--${this.style()} gh-divider--${this.tone()}`,
  );
}
