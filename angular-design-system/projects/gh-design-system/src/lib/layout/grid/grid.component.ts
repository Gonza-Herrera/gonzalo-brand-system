import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhLayoutGap } from '../layout.types';
import type { GhGridAlign, GhGridColumns, GhGridMinItemSize } from './grid.types';

@Component({
  selector: 'gh-grid',
  standalone: true,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-grid',
    '[class.gh-grid--columns-auto]': 'columns() === "auto"',
    '[class.gh-grid--columns-1]': 'columns() === 1',
    '[class.gh-grid--columns-2]': 'columns() === 2',
    '[class.gh-grid--columns-3]': 'columns() === 3',
    '[class.gh-grid--columns-4]': 'columns() === 4',
    '[class.gh-grid--min-sm]': 'minItemSize() === "sm"',
    '[class.gh-grid--min-md]': 'minItemSize() === "md"',
    '[class.gh-grid--min-lg]': 'minItemSize() === "lg"',
    '[class.gh-grid--gap-none]': 'gap() === "none"',
    '[class.gh-grid--gap-xs]': 'gap() === "xs"',
    '[class.gh-grid--gap-sm]': 'gap() === "sm"',
    '[class.gh-grid--gap-md]': 'gap() === "md"',
    '[class.gh-grid--gap-lg]': 'gap() === "lg"',
    '[class.gh-grid--gap-xl]': 'gap() === "xl"',
    '[class.gh-grid--gap-2xl]': 'gap() === "2xl"',
    '[class.gh-grid--align-stretch]': 'align() === "stretch"',
    '[class.gh-grid--align-start]': 'align() === "start"',
    '[class.gh-grid--align-center]': 'align() === "center"',
    '[class.gh-grid--align-end]': 'align() === "end"',
  },
})
export class GhGridComponent {
  readonly columns = input<GhGridColumns>('auto');
  readonly minItemSize = input<GhGridMinItemSize>('md');
  readonly gap = input<GhLayoutGap>('lg');
  readonly align = input<GhGridAlign>('stretch');
}
