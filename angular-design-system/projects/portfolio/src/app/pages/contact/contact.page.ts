import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GhCardComponent,
  GhContainerComponent,
  GhFeatureGridComponent,
  GhHeroComponent,
  GhHeroVisualDirective,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
  type GhFeatureItem,
} from 'gh-design-system';

import {
  PORTFOLIO_EXTERNAL_LINKS,
  type PortfolioExternalLinks,
} from '../../core/config/portfolio.config';
import { resolvePortfolioHref } from '../../core/routing/portfolio-link.utils';
import { PortfolioLocaleService } from '../../core/services/portfolio-locale.service';
import { getPortfolioContactContent } from '../../content/contact-content.registry';
import { resolvePortfolioContactChannels } from '../../content/utils/contact-channel.mapper';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import type { PortfolioContactEmailFallback } from './models/contact-form.model';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    ContactFormComponent,
    GhCardComponent,
    GhContainerComponent,
    GhFeatureGridComponent,
    GhHeroComponent,
    GhHeroVisualDirective,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
  ],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private readonly localeService = inject(PortfolioLocaleService);
  private readonly externalLinks: PortfolioExternalLinks = inject(PORTFOLIO_EXTERNAL_LINKS);

  protected readonly content = computed(() =>
    getPortfolioContactContent(this.localeService.locale()),
  );
  protected readonly externalLinkLabel = computed(
    () => this.localeService.content().shell.navigation.externalLinkLabel,
  );
  protected readonly topicFeatures = computed<readonly GhFeatureItem[]>(() =>
    this.content().topics.items.map((topic) => ({
      title: topic.title,
      description: topic.description,
    })),
  );
  protected readonly availableChannels = computed(() =>
    resolvePortfolioContactChannels(this.content().channels.items, this.externalLinks),
  );
  protected readonly fallbackEmail = computed<PortfolioContactEmailFallback | undefined>(() => {
    const emailChannel = this.availableChannels().find((channel) => channel.id === 'email');
    const address = emailChannel?.href.slice('mailto:'.length).split('?')[0]?.trim();

    return emailChannel && address
      ? {
          href: emailChannel.href,
          address,
        }
      : undefined;
  });
  protected readonly channelFeatures = computed<readonly GhFeatureItem[]>(() =>
    this.availableChannels().map((channel) => ({
      title: channel.label,
      description: channel.description,
      actionLabel: channel.actionLabel,
      ariaLabel: channel.ariaLabel,
      href: channel.href,
      external: channel.external,
    })),
  );
  protected readonly exploreFeatures = computed<readonly GhFeatureItem[]>(() =>
    this.content().explore.actions.map((action) => ({
      title: action.label,
      description: action.description,
      href: resolvePortfolioHref(this.localeService.locale(), action),
      external: action.external ?? false,
    })),
  );
}
