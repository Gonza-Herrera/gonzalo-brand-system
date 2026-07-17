import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhInlineAlign, GhInlineJustify } from '../inline/inline.types';
import type { GhLayoutGap } from '../layout.types';

@Component({
  selector: 'gh-cluster',
  standalone: true,
  templateUrl: './cluster.component.html',
  styleUrl: './cluster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-cluster',
    '[class.gh-cluster--gap-none]': 'gap() === "none"',
    '[class.gh-cluster--gap-xs]': 'gap() === "xs"',
    '[class.gh-cluster--gap-sm]': 'gap() === "sm"',
    '[class.gh-cluster--gap-md]': 'gap() === "md"',
    '[class.gh-cluster--gap-lg]': 'gap() === "lg"',
    '[class.gh-cluster--gap-xl]': 'gap() === "xl"',
    '[class.gh-cluster--gap-2xl]': 'gap() === "2xl"',
    '[class.gh-cluster--align-start]': 'align() === "start"',
    '[class.gh-cluster--align-center]': 'align() === "center"',
    '[class.gh-cluster--align-end]': 'align() === "end"',
    '[class.gh-cluster--align-baseline]': 'align() === "baseline"',
    '[class.gh-cluster--align-stretch]': 'align() === "stretch"',
    '[class.gh-cluster--justify-start]': 'justify() === "start"',
    '[class.gh-cluster--justify-center]': 'justify() === "center"',
    '[class.gh-cluster--justify-end]': 'justify() === "end"',
    '[class.gh-cluster--justify-between]': 'justify() === "between"',
    '[class.gh-cluster--justify-around]': 'justify() === "around"',
  },
})
export class GhClusterComponent {
  readonly gap = input<GhLayoutGap>('sm');
  readonly align = input<GhInlineAlign>('center');
  readonly justify = input<GhInlineJustify>('start');
}
