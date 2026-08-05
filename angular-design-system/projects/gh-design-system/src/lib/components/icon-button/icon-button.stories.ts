import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, fn, userEvent } from 'storybook/test';
import {
  GhAmbientBackgroundComponent,
  GhIconButtonComponent,
  GhSurfaceComponent,
  type GhIconButtonSize,
  type GhIconButtonVariant,
} from 'gh-design-system';

interface IconButtonStoryArgs {
  readonly variant: GhIconButtonVariant;
  readonly size: GhIconButtonSize;
  readonly disabled: boolean;
  readonly loading: boolean;
  readonly accessibleName: string;
}

const icon = `
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
`;

const meta: Meta<IconButtonStoryArgs> = {
  title: 'Components/Icon Button',
  component: GhIconButtonComponent,
  tags: ['autodocs', 'pr25-buttons'],
  decorators: [
    moduleMetadata({
      imports: [GhAmbientBackgroundComponent, GhIconButtonComponent, GhSurfaceComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Compact native button for icon-only actions. Consumers must provide an action-oriented aria-label or aria-labelledby; the icon itself stays decorative. Secondary is the safe default and the only filtered material.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    loading: false,
    accessibleName: 'Add project',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    accessibleName: { description: 'Required accessible action name for icon-only content.' },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-icon-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [aria-label]="accessibleName"
      >
        ${icon}
      </gh-icon-button>
    `,
  }),
};

export default meta;
type Story = StoryObj<IconButtonStoryArgs>;

export const Playground: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger', accessibleName: 'Delete project' } };
export const Loading: Story = { args: { loading: true, accessibleName: 'Save project' } };
export const Disabled: Story = { args: { disabled: true } };
export const LightTheme: Story = { globals: { theme: 'light' } };
export const DarkTheme: Story = { globals: { theme: 'dark' } };

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--gh-space-md); align-items: center">
        <gh-icon-button size="sm" aria-label="Add small item">${icon}</gh-icon-button>
        <gh-icon-button size="md" aria-label="Add medium item">${icon}</gh-icon-button>
        <gh-icon-button size="lg" aria-label="Add large item">${icon}</gh-icon-button>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--gh-space-md); align-items: center">
        <gh-icon-button variant="primary" aria-label="Create project">${icon}</gh-icon-button>
        <gh-icon-button variant="secondary" aria-label="Add project">${icon}</gh-icon-button>
        <gh-icon-button variant="ghost" aria-label="Add filter">${icon}</gh-icon-button>
        <gh-icon-button variant="danger" aria-label="Delete project">${icon}</gh-icon-button>
      </div>
    `,
  }),
};

export const AmbientBackground: Story = {
  render: () => ({
    template: `
      <gh-ambient-background preset="brand" intensity="default" style="display: block; padding: var(--gh-space-xl); border-radius: var(--gh-radius-xl)">
        <gh-surface variant="glass" padding="lg">
          <div style="display: flex; gap: var(--gh-space-md)">
            <gh-icon-button variant="secondary" aria-label="Add project">${icon}</gh-icon-button>
            <gh-icon-button variant="ghost" aria-label="Add filter">${icon}</gh-icon-button>
          </div>
        </gh-surface>
      </gh-ambient-background>
    `,
  }),
};

export const KeyboardActivation: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Add project' });
    const onClick = fn();
    button.addEventListener('click', onClick);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(onClick).toHaveBeenCalledTimes(1);
    await expect(button).toHaveAccessibleName('Add project');
  },
};
