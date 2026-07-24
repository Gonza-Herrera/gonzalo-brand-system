import { TestBed } from '@angular/core/testing';
import { RESPONSE_INIT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SEO_CONFIG_VALUE } from './seo.config';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;
  let title: Title;
  let responseInit: ResponseInit;

  beforeEach(() => {
    responseInit = { status: 200 };
    TestBed.configureTestingModule({
      providers: [{ provide: RESPONSE_INIT, useValue: responseInit }],
    });
    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
    title = TestBed.inject(Title);
  });

  it('writes complete EN metadata and typed Person/WebSite JSON-LD', () => {
    service.updatePageMetadata({ pageId: 'home', locale: 'en', path: '/en?source=test#hero' });

    expect(title.getTitle()).toBe('Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer');
    expect(meta.getTag('name="description"')?.content).toContain('scalable frontend architecture');
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    expect(meta.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
    expect(meta.getTag('name="twitter:image"')?.content).toBe(
      `${SEO_CONFIG_VALUE.baseUrl}/assets/social/gonzalo-herrera-og.jpg`,
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('website');
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
    expect(meta.getTag('property="og:locale:alternate"')?.content).toBe('es_AR');
    expect(meta.getTag('property="og:url"')?.content).toBe(`${SEO_CONFIG_VALUE.baseUrl}/en`);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical?.href).toBe(`${SEO_CONFIG_VALUE.baseUrl}/en`);
    expect(
      Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')).map(
        (link) => [link.hreflang, link.href],
      ),
    ).toEqual([
      ['en', `${SEO_CONFIG_VALUE.baseUrl}/en`],
      ['es', `${SEO_CONFIG_VALUE.baseUrl}/es`],
      ['x-default', `${SEO_CONFIG_VALUE.baseUrl}/en`],
    ]);

    const person = JSON.parse(
      document.getElementById('seo-jsonld-person')?.textContent ?? '{}',
    ) as Record<string, unknown>;
    expect(person['@type']).toBe('Person');
    expect(person['sameAs']).toEqual(['https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/']);
    expect(person).not.toHaveProperty('email');
    expect(document.getElementById('seo-jsonld-website')?.textContent).toContain('"WebSite"');
  });

  it('updates locale and page metadata in place without duplicates', () => {
    service.updatePageMetadata({ pageId: 'home', locale: 'en' });
    service.updatePageMetadata({ pageId: 'about', locale: 'es' });
    service.updatePageMetadata({ pageId: 'contact', locale: 'en' });

    const uniqueSelectors = [
      'meta[name="description"]',
      'meta[name="robots"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'link[rel="canonical"]',
      'link[rel="alternate"][hreflang="en"]',
      'link[rel="alternate"][hreflang="es"]',
      'link[rel="alternate"][hreflang="x-default"]',
      'script#seo-jsonld-person',
      'script#seo-jsonld-website',
    ];
    for (const selector of uniqueSelectors) {
      expect(document.head.querySelectorAll(selector), selector).toHaveLength(1);
    }
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
    expect(document.head.querySelector('meta[name="twitter:site"]')).toBeNull();
    expect(document.head.querySelector('meta[name="twitter:creator"]')).toBeNull();
  });

  it('uses noindex and removes canonical, hreflang and og:url for Not Found', () => {
    service.updatePageMetadata({ pageId: 'about', locale: 'en' });
    service.updatePageMetadata({
      pageId: 'not-found',
      locale: 'es',
      path: '/es/no-existe',
    });

    expect(title.getTitle()).toBe('Página no encontrada | Gonzalo Herrera');
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, nofollow');
    expect(responseInit.status).toBe(404);
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('link[rel="alternate"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:url"]')).toBeNull();
    expect(meta.getTag('property="og:title"')?.content).toBe(
      'Página no encontrada | Gonzalo Herrera',
    );
  });
});
