import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhExperienceCardComponent } from './experience-card.component';
import type { GhExperienceCardData } from './experience-card.types';

@Component({
  standalone: true,
  imports: [GhExperienceCardComponent],
  template: `<gh-experience-card [experience]="experience()" [highlighted]="true" />`,
})
class ExperienceCardTestHost {
  readonly experience = signal<GhExperienceCardData>({
    role: 'Frontend Tech Lead',
    company: 'Demonstration Company',
    startDate: '2024',
    endDate: 'Present',
    current: true,
    location: 'Argentina',
    workMode: 'remote',
    description: 'Demonstration content for leadership and frontend architecture.',
    achievements: ['Improved delivery clarity', 'Mentored frontend engineers'],
    technologies: ['Angular', 'Leadership', 'AI'],
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
    expect(element.querySelectorAll('.experience-card__content li')).toHaveLength(2);
    expect(element.querySelectorAll('gh-tag')).toHaveLength(3);
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
    expect(element.querySelector('.experience-card__technologies')).toBeNull();
    expect(element.querySelector('.experience-card__period')?.textContent).toContain('2021 — 2024');
  });
});
