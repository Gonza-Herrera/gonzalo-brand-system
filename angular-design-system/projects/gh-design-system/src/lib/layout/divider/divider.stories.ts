import type { Meta, StoryObj } from '@storybook/angular';
import { GhDividerComponent } from 'gh-design-system';

const meta: Meta<GhDividerComponent> = {
  title: 'Layout/Divider',
  component: GhDividerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Decorative or semantic separator with orientation, line style, and tone.',
      },
    },
  },
  args: { orientation: 'horizontal', style: 'solid', tone: 'subtle', decorative: true },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    style: { control: 'select', options: ['solid', 'dashed'] },
    tone: { control: 'select', options: ['subtle', 'default', 'strong'] },
  },
};

export default meta;
type Story = StoryObj<GhDividerComponent>;

export const Horizontal: Story = {};
export const Dashed: Story = { args: { style: 'dashed', tone: 'default' } };
export const Semantic: Story = { args: { decorative: false, tone: 'strong' } };
export const Decorative: Story = { args: { decorative: true } };
export const Tones: Story = {
  render: () => ({
    template:
      '<div style="display: grid; gap: var(--gh-space-lg)"><gh-divider tone="subtle"></gh-divider><gh-divider tone="default"></gh-divider><gh-divider tone="strong"></gh-divider></div>',
  }),
};
export const Vertical: Story = {
  args: { orientation: 'vertical', decorative: false, tone: 'strong' },
  render: (args) => ({
    props: args,
    template:
      '<div style="display: flex; align-items: stretch; gap: var(--gh-space-md); min-height: 8rem"><span>Before</span><gh-divider [orientation]="orientation" [style]="style" [tone]="tone" [decorative]="decorative"></gh-divider><span>After</span></div>',
  }),
};
