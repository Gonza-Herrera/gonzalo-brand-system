import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GhHeroComponent, GhHeroVisualDirective } from 'gh-design-system';

import type { PortfolioAboutHeroContent } from '../../../content/models/about-content.model';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [GhHeroComponent, GhHeroVisualDirective],
  templateUrl: './about-hero.component.html',
  styleUrl: './about-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutHeroComponent {
  readonly content = input.required<PortfolioAboutHeroContent>();
}
