import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { getPortfolioExperienceContent } from '../../content/experience-content.registry';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { ExperienceCapabilitiesSectionComponent } from './sections/experience-capabilities-section.component';
import { ExperienceCareerDirectionSectionComponent } from './sections/experience-career-direction-section.component';
import { ExperienceContactSectionComponent } from './sections/experience-contact-section.component';
import { ExperienceFeatureSectionComponent } from './sections/experience-feature-section.component';
import { ExperienceHeroComponent } from './sections/experience-hero.component';
import { ExperienceSummarySectionComponent } from './sections/experience-summary-section.component';
import { ExperienceTimelineSectionComponent } from './sections/experience-timeline-section.component';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [
    ExperienceCapabilitiesSectionComponent,
    ExperienceCareerDirectionSectionComponent,
    ExperienceContactSectionComponent,
    ExperienceFeatureSectionComponent,
    ExperienceHeroComponent,
    ExperienceSummarySectionComponent,
    ExperienceTimelineSectionComponent,
  ],
  templateUrl: './experience.page.html',
  styleUrl: './experience.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePage {
  private readonly localeService = inject(PortfolioLocaleService);

  protected readonly content = computed(() =>
    getPortfolioExperienceContent(this.localeService.locale()),
  );
  protected readonly locale = this.localeService.locale;
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
