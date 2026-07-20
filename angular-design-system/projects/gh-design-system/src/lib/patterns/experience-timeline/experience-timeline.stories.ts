import type { Meta, StoryObj } from '@storybook/angular';
import { GhExperienceTimelineComponent } from 'gh-design-system';
import { STORY_EXPERIENCES } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhExperienceTimelineComponent> = {
  title: 'Patterns/Experience Timeline',
  component: GhExperienceTimelineComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Ordered professional history composed from public Experience Card APIs.',
      },
    },
  },
  args: {
    experiences: STORY_EXPERIENCES,
    orientation: 'vertical',
    showConnector: true,
    cardHeadingLevel: 2,
  },
  argTypes: { orientation: { control: 'select', options: ['vertical', 'compact'] } },
};

export default meta;
type Story = StoryObj<GhExperienceTimelineComponent>;

export const Vertical: Story = {};
export const Compact: Story = { args: { orientation: 'compact' } };
export const WithoutConnector: Story = { args: { showConnector: false } };
export const SingleRole: Story = { args: { experiences: [STORY_EXPERIENCES[0]!] } };
export const MultipleRoles: Story = { args: { experiences: STORY_EXPERIENCES } };
export const Empty: Story = { args: { experiences: [] } };
export const SpanishCardLabels: Story = {
  args: {
    cardHeadingLevel: 3,
    cardLabels: {
      at: 'en',
      responsibilities: 'Responsabilidades',
      achievements: 'Aportes destacados',
      technologies: 'Tecnologías',
    },
  },
};
