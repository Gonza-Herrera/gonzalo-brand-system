import { DOCUMENT } from '@angular/common';
import { inject, Injectable, RESPONSE_INIT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SEO_CONFIG } from './seo.config';
import type { SeoUpdateInput, SeoViewModel } from './seo.models';
import { getSeoPageDefinition } from './seo.registry';
import { buildAbsoluteUrl, buildSeoViewModel, serializeJsonLd } from './seo.utils';

const MANAGED_LINK_ATTRIBUTE = 'data-portfolio-seo';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly config = inject(SEO_CONFIG);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  updatePageMetadata(input: SeoUpdateInput): SeoViewModel {
    const viewModel = buildSeoViewModel(this.config, getSeoPageDefinition(input.pageId), input);
    if (!viewModel.indexable && this.responseInit) {
      this.responseInit.status = 404;
    }

    this.title.setTitle(viewModel.title);
    this.setNamedMeta('description', viewModel.description);
    this.setNamedMeta('author', this.config.authorName);
    this.setNamedMeta('robots', viewModel.robots);
    this.setNamedMeta('twitter:card', viewModel.twitter.card);
    this.setNamedMeta('twitter:title', viewModel.twitter.title);
    this.setNamedMeta('twitter:description', viewModel.twitter.description);
    this.setNamedMeta('twitter:image', viewModel.twitter.image);
    this.setNamedMeta('twitter:image:alt', viewModel.twitter.imageAlt);
    this.removeNamedMeta('twitter:site');
    this.removeNamedMeta('twitter:creator');

    this.setPropertyMeta('og:type', viewModel.openGraph.type);
    this.setPropertyMeta('og:site_name', viewModel.openGraph.siteName);
    this.setPropertyMeta('og:title', viewModel.openGraph.title);
    this.setPropertyMeta('og:description', viewModel.openGraph.description);
    this.setPropertyMeta('og:image', viewModel.openGraph.image);
    this.setPropertyMeta('og:image:alt', viewModel.openGraph.imageAlt);
    this.setPropertyMeta('og:locale', viewModel.openGraph.locale);
    this.setRepeatedPropertyMeta('og:locale:alternate', viewModel.openGraph.alternateLocales);

    if (viewModel.openGraph.url) {
      this.setPropertyMeta('og:url', viewModel.openGraph.url);
    } else {
      this.removePropertyMeta('og:url');
    }

    this.updateVerificationMeta();
    this.updateHeadLinks(viewModel);
    this.updateStructuredData(input.locale);

    return viewModel;
  }

  private setNamedMeta(name: string, content: string): void {
    this.setUniqueMeta('name', name, content);
  }

  private setPropertyMeta(property: string, content: string): void {
    this.setUniqueMeta('property', property, content);
  }

  private setUniqueMeta(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `meta[${attribute}="${key}"]`;
    const existing = Array.from(this.document.head.querySelectorAll<HTMLMetaElement>(selector));
    for (const duplicate of existing.slice(1)) {
      duplicate.remove();
    }
    this.meta.updateTag({ [attribute]: key, content }, `${attribute}="${key}"`);
  }

  private setRepeatedPropertyMeta(property: string, contents: readonly string[]): void {
    this.removePropertyMeta(property);
    for (const content of contents) {
      this.meta.addTag({ property, content });
    }
  }

  private removeNamedMeta(name: string): void {
    this.removeMeta('name', name);
  }

  private removePropertyMeta(property: string): void {
    this.removeMeta('property', property);
  }

  private removeMeta(attribute: 'name' | 'property', key: string): void {
    for (const element of Array.from(
      this.document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`),
    )) {
      this.meta.removeTagElement(element);
    }
  }

  private updateVerificationMeta(): void {
    if (this.config.googleSiteVerification) {
      this.setNamedMeta('google-site-verification', this.config.googleSiteVerification);
    } else {
      this.removeNamedMeta('google-site-verification');
    }
    if (this.config.bingSiteVerification) {
      this.setNamedMeta('msvalidate.01', this.config.bingSiteVerification);
    } else {
      this.removeNamedMeta('msvalidate.01');
    }
  }

  private updateHeadLinks(viewModel: SeoViewModel): void {
    for (const link of Array.from(
      this.document.head.querySelectorAll<HTMLLinkElement>(
        `link[${MANAGED_LINK_ATTRIBUTE}="true"]`,
      ),
    )) {
      link.remove();
    }

    if (viewModel.canonicalUrl) {
      this.appendLink({ rel: 'canonical', href: viewModel.canonicalUrl });
    }
    for (const alternate of viewModel.alternateLinks) {
      this.appendLink({
        rel: 'alternate',
        href: alternate.href,
        hreflang: alternate.hreflang,
      });
    }
  }

  private appendLink(attributes: Readonly<Record<string, string>>): void {
    const link = this.document.createElement('link');
    link.setAttribute(MANAGED_LINK_ATTRIBUTE, 'true');
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
    this.document.head.appendChild(link);
  }

  private updateStructuredData(locale: 'en' | 'es'): void {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.config.baseUrl}/#person`,
      name: this.config.authorName,
      url: buildAbsoluteUrl(this.config.baseUrl, `/${locale}`),
      jobTitle: this.config.personJobTitle[locale],
      sameAs: this.config.verifiedProfileUrls,
      knowsAbout: this.config.personKnowsAbout,
    };
    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.config.baseUrl}/#website`,
      name: this.config.siteName,
      url: `${this.config.baseUrl}/`,
      inLanguage: this.config.supportedLocales,
    };

    this.upsertJsonLd('seo-jsonld-person', person);
    this.upsertJsonLd('seo-jsonld-website', website);
  }

  private upsertJsonLd(id: string, data: unknown): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (script?.tagName !== 'SCRIPT') {
      script?.remove();
      script = this.document.createElement('script');
      script.id = id;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = serializeJsonLd(data);
  }
}
