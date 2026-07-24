import { TestBed } from '@angular/core/testing';

import { EN_HOME_CONTENT } from '../../../content/en/home.content';
import { ES_HOME_CONTENT } from '../../../content/es/home.content';
import { HomeContactSectionComponent } from './home-contact-section.component';
import { HomeExperiencePreviewSectionComponent } from './home-experience-preview-section.component';
import { HomeExpertiseSectionComponent } from './home-expertise-section.component';
import { HomeFeaturedContentSectionComponent } from './home-featured-content-section.component';
import { HomeHeroComponent } from './home-hero.component';
import { HomeSelectedProjectsSectionComponent } from './home-selected-projects-section.component';

describe('Home sections', () => {
  it('renders an accessible Hero with localized native actions', async () => {
    await TestBed.configureTestingModule({ imports: [HomeHeroComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HomeHeroComponent);
    fixture.componentRef.setInput('content', EN_HOME_CONTENT.hero);
    fixture.componentRef.setInput('locale', 'en');
    fixture.componentRef.setInput('externalLinkLabel', 'opens in a new tab');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('aside')?.getAttribute('aria-label')).toBe(
      'Professional focus areas',
    );
    expect(element.querySelectorAll('aside li')).toHaveLength(3);
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/projects"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/about"]')).not.toBeNull();
  });

  it('renders six expertise items below a section heading', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExpertiseSectionComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeExpertiseSectionComponent);
    fixture.componentRef.setInput('content', EN_HOME_CONTENT.expertise);
    fixture.componentRef.setInput('externalLinkLabel', 'opens in a new tab');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain('What I help teams improve');
    expect(element.querySelectorAll('gh-feature-grid h3')).toHaveLength(6);
  });

  it('renders selected projects as nested, localized Project Cards', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSelectedProjectsSectionComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeSelectedProjectsSectionComponent);
    fixture.componentRef.setInput('content', ES_HOME_CONTENT.selectedProjects);
    fixture.componentRef.setInput('locale', 'es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-project-card')).toHaveLength(1);
    expect(element.querySelectorAll('gh-project-card h3')).toHaveLength(1);
    expect(element.querySelector('gh-project-card article')?.getAttribute('aria-label')).toBe(
      'Proyecto: Angular Design System',
    );
    expect(element.querySelector<HTMLAnchorElement>('a[href="/es/projects"]')).not.toBeNull();
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/es/projects/angular-design-system"]'),
    ).not.toBeNull();
    expect(element.textContent).toContain('Destacado');
  });

  it('renders the three most recent roles from the canonical Experience source', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExperiencePreviewSectionComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeExperiencePreviewSectionComponent);
    fixture.componentRef.setInput('content', EN_HOME_CONTENT.experience);
    fixture.componentRef.setInput('locale', 'en');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('gh-experience-timeline')).not.toBeNull();
    const cards = [...element.querySelectorAll('gh-experience-card')];
    expect(cards).toHaveLength(3);
    expect(cards[0]?.textContent).toContain('ICBC Bank');
    expect(cards[0]?.textContent).toContain('Frontend Developer');
    expect(cards[0]?.textContent).toContain('February 2023 — Present');
    expect(cards[0]?.textContent).toContain('Current');
    expect(cards[1]?.textContent).toContain('Endava');
    expect(cards[2]?.textContent).toContain('Vortex');
    expect(element.textContent).not.toContain('verified source');
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/experience"]')).not.toBeNull();
  });

  it('renders featured editorial content with an internal localized link', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedContentSectionComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeFeaturedContentSectionComponent);
    fixture.componentRef.setInput('content', ES_HOME_CONTENT.featuredContent);
    fixture.componentRef.setInput('locale', 'es');
    fixture.componentRef.setInput('externalLinkLabel', 'se abre en una pestaña nueva');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('gh-content-highlight h3')?.textContent).toContain(
      'Más allá del chat',
    );
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/es/content/building-ai-agents"]'),
    ).not.toBeNull();
  });

  it('renders the Contact Callout without unverified social links', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContactSectionComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeContactSectionComponent);
    fixture.componentRef.setInput('content', EN_HOME_CONTENT.contact);
    fixture.componentRef.setInput('locale', 'en');
    fixture.componentRef.setInput('externalLinkLabel', 'opens in a new tab');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector<HTMLAnchorElement>('a[href="/en/contact"]')).not.toBeNull();
    expect(element.querySelector('a[target="_blank"]')).toBeNull();
  });
});
