import type { PortfolioProfessionalExperienceContent } from '../models/experience-content.model';
import { EN_EXPERIENCE_CONTENT } from '../en/experience.content';
import {
  mapPortfolioExperienceToCard,
  mapPortfolioExperiencesToPreview,
  mapPortfolioExperiencesToTimeline,
} from './experience-card.mapper';

describe('Experience Card mapper', () => {
  const experiences: readonly PortfolioProfessionalExperienceContent[] = [
    {
      id: 'icbc-frontend-developer',
      order: 1,
      role: 'Frontend Tech Lead',
      company: 'Verified Company',
      startDate: '2024',
      location: 'Argentina',
      workMode: 'remote',
      summary: [
        'Leads frontend architecture for a verified product context.',
        'Supports shared engineering practices.',
      ],
      responsibilities: ['Define Angular boundaries', 'Review pull requests'],
      achievements: ['Standardized shared frontend conventions'],
      technologies: ['Angular', 'TypeScript'],
      capabilities: ['Technical Leadership'],
      current: true,
      logo: { src: '/approved-company.svg', alt: 'Verified Company logo' },
      confidentialityNote: 'The client remains confidential.',
    },
    {
      id: 'develative-project-manager',
      order: 2,
      role: 'Frontend Engineer',
      company: 'Earlier Company',
      startDate: '2021',
      endDate: '2024',
      summary: ['Built maintainable frontend interfaces.'],
      responsibilities: ['Build reusable components'],
      current: false,
    },
  ];

  it('maps every public Card field, localized labels and optional values without mutation', () => {
    const originalResponsibilities = experiences[0]!.responsibilities;
    const mapped = mapPortfolioExperiencesToTimeline(
      experiences,
      EN_EXPERIENCE_CONTENT.timeline.labels,
    );

    expect(mapped.map((item) => item.id)).toEqual([
      'icbc-frontend-developer',
      'develative-project-manager',
    ]);
    expect(mapped[0]).toEqual({
      id: 'icbc-frontend-developer',
      role: 'Frontend Tech Lead',
      company: 'Verified Company',
      startDate: '2024',
      endDate: undefined,
      current: true,
      currentLabel: 'Current',
      location: 'Argentina',
      workMode: 'remote',
      workModeLabel: 'Remote',
      description: [
        'Leads frontend architecture for a verified product context.',
        'Supports shared engineering practices.',
        'The client remains confidential.',
      ],
      responsibilities: originalResponsibilities,
      achievements: ['Standardized shared frontend conventions'],
      technologies: ['Angular', 'TypeScript'],
      capabilities: ['Technical Leadership'],
      companyLogoSrc: '/approved-company.svg',
      companyLogoAlt: 'Verified Company logo',
    });
    expect(mapped[1]?.currentLabel).toBeUndefined();
    expect(mapped[1]?.achievements).toBeUndefined();
    expect(experiences[0]?.responsibilities).toBe(originalResponsibilities);
    expect(experiences.map((item) => item.id)).toEqual([
      'icbc-frontend-developer',
      'develative-project-manager',
    ]);
  });

  it('maps one record through the same typed adapter used by the collection', () => {
    const mapped = mapPortfolioExperienceToCard(
      experiences[1]!,
      EN_EXPERIENCE_CONTENT.timeline.labels,
    );

    expect(mapped.id).toBe('develative-project-manager');
    expect(mapped.description).toEqual(['Built maintainable frontend interfaces.']);
    expect(mapped.currentLabel).toBeUndefined();
  });

  it('derives concise Home cards from the same records without mutating them', () => {
    const originalSummary = experiences[0]!.summary;
    const preview = mapPortfolioExperiencesToPreview(
      experiences,
      EN_EXPERIENCE_CONTENT.timeline.labels,
    );

    expect(preview[0]).toEqual({
      id: 'icbc-frontend-developer',
      role: 'Frontend Tech Lead',
      company: 'Verified Company',
      startDate: '2024',
      endDate: undefined,
      current: true,
      currentLabel: 'Current',
    });
    expect(preview[0]?.description).toBeUndefined();
    expect(preview[0]?.responsibilities).toBeUndefined();
    expect(experiences[0]?.summary).toBe(originalSummary);
  });
});
