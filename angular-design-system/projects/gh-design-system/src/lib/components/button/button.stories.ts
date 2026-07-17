import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent } from 'storybook/test';
import {
  GhButtonComponent,
  type GhButtonSize,
  type GhButtonType,
  type GhButtonVariant,
} from 'gh-design-system';

interface ButtonStoryArgs {
  readonly variant: GhButtonVariant;
  readonly size: GhButtonSize;
  readonly type: GhButtonType;
  readonly disabled: boolean;
  readonly loading: boolean;
  readonly fullWidth: boolean;
  readonly onClick: () => void;
}

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: GhButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action control with semantic variants, three sizes, loading and disabled states, and icon projection slots.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    onClick: { table: { disable: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-button
        [variant]="variant"
        [size]="size"
        [type]="type"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        (click)="onClick()"
      >
        Continue
      </gh-button>
    `,
  }),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const Interactive: Story = {
  args: { onClick: fn() },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Continue' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md); align-items: center">
        <gh-button variant="primary">Primary</gh-button>
        <gh-button variant="secondary">Secondary</gh-button>
        <gh-button variant="ghost">Ghost</gh-button>
        <gh-button variant="danger">Danger</gh-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md); align-items: center">
        <gh-button size="sm">Small</gh-button>
        <gh-button size="md">Medium</gh-button>
        <gh-button size="lg">Large</gh-button>
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: { loading: true, onClick: fn() },
  render: (args) => ({
    props: args,
    template:
      '<gh-button loading aria-label="Loading action" (click)="onClick()">Continue</gh-button>',
  }),
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Loading action' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Continue' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md)">
        <gh-button><span ghButtonIconStart aria-hidden="true">←</span> Previous</gh-button>
        <gh-button variant="secondary">Next <span ghButtonIconEnd aria-hidden="true">→</span></gh-button>
        <gh-button variant="ghost" aria-label="Add item"><span aria-hidden="true">＋</span></gh-button>
      </div>
    `,
  }),
};

export const WithStartIcon: Story = {
  render: () => ({
    template: '<gh-button><span ghButtonIconStart aria-hidden="true">←</span> Previous</gh-button>',
  }),
};

export const WithEndIcon: Story = {
  render: () => ({
    template:
      '<gh-button variant="secondary">Next <span ghButtonIconEnd aria-hidden="true">→</span></gh-button>',
  }),
};

export const IconOnly: Story = {
  render: () => ({
    template:
      '<gh-button variant="ghost" aria-label="Add project"><span aria-hidden="true">＋</span></gh-button>',
  }),
};

export const InsideForm: Story = {
  render: () => ({
    template: `
      <form (submit)="$event.preventDefault()" class="gh-story-surface">
        <p>Submit keeps native form semantics.</p>
        <gh-button type="submit">Submit form</gh-button>
      </form>
    `,
  }),
};

export const LongLabel: Story = {
  render: () => ({
    template: '<gh-button>Save changes and continue to the next configuration step</gh-button>',
  }),
};

export const DarkTheme: Story = { globals: { theme: 'dark' } };
