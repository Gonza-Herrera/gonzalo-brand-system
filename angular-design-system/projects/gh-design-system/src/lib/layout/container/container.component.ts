import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhContainerGutters, GhContainerSize } from './container.types';

@Component({
  selector: 'gh-container',
  standalone: true,
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-container',
    '[class.gh-container--sm]': 'size() === "sm"',
    '[class.gh-container--md]': 'size() === "md"',
    '[class.gh-container--lg]': 'size() === "lg"',
    '[class.gh-container--xl]': 'size() === "xl"',
    '[class.gh-container--wide]': 'size() === "wide"',
    '[class.gh-container--full]': 'size() === "full"',
    '[class.gh-container--gutters-none]': 'gutters() === "none"',
    '[class.gh-container--gutters-sm]': 'gutters() === "sm"',
    '[class.gh-container--gutters-md]': 'gutters() === "md"',
    '[class.gh-container--gutters-lg]': 'gutters() === "lg"',
    '[class.gh-container--centered]': 'centered()',
  },
})
export class GhContainerComponent {
  readonly size = input<GhContainerSize>('xl');
  readonly gutters = input<GhContainerGutters>('md');
  readonly centered = input(true, { transform: booleanAttribute });
}
