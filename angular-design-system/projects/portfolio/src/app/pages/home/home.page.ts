import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { EN_SITE_CONTENT } from '../../content/en/site-content';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly content = EN_SITE_CONTENT.pages.home;
  protected readonly identity = EN_SITE_CONTENT.identity;
}
