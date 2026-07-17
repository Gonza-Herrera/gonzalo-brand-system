import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() => this.localeService.content().pages.home);
  protected readonly identity = computed(() => this.localeService.content().identity);
}
