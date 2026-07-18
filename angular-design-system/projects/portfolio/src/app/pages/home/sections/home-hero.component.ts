import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GhHeroComponent, GhHeroVisualDirective } from 'gh-design-system';

import type { PortfolioHomeHeroContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [GhHeroComponent, GhHeroVisualDirective],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {
  readonly content = input.required<PortfolioHomeHeroContent>();
  readonly locale = input.required<PortfolioLocale>();
  readonly externalLinkLabel = input.required<string>();

  protected readonly actions = computed(() => [
    resolvePortfolioAction(this.locale(), this.content().primaryAction),
    resolvePortfolioAction(this.locale(), this.content().secondaryAction),
  ]);
}
