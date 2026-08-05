import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, fn, userEvent } from 'storybook/test';
import {
  GhButtonComponent,
  GhAmbientBackgroundComponent,
  GhSurfaceComponent,
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
}

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: GhButtonComponent,
  tags: ['autodocs', 'pr25-buttons'],
  decorators: [
    moduleMetadata({
      imports: [GhAmbientBackgroundComponent, GhButtonComponent, GhSurfaceComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Native action control migrated to component-level Liquid Glass tokens. Primary and Danger remain solid, Secondary uses bounded glass with a solid fallback, and Tertiary/Ghost avoid blur. Loading, disabled, focus, reduced motion and forced colors preserve semantic behavior.',
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
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Selects action intent and hierarchy; Liquid Glass is not a public variant.',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
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
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const Interactive: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Continue' });
    const onClick = fn();
    button.addEventListener('click', onClick);
    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalledTimes(1);
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md); align-items: center">
        <gh-button variant="primary">Primary</gh-button>
        <gh-button variant="secondary">Secondary</gh-button>
        <gh-button variant="tertiary">Tertiary</gh-button>
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
  args: { loading: true },
  render: () => ({
    template: '<gh-button loading aria-label="Loading action">Continue</gh-button>',
  }),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Loading action' });
    const onClick = fn();
    button.addEventListener('click', onClick);
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Continue' });
    const onClick = fn();
    button.addEventListener('click', onClick);
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(onClick).not.toHaveBeenCalled();
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
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md)">
        <gh-button>Save changes and continue to the next configuration step</gh-button>
        <gh-button variant="secondary">Guardar cambios y continuar al siguiente paso de configuración</gh-button>
      </div>
    `,
  }),
};

export const LightTheme: Story = { globals: { theme: 'light' } };
export const DarkTheme: Story = { globals: { theme: 'dark' } };

export const AmbientBrandBackground: Story = {
  render: () => ({
    template: `
      <gh-ambient-background preset="brand" intensity="default" style="display: block; padding: var(--gh-space-xl); border-radius: var(--gh-radius-xl)">
        <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-md)">
          <gh-button>Primary action</gh-button>
          <gh-button variant="secondary">Secondary action</gh-button>
          <gh-button variant="tertiary">Tertiary action</gh-button>
          <gh-button variant="ghost">Ghost action</gh-button>
          <gh-button variant="danger">Danger action</gh-button>
        </div>
      </gh-ambient-background>
    `,
  }),
};

export const SurfaceContexts: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--gh-space-md); grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))">
        <gh-surface variant="solid" padding="lg">
          <p>Solid Surface</p>
          <gh-button>Continue</gh-button>
          <gh-button variant="secondary">Review</gh-button>
        </gh-surface>
        <gh-surface variant="glass" padding="lg">
          <p>Glass Surface</p>
          <gh-button>Continue</gh-button>
          <gh-button variant="secondary">Review</gh-button>
        </gh-surface>
        <gh-surface variant="glass-elevated" padding="lg">
          <p>Glass Elevated</p>
          <gh-button>Continue</gh-button>
          <gh-button variant="ghost">Dismiss</gh-button>
        </gh-surface>
      </div>
    `,
  }),
};
