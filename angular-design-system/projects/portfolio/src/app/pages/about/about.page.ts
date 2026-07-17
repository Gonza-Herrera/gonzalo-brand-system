import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  private readonly localeService = inject(PortfolioLocaleService);
  protected readonly content = computed(() => this.localeService.content().pages.about);
}
