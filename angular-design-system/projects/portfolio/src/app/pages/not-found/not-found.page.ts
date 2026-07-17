import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { createLocalizedPath } from '../../core/routing/portfolio-route.utils';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() => this.localeService.content().pages['not-found']);
  protected readonly homeUrl = computed(() =>
    createLocalizedPath(this.localeService.locale(), 'home'),
  );
}
