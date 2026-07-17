import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';

import { EN_SITE_CONTENT } from '../../content/en/site-content';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [GhContainerComponent, GhSectionComponent, GhStackComponent],
  templateUrl: './contact.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  protected readonly content = EN_SITE_CONTENT.pages.contact;
}
