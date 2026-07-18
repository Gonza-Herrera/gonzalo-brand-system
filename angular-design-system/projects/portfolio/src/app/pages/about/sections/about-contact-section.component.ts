import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GhContactCalloutComponent } from 'gh-design-system';

import type { PortfolioAboutContactContent } from '../../../content/models/about-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-about-contact-section',
  standalone: true,
  imports: [GhContactCalloutComponent],
  templateUrl: './about-contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutContactSectionComponent {
  readonly content = input.required<PortfolioAboutContactContent>();
  readonly locale = input.required<PortfolioLocale>();
  readonly externalLinkLabel = input.required<string>();

  protected readonly actions = computed(() =>
    this.content().actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
}
