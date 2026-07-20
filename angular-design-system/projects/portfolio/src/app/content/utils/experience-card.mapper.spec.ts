import type { PortfolioProfessionalExperienceContent } from '../models/experience-content.model';
import { EN_EXPERIENCE_CONTENT } from '../en/experience.content';
import {
  mapPortfolioExperiencesToTimeline,
  selectFeaturedExperiences,
} from './experience-card.mapper';

describe('Experience Card mapper', () => {
  const experiences: readonly PortfolioProfessionalExperienceContent[] = [
    {
      id: 'current-role',
      role: 'Frontend Tech Lead',
      company: 'Verified Company',
      startDate: '2024',
      location: 'Argentina',
      workMode: 'remote',
      summary: 'Leads frontend architecture for a verified product context.',
      responsibilities: ['Define Angular boundaries', 'Review pull requests'],
      achievements: ['Standardized shared frontend conventions'],
      technologies: ['Angular', 'TypeScript'],
      current: true,
      logo: { src: '/approved-company.svg', alt: 'Verified Company logo' },
      confidentialityNote: 'The client remains confidential.',
    },
    {
      id: 'earlier-role',
      role: 'Frontend Engineer',
      company: 'Earlier Company',
      startDate: '2021',
      endDate: '2024',
      summary: 'Built maintainable frontend interfaces.',
      responsibilities: ['Build reusable components'],
    },
  ];

  it('maps all public Card fields, localized labels and optional values without mutation', () => {
    const originalResponsibilities = experiences[0]!.responsibilities;
    const mapped = mapPortfolioExperiencesToTimeline(
      experiences,
      EN_EXPERIENCE_CONTENT.timeline.labels,
    );

    expect(mapped.map((item) => item.id)).toEqual(['current-role', 'earlier-role']);
    expect(mapped[0]).toEqual({
      id: 'current-role',
      role: 'Frontend Tech Lead',
      company: 'Verified Company',
      startDate: '2024',
      endDate: undefined,
      current: true,
      currentLabel: 'Current',
      location: 'Argentina',
      workMode: 'remote',
      workModeLabel: 'Remote',
      description:
        'Leads frontend architecture for a verified product context. The client remains confidential.',
      responsibilities: originalResponsibilities,
      achievements: ['Standardized shared frontend conventions'],
      technologies: ['Angular', 'TypeScript'],
      companyLogoSrc: '/approved-company.svg',
      companyLogoAlt: 'Verified Company logo',
    });
    expect(mapped[1]?.currentLabel).toBeUndefined();
    expect(mapped[1]?.achievements).toBeUndefined();
    expect(experiences[0]?.responsibilities).toBe(originalResponsibilities);
    expect(experiences.map((item) => item.id)).toEqual(['current-role', 'earlier-role']);
  });

  it('selects a stable preview without sorting or mutating the source', () => {
    const preview = selectFeaturedExperiences(experiences, 1);

    expect(preview.map((item) => item.id)).toEqual(['current-role']);
    expect(experiences.map((item) => item.id)).toEqual(['current-role', 'earlier-role']);
    expect(selectFeaturedExperiences(experiences, 0)).toEqual([]);
    expect(selectFeaturedExperiences(experiences, -1)).toEqual([]);
  });
});
