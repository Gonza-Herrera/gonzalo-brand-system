import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { EN_SITE_CONTENT } from '../../content/en/site-content';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected readonly content = EN_SITE_CONTENT.pages.about;
}
