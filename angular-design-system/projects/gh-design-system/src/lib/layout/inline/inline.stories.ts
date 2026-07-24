import type { Meta, StoryObj } from '@storybook/angular';
import { GhInlineComponent } from 'gh-design-system';

const meta: Meta<GhInlineComponent> = {
  title: 'Layout/Inline',
  component: GhInlineComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal flow primitive with wrapping, alignment, and distribution controls.',
      },
    },
  },
  args: { gap: 'sm', align: 'center', justify: 'start', wrap: true, fullWidth: true },
  argTypes: {
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'baseline', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-inline [gap]="gap" [align]="align" [justify]="justify" [wrap]="wrap" [fullWidth]="fullWidth"><span class="gh-story-layout-item">First</span><span class="gh-story-layout-item">Second item</span><span class="gh-story-layout-item">Third</span></gh-inline>',
  }),
};

export default meta;
type Story = StoryObj<GhInlineComponent>;

export const Playground: Story = {};
export const SpaceBetween: Story = { args: { justify: 'between' } };
export const Baseline: Story = { args: { align: 'baseline' } };
export const NoWrap: Story = { args: { wrap: false } };
export const Wrap: Story = { args: { wrap: true } };
export const Actions: Story = {
  render: () => ({
    template:
      '<gh-inline gap="sm"><button type="button">Save</button><button type="button">Cancel</button><a href="#preview">Preview</a></gh-inline>',
  }),
};
export const Metadata: Story = {
  render: () => ({
    template:
      '<gh-inline gap="sm"><span>May 16, 2026</span><span aria-hidden="true">·</span><span>7 min read</span><span aria-hidden="true">·</span><span>Accessibility</span></gh-inline>',
  }),
};
export const EndAligned: Story = { args: { align: 'end', justify: 'end' } };
