import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GhContainerComponent,
  GhExperienceTimelineComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
} from 'gh-design-system';
import { STORY_EXPERIENCES } from '../shared/story-data';

const meta = {
  title: 'Compositions/Experience Section',
  decorators: [
    moduleMetadata({
      imports: [
        GhContainerComponent,
        GhExperienceTimelineComponent,
        GhSectionComponent,
        GhSectionHeadingComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Professional history section with semantic hierarchy and an ordered timeline.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CareerTimeline: Story = {
  render: () => ({
    props: { experiences: STORY_EXPERIENCES },
    template: `
      <gh-section spacing="lg" surface="primary">
        <gh-container size="lg">
          <gh-section-heading eyebrow="Experience" title="Building systems with product teams" description="A progression through accessible frontend development and design-system leadership."></gh-section-heading>
          <div style="margin-top: var(--gh-space-xl)">
            <gh-experience-timeline [experiences]="experiences"></gh-experience-timeline>
          </div>
        </gh-container>
      </gh-section>
    `,
  }),
};

export const Compact: Story = {
  render: () => ({
    props: { experiences: STORY_EXPERIENCES },
    template:
      '<gh-container size="lg"><gh-experience-timeline [experiences]="experiences" orientation="compact"></gh-experience-timeline></gh-container>',
  }),
};
