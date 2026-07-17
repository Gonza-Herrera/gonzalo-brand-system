import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GhContainerComponent,
  GhContentHighlightComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
} from 'gh-design-system';
import { STORY_HIGHLIGHT } from '../shared/story-data';

const meta = {
  title: 'Compositions/Article Highlight',
  decorators: [
    moduleMetadata({
      imports: [
        GhContainerComponent,
        GhContentHighlightComponent,
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
        component:
          'Editorial section pairing a semantic section heading with the Content Highlight pattern.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeaturedWriting: Story = {
  render: () => ({
    props: { highlight: STORY_HIGHLIGHT },
    template: `
      <gh-section spacing="lg" surface="secondary">
        <gh-container size="wide">
          <gh-section-heading eyebrow="Writing" title="Ideas in practice" description="Notes on interface architecture, accessibility, and sustainable design-system work."></gh-section-heading>
          <div style="margin-top: var(--gh-space-xl)">
            <gh-content-highlight [content]="highlight" surface="gradient"></gh-content-highlight>
          </div>
        </gh-container>
      </gh-section>
    `,
  }),
};

export const Mobile: Story = {
  render: () => ({
    props: { highlight: STORY_HIGHLIGHT },
    template:
      '<gh-content-highlight [content]="highlight" orientation="vertical"></gh-content-highlight>',
  }),
  globals: { viewport: { value: 'mobile375', isRotated: false } },
};
