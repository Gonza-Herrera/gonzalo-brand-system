import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent } from 'storybook/test';
import {
  GhTagComponent,
  type GhTagMode,
  type GhTagSize,
  type GhTagVariant,
} from 'gh-design-system';

interface TagStoryArgs {
  readonly mode: GhTagMode;
  readonly variant: GhTagVariant;
  readonly size: GhTagSize;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly ariaLabel?: string;
  readonly selectedChange: (selected: boolean) => void;
  readonly removed: () => void;
}

const meta: Meta<TagStoryArgs> = {
  title: 'Components/Tag',
  component: GhTagComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Static, selectable, or removable metadata with explicit keyboard and disabled behavior.',
      },
    },
  },
  args: {
    mode: 'static',
    variant: 'neutral',
    size: 'md',
    selected: false,
    disabled: false,
    selectedChange: fn(),
    removed: fn(),
  },
  argTypes: {
    mode: { control: 'select', options: ['static', 'selectable', 'removable'] },
    variant: { control: 'select', options: ['neutral', 'accent', 'info'] },
    size: { control: 'select', options: ['sm', 'md'] },
    selectedChange: { table: { disable: true } },
    removed: { table: { disable: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-tag
        [mode]="mode"
        [variant]="variant"
        [size]="size"
        [selected]="selected"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        (selectedChange)="selectedChange($event)"
        (removed)="removed()"
      >Angular</gh-tag>
    `,
  }),
};

export default meta;
type Story = StoryObj<TagStoryArgs>;

export const Playground: Story = {};
export const Static: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };

export const Selectable: Story = {
  args: { mode: 'selectable', ariaLabel: 'Select Angular', selectedChange: fn() },
  play: async ({ canvas, args }) => {
    const tag = canvas.getByRole('button', { name: 'Select Angular' });
    await expect(tag).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(tag);
    await expect(args.selectedChange).toHaveBeenCalledWith(true);
  },
};

export const Selected: Story = {
  args: { mode: 'selectable', selected: true, ariaLabel: 'Select Angular' },
};

export const Removable: Story = {
  args: { mode: 'removable', ariaLabel: 'Remove Angular', removed: fn() },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Angular' }));
    await expect(args.removed).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: { mode: 'selectable', disabled: true, ariaLabel: 'Select Angular', selectedChange: fn() },
  play: async ({ canvas, args }) => {
    const tag = canvas.getByRole('button', { name: 'Select Angular' });
    await expect(tag).toBeDisabled();
    await userEvent.click(tag);
    await expect(args.selectedChange).not.toHaveBeenCalled();
  },
};

export const VariantsAndSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm); align-items: center">
        <gh-tag size="sm">Small</gh-tag>
        <gh-tag variant="neutral">Neutral</gh-tag>
        <gh-tag variant="accent">Accent</gh-tag>
        <gh-tag variant="info">Info</gh-tag>
      </div>
    `,
  }),
};

export const ManyTags: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm)">
        @for (tag of ['Angular', 'TypeScript', 'Signals', 'RxJS', 'Sass', 'Storybook', 'Accessibility', 'Architecture']; track tag) {
          <gh-tag>{{ tag }}</gh-tag>
        }
      </div>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    template:
      '<gh-tag variant="accent">Frontend architecture and design-system governance</gh-tag>',
  }),
};
