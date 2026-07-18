import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { AboutAiSectionComponent } from './sections/about-ai-section.component';
import { AboutContactSectionComponent } from './sections/about-contact-section.component';
import { AboutFeatureSectionComponent } from './sections/about-feature-section.component';
import { AboutHeroComponent } from './sections/about-hero.component';
import { AboutLeadershipSectionComponent } from './sections/about-leadership-section.component';
import { AboutStorySectionComponent } from './sections/about-story-section.component';
import { AboutTechnicalFocusSectionComponent } from './sections/about-technical-focus-section.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    AboutAiSectionComponent,
    AboutContactSectionComponent,
    AboutFeatureSectionComponent,
    AboutHeroComponent,
    AboutLeadershipSectionComponent,
    AboutStorySectionComponent,
    AboutTechnicalFocusSectionComponent,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  private readonly localeService = inject(PortfolioLocaleService);
  protected readonly content = computed(() => this.localeService.content().pages.about);
  protected readonly locale = this.localeService.locale;
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
}
