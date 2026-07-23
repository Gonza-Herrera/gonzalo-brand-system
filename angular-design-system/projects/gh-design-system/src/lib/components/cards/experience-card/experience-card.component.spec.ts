import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhExperienceCardComponent } from './experience-card.component';
import {
  GH_EXPERIENCE_CARD_DEFAULT_LABELS,
  type GhExperienceCardData,
  type GhExperienceCardHeadingLevel,
  type GhExperienceCardLabels,
} from './experience-card.types';

@Component({
  standalone: true,
  imports: [GhExperienceCardComponent],
  template: `
    <gh-experience-card
      [experience]="experience()"
      [highlighted]="true"
      [headingLevel]="headingLevel()"
      [labels]="labels()"
    />
  `,
})
class ExperienceCardTestHost {
  readonly headingLevel = signal<GhExperienceCardHeadingLevel>(2);
  readonly labels = signal<GhExperienceCardLabels>(GH_EXPERIENCE_CARD_DEFAULT_LABELS);
  readonly experience = signal<GhExperienceCardData>({
    role: 'Frontend Tech Lead',
    company: 'Demonstration Company',
    startDate: '2024',
    endDate: 'Present',
    current: true,
    location: 'Argentina',
    workMode: 'remote',
    description: [
      'Demonstration content for leadership and frontend architecture.',
      'A second paragraph keeps longer professional context readable.',
    ],
    responsibilities: ['Build reusable components', 'Review pull requests'],
    achievements: ['Improved delivery clarity', 'Mentored frontend engineers'],
    technologies: ['Angular', 'TypeScript'],
    capabilities: ['Leadership', 'Mentoring'],
    companyLogoSrc: '/company-logo.png',
    companyLogoAlt: 'Demonstration Company logo',
  });
}

describe('GhExperienceCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCardTestHost],
    }).compileComponents();
  });

  it('renders semantic experience details, achievements and public component composition', () => {
    const fixture = TestBed.createComponent(ExperienceCardTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const image = element.querySelector<HTMLImageElement>('img');

    expect(element.querySelector('article.gh-card')).not.toBeNull();
    expect(element.querySelector('h2')?.textContent).toContain('Frontend Tech Lead');
    expect(element.querySelector('.experience-card__company')?.textContent).toContain(
      'Demonstration Company',
    );
    expect(element.querySelector('.experience-card__period')?.textContent).toContain(
      '2024 — Present',
    );
    expect(element.querySelector('.gh-badge--success')?.textContent).toContain('Current');
    expect(element.querySelector('.gh-badge--info')?.textContent).toContain('Remote');
    expect(element.querySelector('.experience-card__metadata')?.textContent).toContain('Argentina');
    expect(element.querySelectorAll('.experience-card__content li')).toHaveLength(4);
    expect(element.textContent).toContain('Responsibilities');
    expect(element.textContent).toContain('Key achievements');
    expect(element.querySelectorAll('.experience-card__description p')).toHaveLength(2);
    expect(element.querySelectorAll('gh-tag')).toHaveLength(4);
    expect(element.textContent).toContain('Capabilities');
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.alt).toBe('Demonstration Company logo');
    expect(element.querySelector('.gh-card--elevated')).not.toBeNull();
  });

  it('supports experience data without optional collections or logo', () => {
    const fixture = TestBed.createComponent(ExperienceCardTestHost);
    fixture.componentInstance.experience.set({
      role: 'Senior Frontend Engineer',
      company: 'Example Organization',
      startDate: '2021',
      endDate: '2024',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('.experience-card__content section')).toBeNull();
    expect(element.querySelector('.experience-card__skills')).toBeNull();
    expect(element.querySelector('.experience-card__period')?.textContent).toContain('2021 — 2024');
  });

  it('keeps a single description string backwards compatible', () => {
    const fixture = TestBed.createComponent(ExperienceCardTestHost);
    fixture.componentInstance.experience.set({
      role: 'Frontend Engineer',
      company: 'Example Organization',
      startDate: '2021',
      description: 'One concise description.',
    });
    fixture.detectChanges();

    const paragraphs = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.experience-card__description p',
    );
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0]?.textContent).toContain('One concise description.');
  });

  it('localizes internal labels, aria copy and nested heading levels', () => {
    const fixture = TestBed.createComponent(ExperienceCardTestHost);
    fixture.componentInstance.headingLevel.set(3);
    fixture.componentInstance.labels.set({
      at: 'en',
      responsibilities: 'Responsabilidades',
      achievements: 'Aportes destacados',
      technologies: 'Tecnologías',
      capabilities: 'Capacidades',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('h3')?.textContent).toContain('Frontend Tech Lead');
    expect(
      [...element.querySelectorAll('h4')].map((heading) => heading.textContent?.trim()),
    ).toEqual(['Responsabilidades', 'Aportes destacados', 'Tecnologías', 'Capacidades']);
    expect(element.querySelector('article')?.getAttribute('aria-label')).toBe(
      'Frontend Tech Lead en Demonstration Company',
    );
  });
});
