import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { HomeContactSectionComponent } from './sections/home-contact-section.component';
import { HomeExperiencePreviewSectionComponent } from './sections/home-experience-preview-section.component';
import { HomeExpertiseSectionComponent } from './sections/home-expertise-section.component';
import { HomeFeaturedContentSectionComponent } from './sections/home-featured-content-section.component';
import { HomeHeroComponent } from './sections/home-hero.component';
import { HomeSelectedProjectsSectionComponent } from './sections/home-selected-projects-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeContactSectionComponent,
    HomeExperiencePreviewSectionComponent,
    HomeExpertiseSectionComponent,
    HomeFeaturedContentSectionComponent,
    HomeHeroComponent,
    HomeSelectedProjectsSectionComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() => this.localeService.content().pages.home);
  protected readonly locale = this.localeService.locale;
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
