import { TestBed } from '@angular/core/testing';

import { EN_EXPERIENCE_CONTENT } from '../../../content/en/experience.content';
import { ES_EXPERIENCE_CONTENT } from '../../../content/es/experience.content';
import type {
  PortfolioExperienceTimelineContent,
  PortfolioProfessionalExperienceContent,
} from '../../../content/models/experience-content.model';
import { ExperienceCapabilitiesSectionComponent } from './experience-capabilities-section.component';
import { ExperienceCareerDirectionSectionComponent } from './experience-career-direction-section.component';
import { ExperienceContactSectionComponent } from './experience-contact-section.component';
import { ExperienceFeatureSectionComponent } from './experience-feature-section.component';
import { ExperienceHeroComponent } from './experience-hero.component';
import { ExperienceSummarySectionComponent } from './experience-summary-section.component';
import { ExperienceTimelineSectionComponent } from './experience-timeline-section.component';

describe('Experience sections', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExperienceCapabilitiesSectionComponent,
        ExperienceCareerDirectionSectionComponent,
        ExperienceContactSectionComponent,
        ExperienceFeatureSectionComponent,
        ExperienceHeroComponent,
        ExperienceSummarySectionComponent,
        ExperienceTimelineSectionComponent,
      ],
    }).compileComponents();
  });

  it('renders a localized Hero with one h1 and stable highlight order', () => {
    const fixture = TestBed.createComponent(ExperienceHeroComponent);
    fixture.componentRef.setInput('content', ES_EXPERIENCE_CONTENT.hero);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(ES_EXPERIENCE_CONTENT.hero.title);
    expect(element.querySelector('aside')?.getAttribute('aria-label')).toBe(
      ES_EXPERIENCE_CONTENT.hero.visualLabel,
    );
    expect(
      [...element.querySelectorAll('.experience-hero__highlights li')].map((item) =>
        item.textContent?.trim(),
      ),
    ).toEqual(ES_EXPERIENCE_CONTENT.hero.highlights.map((item) => item.label));
    expect(element.textContent).not.toMatch(/\b\d{1,3}%/);
  });

  it('renders summary paragraphs and focus areas in order, including an empty focus state', () => {
    const fixture = TestBed.createComponent(ExperienceSummarySectionComponent);
    fixture.componentRef.setInput('content', EN_EXPERIENCE_CONTENT.summary);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(
      [...element.querySelectorAll('.experience-summary__copy p')].map((item) =>
        item.textContent?.trim(),
      ),
    ).toEqual([...EN_EXPERIENCE_CONTENT.summary.paragraphs]);
    expect(element.querySelectorAll('gh-tag')).toHaveLength(
      EN_EXPERIENCE_CONTENT.summary.focusAreas.length,
    );

    fixture.componentRef.setInput('content', {
      ...EN_EXPERIENCE_CONTENT.summary,
      focusAreas: [],
    });
    fixture.detectChanges();
    expect(element.querySelectorAll('gh-tag')).toHaveLength(0);
  });

  it('renders consumer-ordered roles through Timeline and Card with localized detail groups', () => {
    const items: readonly PortfolioProfessionalExperienceContent[] = [
      {
        id: 'current-role',
        role: 'Current verified role',
        company: 'Verified Company',
        startDate: '2024',
        summary: 'Current role context.',
        responsibilities: ['Lead architecture decisions', 'Review pull requests'],
        achievements: ['Improved component reuse'],
        technologies: ['Angular', 'TypeScript'],
        current: true,
      },
      {
        id: 'earlier-role',
        role: 'Earlier verified role',
        company: 'Earlier Company',
        startDate: '2021',
        endDate: '2024',
        summary: 'Earlier role context.',
        responsibilities: ['Build reusable components'],
      },
    ];
    const content: PortfolioExperienceTimelineContent = {
      ...EN_EXPERIENCE_CONTENT.timeline,
      items,
    };
    const fixture = TestBed.createComponent(ExperienceTimelineSectionComponent);
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll('gh-experience-card');
    expect(element.querySelector('gh-experience-timeline ol')).not.toBeNull();
    expect(cards).toHaveLength(2);
    expect(cards[0]?.querySelector('h3')?.textContent).toContain('Current verified role');
    expect(cards[1]?.querySelector('h3')?.textContent).toContain('Earlier verified role');
    expect(cards[0]?.textContent).toContain('Current');
    expect(cards[0]?.textContent).toContain('Responsibilities');
    expect(cards[0]?.textContent).toContain('Selected contributions');
    expect(cards[0]?.textContent).toContain('Technologies');
    expect(cards[1]?.textContent).not.toContain('Selected contributions');
    expect(cards[1]?.querySelector('img')).toBeNull();
  });

  it('keeps an honest localized empty Timeline without failing', () => {
    const fixture = TestBed.createComponent(ExperienceTimelineSectionComponent);
    fixture.componentRef.setInput('content', ES_EXPERIENCE_CONTENT.timeline);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('gh-experience-timeline')).not.toBeNull();
    expect(element.querySelectorAll('gh-experience-timeline li')).toHaveLength(0);
    expect(element.textContent).toContain('fuente aprobada del repositorio');
  });

  it('renders leadership and ways of working from localized feature content and handles empty items', () => {
    const fixture = TestBed.createComponent(ExperienceFeatureSectionComponent);
    fixture.componentRef.setInput('sectionId', 'leadership-impact');
    fixture.componentRef.setInput('content', ES_EXPERIENCE_CONTENT.leadership);
    fixture.componentRef.setInput('externalLinkLabel', 'se abre en una pestaña nueva');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-feature-grid h3')).toHaveLength(
      ES_EXPERIENCE_CONTENT.leadership.items.length,
    );
    expect(element.textContent).toContain('Impacto más allá de la implementación');

    fixture.componentRef.setInput('content', {
      ...ES_EXPERIENCE_CONTENT.waysOfWorking,
      items: [],
    });
    fixture.detectChanges();
    expect(element.querySelector('gh-feature-grid')).toBeNull();
  });

  it('renders non-empty capability groups as wrapping Tags without percentage levels', () => {
    const lastGroup = EN_EXPERIENCE_CONTENT.capabilities.groups.at(-1)!;
    const content = {
      ...EN_EXPERIENCE_CONTENT.capabilities,
      groups: [
        ...EN_EXPERIENCE_CONTENT.capabilities.groups.slice(0, -1),
        { ...lastGroup, items: [] },
      ],
    };
    const fixture = TestBed.createComponent(ExperienceCapabilitiesSectionComponent);
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('gh-card')).toHaveLength(content.groups.length - 1);
    expect(element.querySelectorAll('gh-tag').length).toBeGreaterThan(0);
    expect(element.textContent).not.toMatch(/\b\d{1,3}%/);
  });

  it('renders Career Direction with a locale-aware Projects transition', () => {
    const fixture = TestBed.createComponent(ExperienceCareerDirectionSectionComponent);
    fixture.componentRef.setInput('content', ES_EXPERIENCE_CONTENT.careerDirection);
    fixture.componentRef.setInput('locale', 'es');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain(ES_EXPERIENCE_CONTENT.careerDirection.title);
    expect(element.querySelectorAll('gh-tag')).toHaveLength(
      ES_EXPERIENCE_CONTENT.careerDirection.points.length,
    );
    expect(element.querySelector<HTMLAnchorElement>('a')?.pathname).toBe('/es/projects');
  });

  it('renders localized native Contact and Projects actions', () => {
    const fixture = TestBed.createComponent(ExperienceContactSectionComponent);
    fixture.componentRef.setInput('content', EN_EXPERIENCE_CONTENT.contact);
    fixture.componentRef.setInput('locale', 'en');
    fixture.componentRef.setInput('externalLinkLabel', 'opens in a new tab');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = [...element.querySelectorAll<HTMLAnchorElement>('a')];
    expect(element.textContent).toContain(EN_EXPERIENCE_CONTENT.contact.title);
    expect(links.map((link) => link.pathname)).toEqual(['/en/contact', '/en/projects']);
    expect(links.every((link) => link.getAttribute('target') === null)).toBe(true);
  });
});
