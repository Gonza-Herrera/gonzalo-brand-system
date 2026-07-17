import type { Meta, StoryObj } from '@storybook/angular';
import { GhBadgeComponent } from 'gh-design-system';

const meta: Meta<GhBadgeComponent> = {
  title: 'Components/Badge',
  component: GhBadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact, non-interactive status and metadata labels with semantic variants.',
      },
    },
  },
  args: { variant: 'neutral', size: 'md', appearance: 'soft', rounded: 'pill' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger', 'accent'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    appearance: { control: 'select', options: ['soft', 'solid'] },
    rounded: { control: 'select', options: ['default', 'pill'] },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-badge [variant]="variant" [size]="size" [appearance]="appearance" [rounded]="rounded">Status</gh-badge>',
  }),
};

export default meta;
type Story = StoryObj<GhBadgeComponent>;

export const Playground: Story = {};
export const Neutral: Story = { args: { variant: 'neutral' } };
export const Info: Story = { args: { variant: 'info' } };
export const Success: Story = { args: { variant: 'success' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Accent: Story = { args: { variant: 'accent' } };
export const Soft: Story = { args: { appearance: 'soft' } };
export const Solid: Story = { args: { appearance: 'solid', variant: 'info' } };
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm)">
        <gh-badge variant="neutral">Neutral</gh-badge>
        <gh-badge variant="info">Info</gh-badge>
        <gh-badge variant="success">Success</gh-badge>
        <gh-badge variant="warning">Warning</gh-badge>
        <gh-badge variant="danger">Danger</gh-badge>
        <gh-badge variant="accent">Accent</gh-badge>
      </div>
    `,
  }),
};

export const SolidAppearance: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm)">
        <gh-badge appearance="solid" variant="neutral">Neutral</gh-badge>
        <gh-badge appearance="solid" variant="info">Info</gh-badge>
        <gh-badge appearance="solid" variant="success">Success</gh-badge>
        <gh-badge appearance="solid" variant="warning">Warning</gh-badge>
        <gh-badge appearance="solid" variant="danger">Danger</gh-badge>
        <gh-badge appearance="solid" variant="accent">Accent</gh-badge>
      </div>
    `,
  }),
};

export const SizesAndShape: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm); align-items: center">
        <gh-badge size="sm">Small pill</gh-badge>
        <gh-badge size="md">Medium pill</gh-badge>
        <gh-badge rounded="default" variant="accent">Default radius</gh-badge>
      </div>
    `,
  }),
};

export const Numeric: Story = {
  render: () => ({
    template:
      '<gh-badge variant="info">12<span class="gh-visually-hidden"> unread items</span></gh-badge>',
  }),
};

export const WithIndicator: Story = {
  render: () => ({
    template:
      '<gh-badge variant="success"><span ghBadgeIconStart aria-hidden="true">●</span> Available</gh-badge>',
  }),
};

export const LongContent: Story = {
  render: () => ({
    template: '<gh-badge variant="accent">Architecture decision under review</gh-badge>',
  }),
};
