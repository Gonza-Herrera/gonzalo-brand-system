import type { Meta, StoryObj } from '@storybook/angular';

const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A fluid type scale separates expressive display styles from highly readable body and interface text.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--gh-space-xl)">
        <div><code>--gh-font-size-hero</code><p style="font: var(--gh-font-weight-bold) var(--gh-font-size-hero) / var(--gh-line-height-tight) var(--gh-font-family-display); margin: var(--gh-space-sm) 0 0">Build thoughtful digital experiences.</p></div>
        <div><code>--gh-font-size-h1</code><h1 style="margin-block: var(--gh-space-sm) 0">Heading one</h1></div>
        <div><code>--gh-font-size-h2</code><h2 style="margin-block: var(--gh-space-sm) 0">Heading two</h2></div>
        <div><code>--gh-font-size-h3</code><h3 style="margin-block: var(--gh-space-sm) 0">Heading three</h3></div>
        <div><code>--gh-font-size-body-large</code><p style="font-size: var(--gh-font-size-body-large); margin-block: var(--gh-space-sm) 0">Large body text introduces a section without competing with its heading.</p></div>
        <div><code>--gh-font-size-body</code><p style="margin-block: var(--gh-space-sm) 0">Body text supports comfortable long-form reading and product explanations.</p></div>
        <div><code>--gh-font-size-label</code><p style="font-size: var(--gh-font-size-label); font-weight: var(--gh-font-weight-semibold); margin-block: var(--gh-space-sm) 0">Interface label</p></div>
        <div><code>--gh-font-size-caption</code><p style="font-size: var(--gh-font-size-caption); color: var(--gh-text-secondary); margin-block: var(--gh-space-sm) 0">Supporting caption</p></div>
      </div>
    `,
  }),
};

export const FamiliesAndWeights: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--gh-space-lg)">
        <p style="font-family: var(--gh-font-family-display); font-size: var(--gh-font-size-h2); margin: 0">Display family · Bold</p>
        <p style="font-family: var(--gh-font-family-body); font-size: var(--gh-font-size-body-large); font-weight: var(--gh-font-weight-regular); margin: 0">Body family · Regular</p>
        <p style="font-weight: var(--gh-font-weight-medium); margin: 0">Body family · Medium</p>
        <p style="font-weight: var(--gh-font-weight-semibold); margin: 0">Body family · Semibold</p>
        <p style="font-weight: var(--gh-font-weight-bold); margin: 0">Body family · Bold</p>
      </div>
    `,
  }),
};

export const Light: Story = { ...Scale, globals: { theme: 'light' } };
export const Dark: Story = { ...Scale, globals: { theme: 'dark' } };
