import type { Meta, StoryObj } from '@storybook/angular';
import { GhFeatureGridComponent } from 'gh-design-system';
import { STORY_FEATURES } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhFeatureGridComponent> = {
  title: 'Patterns/Feature Grid',
  component: GhFeatureGridComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Responsive feature collection rendered as cards or a minimal editorial list.',
      },
    },
  },
  args: { features: STORY_FEATURES, columns: 'auto', variant: 'cards' },
  argTypes: {
    columns: { control: 'select', options: ['auto', 2, 3, 4] },
    variant: { control: 'select', options: ['cards', 'minimal'] },
  },
};

export default meta;
type Story = StoryObj<GhFeatureGridComponent>;

export const Cards: Story = {};
export const Minimal: Story = { args: { variant: 'minimal' } };
export const Auto: Story = { args: { columns: 'auto' } };
export const TwoColumns: Story = { args: { columns: 2 } };
export const ThreeColumns: Story = { args: { columns: 3 } };
export const FourColumns: Story = { args: { columns: 4 } };
export const WithLink: Story = {
  args: {
    features: [
      ...STORY_FEATURES,
      {
        title: 'Explore the source',
        description: 'Inspect the implementation and public API.',
        href: 'https://github.com/',
        external: true,
        iconLabel: 'Code',
      },
    ],
  },
};
export const WithoutIcons: Story = {
  args: { features: STORY_FEATURES.map(({ iconLabel: _iconLabel, ...feature }) => feature) },
};
export const LongContent: Story = {
  args: {
    features: [
      {
        title: 'Long-form feature content',
        description:
          'This intentionally longer description validates that responsive feature layouts remain readable and aligned when consumer-owned copy spans several lines across neighboring items.',
        eyebrow: 'Resilience',
      },
      ...STORY_FEATURES,
    ],
  },
};
export const Mobile: Story = { globals: { viewport: { value: 'mobile320', isRotated: false } } };
