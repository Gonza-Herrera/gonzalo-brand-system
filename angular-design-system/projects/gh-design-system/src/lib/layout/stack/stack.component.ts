import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GhLayoutGap } from '../layout.types';
import type { GhStackAlign, GhStackJustify } from './stack.types';

@Component({
  selector: 'gh-stack',
  standalone: true,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-stack',
    '[class.gh-stack--gap-none]': 'gap() === "none"',
    '[class.gh-stack--gap-xs]': 'gap() === "xs"',
    '[class.gh-stack--gap-sm]': 'gap() === "sm"',
    '[class.gh-stack--gap-md]': 'gap() === "md"',
    '[class.gh-stack--gap-lg]': 'gap() === "lg"',
    '[class.gh-stack--gap-xl]': 'gap() === "xl"',
    '[class.gh-stack--gap-2xl]': 'gap() === "2xl"',
    '[class.gh-stack--align-stretch]': 'align() === "stretch"',
    '[class.gh-stack--align-start]': 'align() === "start"',
    '[class.gh-stack--align-center]': 'align() === "center"',
    '[class.gh-stack--align-end]': 'align() === "end"',
    '[class.gh-stack--justify-start]': 'justify() === "start"',
    '[class.gh-stack--justify-center]': 'justify() === "center"',
    '[class.gh-stack--justify-end]': 'justify() === "end"',
    '[class.gh-stack--justify-between]': 'justify() === "between"',
    '[class.gh-stack--wrap]': 'wrap()',
  },
})
export class GhStackComponent {
  readonly gap = input<GhLayoutGap>('md');
  readonly align = input<GhStackAlign>('stretch');
  readonly justify = input<GhStackJustify>('start');
  readonly wrap = input(false, { transform: booleanAttribute });
}
