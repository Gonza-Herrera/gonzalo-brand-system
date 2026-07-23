import type { PortfolioProfessionalExperienceContent } from '../models/experience-content.model';
import {
  selectCurrentExperience,
  selectExperiencePreview,
  selectOrderedExperiences,
} from './experience-selectors';

describe('Experience selectors', () => {
  const experiences: readonly PortfolioProfessionalExperienceContent[] = [
    {
      id: 'develative-project-manager',
      order: 5,
      company: 'Develative',
      role: 'Project Manager',
      startDate: 'April 2017',
      endDate: 'July 2019',
      current: false,
      summary: ['Project coordination.'],
      responsibilities: ['Coordinate projects.'],
      capabilities: ['Project Management'],
    },
    {
      id: 'icbc-frontend-developer',
      order: 1,
      company: 'ICBC Bank',
      role: 'Frontend Developer',
      startDate: 'February 2023',
      endDate: 'Present',
      current: true,
      summary: ['Enterprise frontend engineering.'],
      responsibilities: ['Develop Angular applications.'],
      technologies: ['Angular'],
    },
    {
      id: 'vortex-frontend-developer',
      order: 3,
      company: 'Vortex',
      role: 'Frontend Developer',
      startDate: 'February 2020',
      endDate: 'May 2021',
      current: false,
      summary: ['Frontend delivery.'],
      responsibilities: ['Build web applications.'],
      technologies: ['Angular'],
    },
  ];

  it('orders by the stable editorial order without mutating the source', () => {
    const sourceIds = experiences.map((experience) => experience.id);
    const ordered = selectOrderedExperiences(experiences);

    expect(ordered.map((experience) => experience.id)).toEqual([
      'icbc-frontend-developer',
      'vortex-frontend-developer',
      'develative-project-manager',
    ]);
    expect(ordered).not.toBe(experiences);
    expect(experiences.map((experience) => experience.id)).toEqual(sourceIds);
  });

  it('selects ICBC as current and returns undefined when no current role exists', () => {
    expect(selectCurrentExperience(experiences)?.id).toBe('icbc-frontend-developer');
    expect(
      selectCurrentExperience(experiences.map((experience) => ({ ...experience, current: false }))),
    ).toBeUndefined();
  });

  it('returns the most recent preview, respects limits and preserves input', () => {
    const sourceIds = experiences.map((experience) => experience.id);

    expect(selectExperiencePreview(experiences, 2).map((experience) => experience.id)).toEqual([
      'icbc-frontend-developer',
      'vortex-frontend-developer',
    ]);
    expect(selectExperiencePreview(experiences, 0)).toEqual([]);
    expect(selectExperiencePreview(experiences, -1)).toEqual([]);
    expect(experiences.map((experience) => experience.id)).toEqual(sourceIds);
  });
});
