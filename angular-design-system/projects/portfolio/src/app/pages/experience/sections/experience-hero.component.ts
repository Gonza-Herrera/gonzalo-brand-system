import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GhHeroComponent, GhHeroVisualDirective } from 'gh-design-system';

import type { PortfolioExperienceHeroContent } from '../../../content/models/experience-content.model';

@Component({
  selector: 'app-experience-hero',
  standalone: true,
  imports: [GhHeroComponent, GhHeroVisualDirective],
  templateUrl: './experience-hero.component.html',
  styleUrl: './experience-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceHeroComponent {
  readonly content = input.required<PortfolioExperienceHeroContent>();
}
