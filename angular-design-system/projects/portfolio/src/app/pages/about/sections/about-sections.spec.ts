import { TestBed } from '@angular/core/testing';

import { EN_ABOUT_CONTENT } from '../../../content/en/about.content';
import type { PortfolioTechnicalFocusContent } from '../../../content/models/about-content.model';
import { ES_ABOUT_CONTENT } from '../../../content/es/about.content';
import { AboutAiSectionComponent } from './about-ai-section.component';
import { AboutContactSectionComponent } from './about-contact-section.component';
import { AboutFeatureSectionComponent } from './about-feature-section.component';
import { AboutHeroComponent } from './about-hero.component';
import { AboutLeadershipSectionComponent } from './about-leadership-section.component';
import { AboutStorySectionComponent } from './about-story-section.component';
import { AboutTechnicalFocusSectionComponent } from './about-technical-focus-section.component';

describe('About sections', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutAiSectionComponent,
        AboutContactSectionComponent,
        AboutFeatureSectionComponent,
        AboutHeroComponent,
        AboutLeadershipSectionComponent,
        AboutStorySectionComponent,
        AboutTechnicalFocusSectionComponent,
      ],
    }).compileComponents();
  });

  it('renders a localized Hero with one h1 and stable focus order', () => {
    const fixture = TestBed.createComponent(AboutHeroComponent);
    fixture.componentRef.setInput('content', ES_ABOUT_CONTENT.hero);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(ES_ABOUT_CONTENT.hero.title);
    expect(element.textContent).toContain(ES_ABOUT_CONTENT.hero.eyebrow);
    expect(element.textContent).toContain(ES_ABOUT_CONTENT.hero.description);
    expect(
      [...element.querySelectorAll('.about-hero__focuses li')].map((item) =>
        item.textContent?.trim(),
      ),
    ).toEqual(ES_ABOUT_CONTENT.hero.focuses.map((item) => item.label));
  });

  it('renders story paragraphs and highlights in order with a localized Experience link', () => {
    const fixture = TestBed.createComponent(AboutStorySectionComponent);
    fixture.componentRef.setInput('content', EN_ABOUT_CONTENT.story);
    fixture.componentRef.setInput('locale', 'en');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(
      [...element.querySelectorAll('.about-story__copy p')].map((item) => item.textContent?.trim()),
    ).toEqual([...EN_ABOUT_CONTENT.story.paragraphs]);
    expect(element.querySelectorAll('gh-card')).toHaveLength(
      EN_ABOUT_CONTENT.story.highlights.length,
    );
    expect(element.querySelector<HTMLAnchorElement>('a')?.pathname).toBe('/en/experience');

    fixture.componentRef.setInput('content', { ...EN_ABOUT_CONTENT.story, highlights: [] });
    fixture.detectChanges();
    expect(element.querySelectorAll('gh-card')).toHaveLength(0);
  });

  it('renders the three reusable feature sections from localized content', () => {
    const cases = [
      ['engineering-philosophy', ES_ABOUT_CONTENT.philosophy],
      ['core-principles', ES_ABOUT_CONTENT.principles],
      ['working-style', ES_ABOUT_CONTENT.workingStyle],
    ] as const;

    for (const [sectionId, content] of cases) {
      const fixture = TestBed.createComponent(AboutFeatureSectionComponent);
      fixture.componentRef.setInput('sectionId', sectionId);
      fixture.componentRef.setInput('content', content);
      fixture.componentRef.setInput('externalLinkLabel', 'se abre en una pestaña nueva');
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector(`#${sectionId}`)).not.toBeNull();
      expect(element.querySelectorAll('gh-feature-grid h3')).toHaveLength(content.items.length);
      expect(element.textContent).toContain(content.title);
    }
  });

  it('renders localized leadership practices without duplicates', () => {
    const fixture = TestBed.createComponent(AboutLeadershipSectionComponent);
    fixture.componentRef.setInput('content', ES_ABOUT_CONTENT.leadership);
    fixture.componentRef.setInput('externalLinkLabel', 'se abre en una pestaña nueva');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain(ES_ABOUT_CONTENT.leadership.paragraphs[0]);
    expect(element.querySelectorAll('gh-feature-grid h3')).toHaveLength(
      ES_ABOUT_CONTENT.leadership.practices.length,
    );
    expect(new Set(ES_ABOUT_CONTENT.leadership.practices.map((item) => item.id)).size).toBe(
      ES_ABOUT_CONTENT.leadership.practices.length,
    );
  });

  it('presents AI use cases as support and preserves the central human-judgment principle', () => {
    const fixture = TestBed.createComponent(AboutAiSectionComponent);
    fixture.componentRef.setInput('content', EN_ABOUT_CONTENT.aiEngineering);
    fixture.componentRef.setInput('externalLinkLabel', 'opens in a new tab');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-feature-grid h3')).toHaveLength(
      EN_ABOUT_CONTENT.aiEngineering.useCases.length,
    );
    expect(element.textContent).toContain(EN_ABOUT_CONTENT.aiEngineering.supportingText);
    expect(element.textContent).toContain(
      'AI should amplify engineering judgment, not replace it.',
    );
  });

  it('renders technical groups and tags, rejects percentage levels, and handles an empty group', () => {
    const content: PortfolioTechnicalFocusContent = {
      ...EN_ABOUT_CONTENT.technicalFocus,
      groups: [
        ...EN_ABOUT_CONTENT.technicalFocus.groups.slice(0, -1),
        { ...EN_ABOUT_CONTENT.technicalFocus.groups.at(-1)!, items: [] },
      ],
    };
    const fixture = TestBed.createComponent(AboutTechnicalFocusSectionComponent);
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-card')).toHaveLength(content.groups.length);
    expect(element.querySelectorAll('gh-tag')).toHaveLength(
      content.groups.reduce((total, group) => total + group.items.length, 0),
    );
    expect(element.textContent).not.toMatch(/\b\d{1,3}%/);
  });

  it('renders native localized Contact and Experience links', () => {
    const fixture = TestBed.createComponent(AboutContactSectionComponent);
    fixture.componentRef.setInput('content', ES_ABOUT_CONTENT.contact);
    fixture.componentRef.setInput('locale', 'es');
    fixture.componentRef.setInput('externalLinkLabel', 'se abre en una pestaña nueva');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    expect(element.textContent).toContain(ES_ABOUT_CONTENT.contact.title);
    expect(element.textContent).toContain(ES_ABOUT_CONTENT.contact.description);
    expect(links.map((link) => link.pathname)).toEqual(['/es/contact', '/es/experience']);
  });
});
