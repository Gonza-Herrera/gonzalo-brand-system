import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { GhBadgeComponent, GhClusterComponent, GhTagComponent } from 'gh-design-system';

const meta: Meta<GhClusterComponent> = {
  title: 'Layout/Cluster',
  component: GhClusterComponent,
  decorators: [moduleMetadata({ imports: [GhBadgeComponent, GhTagComponent] })],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Wrapping cluster for groups of controls, tags, or metadata.' },
    },
  },
  args: { gap: 'sm', align: 'center', justify: 'start' },
  argTypes: {
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'baseline', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
  },
  render: (args) => ({
    props: args,
    template:
      "<gh-cluster [gap]=\"gap\" [align]=\"align\" [justify]=\"justify\">@for (label of ['Angular', 'TypeScript', 'Accessibility', 'Storybook', 'Sass']; track label) {<span class=\"gh-story-layout-item\">{{ label }}</span>}</gh-cluster>",
  }),
};

export default meta;
type Story = StoryObj<GhClusterComponent>;

export const Playground: Story = {};
export const Centered: Story = { args: { justify: 'center' } };
export const Spacious: Story = { args: { gap: 'lg' } };
export const Tags: Story = {
  render: () => ({
    template:
      "<gh-cluster>@for (tag of ['Angular', 'TypeScript', 'Signals', 'Accessibility']; track tag) {<gh-tag>{{ tag }}</gh-tag>}</gh-cluster>",
  }),
};
export const Badges: Story = {
  render: () => ({
    template:
      '<gh-cluster><gh-badge variant="success">Ready</gh-badge><gh-badge variant="info">In review</gh-badge><gh-badge variant="warning">Needs work</gh-badge></gh-cluster>',
  }),
};
export const WrappingTechnologies: Story = {
  render: () => ({
    template:
      "<div style=\"max-width: 22rem\"><gh-cluster>@for (tag of ['Angular', 'TypeScript', 'RxJS', 'Sass', 'Storybook', 'Playwright', 'Accessibility']; track tag) {<gh-tag>{{ tag }}</gh-tag>}</gh-cluster></div>",
  }),
};
