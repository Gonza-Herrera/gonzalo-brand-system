import type { Meta, StoryObj } from '@storybook/angular';
import { GhExperienceCardComponent } from 'gh-design-system';
import { STORY_EXPERIENCE } from '../../../../../../../stories/shared/story-data';

const meta: Meta<GhExperienceCardComponent> = {
  title: 'Components/Cards/Experience Card',
  component: GhExperienceCardComponent,
  tags: ['autodocs', 'pr26-cards'],
  parameters: {
    docs: {
      description: {
        component:
          'Professional experience summary with responsibilities, period, work mode, achievements, and technologies.',
      },
    },
  },
  args: { experience: STORY_EXPERIENCE, highlighted: false },
};

export default meta;
type Story = StoryObj<GhExperienceCardComponent>;

export const CurrentRole: Story = {};
export const WithAchievements: Story = {};
export const WithResponsibilities: Story = {};
export const WithTechnologies: Story = {};
export const WithCapabilities: Story = {
  args: {
    experience: {
      ...STORY_EXPERIENCE,
      capabilities: ['Technical Leadership', 'Mentoring', 'Agile'],
    },
  },
};
export const WithLogo: Story = {};
export const Highlighted: Story = { args: { highlighted: true } };
export const PastRole: Story = {
  args: {
    experience: { ...STORY_EXPERIENCE, startDate: '2020', endDate: '2023', current: false },
  },
};
export const CompactContent: Story = {
  args: {
    experience: {
      role: STORY_EXPERIENCE.role,
      company: STORY_EXPERIENCE.company,
      startDate: STORY_EXPERIENCE.startDate,
      current: true,
    },
  },
};
export const WithoutAchievements: Story = {
  args: { experience: { ...STORY_EXPERIENCE, achievements: undefined } },
};
export const SpanishLabels: Story = {
  args: {
    headingLevel: 3,
    labels: {
      at: 'en',
      responsibilities: 'Responsabilidades',
      achievements: 'Aportes destacados',
      technologies: 'Tecnologías',
      capabilities: 'Capacidades',
    },
  },
};
export const WithoutLogo: Story = {
  args: {
    experience: { ...STORY_EXPERIENCE, companyLogoSrc: undefined, companyLogoAlt: undefined },
  },
};
export const LongContent: Story = {
  args: {
    experience: {
      ...STORY_EXPERIENCE,
      description: [
        'Led a cross-functional initiative to consolidate fragmented interface patterns into a documented, token-driven Angular system while supporting product delivery.',
        'Mentored contributors and coordinated accessibility review across several application teams.',
      ],
    },
  },
};
