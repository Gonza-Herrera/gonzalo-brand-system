import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GhContactCalloutComponent } from 'gh-design-system';

import type { PortfolioHomeContactContent } from '../../../content/models/home-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-home-contact-section',
  standalone: true,
  imports: [GhContactCalloutComponent],
  templateUrl: './home-contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContactSectionComponent {
  readonly content = input.required<PortfolioHomeContactContent>();
  readonly locale = input.required<PortfolioLocale>();
  readonly externalLinkLabel = input.required<string>();

  protected readonly actions = computed(() =>
    this.content().actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
}
