import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GhContactCalloutComponent } from 'gh-design-system';

import type { PortfolioExperienceContactContent } from '../../../content/models/experience-content.model';
import type { PortfolioLocale } from '../../../content/models/portfolio-locale.type';
import { resolvePortfolioAction } from '../../../core/routing/portfolio-link.utils';

@Component({
  selector: 'app-experience-contact-section',
  standalone: true,
  imports: [GhContactCalloutComponent],
  templateUrl: './experience-contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceContactSectionComponent {
  readonly content = input.required<PortfolioExperienceContactContent>();
  readonly locale = input.required<PortfolioLocale>();
  readonly externalLinkLabel = input.required<string>();

  protected readonly actions = computed(() =>
    this.content().actions.map((action) => resolvePortfolioAction(this.locale(), action)),
  );
}
