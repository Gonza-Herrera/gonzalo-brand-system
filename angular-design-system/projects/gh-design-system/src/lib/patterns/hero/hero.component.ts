import { ChangeDetectionStrategy, Component, contentChild, Directive, input } from '@angular/core';

import { GhContainerComponent } from '../../layout/container/container.component';
import { GhInlineComponent } from '../../layout/inline/inline.component';
import { GhSectionComponent } from '../../layout/section/section.component';
import { GhStackComponent } from '../../layout/stack/stack.component';
import type {
  GhHeroAction,
  GhHeroAlignment,
  GhHeroHeadingLevel,
  GhHeroLayout,
  GhHeroMinHeight,
  GhHeroSurface,
} from './hero.types';

@Directive({ selector: '[ghHeroVisual]', standalone: true })
export class GhHeroVisualDirective {}

@Component({
  selector: 'gh-hero',
  standalone: true,
  imports: [GhContainerComponent, GhInlineComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-hero',
    '[class.gh-hero--align-start]': 'alignment() === "start"',
    '[class.gh-hero--align-center]': 'alignment() === "center"',
    '[class.gh-hero--layout-content-only]': 'layout() === "content-only"',
    '[class.gh-hero--layout-split]': 'layout() === "split"',
    '[class.gh-hero--layout-centered]': 'layout() === "centered"',
    '[class.gh-hero--surface-default]': 'surface() === "default"',
    '[class.gh-hero--surface-subtle]': 'surface() === "subtle"',
    '[class.gh-hero--surface-gradient]': 'surface() === "gradient"',
    '[class.gh-hero--surface-glass]': 'surface() === "glass"',
  },
})
export class GhHeroComponent {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly actions = input<readonly GhHeroAction[]>([]);
  readonly alignment = input<GhHeroAlignment>('start');
  readonly layout = input<GhHeroLayout>('split');
  readonly surface = input<GhHeroSurface>('gradient');
  readonly minHeight = input<GhHeroMinHeight>('auto');
  readonly headingLevel = input<GhHeroHeadingLevel>(1);
  readonly externalLinkLabel = input('opens in a new tab');

  protected readonly visual = contentChild(GhHeroVisualDirective);
}
