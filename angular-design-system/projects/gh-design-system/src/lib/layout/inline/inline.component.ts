import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhLayoutGap } from '../layout.types';
import type { GhInlineAlign, GhInlineJustify } from './inline.types';

@Component({
  selector: 'gh-inline',
  standalone: true,
  templateUrl: './inline.component.html',
  styleUrl: './inline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-inline',
    '[class.gh-inline--gap-none]': 'gap() === "none"',
    '[class.gh-inline--gap-xs]': 'gap() === "xs"',
    '[class.gh-inline--gap-sm]': 'gap() === "sm"',
    '[class.gh-inline--gap-md]': 'gap() === "md"',
    '[class.gh-inline--gap-lg]': 'gap() === "lg"',
    '[class.gh-inline--gap-xl]': 'gap() === "xl"',
    '[class.gh-inline--gap-2xl]': 'gap() === "2xl"',
    '[class.gh-inline--align-start]': 'align() === "start"',
    '[class.gh-inline--align-center]': 'align() === "center"',
    '[class.gh-inline--align-end]': 'align() === "end"',
    '[class.gh-inline--align-baseline]': 'align() === "baseline"',
    '[class.gh-inline--align-stretch]': 'align() === "stretch"',
    '[class.gh-inline--justify-start]': 'justify() === "start"',
    '[class.gh-inline--justify-center]': 'justify() === "center"',
    '[class.gh-inline--justify-end]': 'justify() === "end"',
    '[class.gh-inline--justify-between]': 'justify() === "between"',
    '[class.gh-inline--justify-around]': 'justify() === "around"',
    '[class.gh-inline--wrap]': 'wrap()',
    '[class.gh-inline--full-width]': 'fullWidth()',
  },
})
export class GhInlineComponent {
  readonly gap = input<GhLayoutGap>('sm');
  readonly align = input<GhInlineAlign>('center');
  readonly justify = input<GhInlineJustify>('start');
  readonly wrap = input(true, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
}
