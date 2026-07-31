import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GH_SURFACE_PADDINGS,
  GH_SURFACE_RADII,
  GH_SURFACE_VARIANTS,
  GhButtonComponent,
  GhDividerComponent,
  GhGlassPanelComponent,
  GhSurfaceComponent,
} from 'gh-design-system';

const meta: Meta<GhSurfaceComponent> = {
  title: 'Foundations/Surface',
  component: GhSurfaceComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [GhButtonComponent, GhDividerComponent, GhGlassPanelComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Semantically neutral material primitive. Solid is the safe default; glass variants use one centralized opaque fallback and a composed backdrop-filter token. Interactive adds visual states only, so actions still require a native link or button. Avoid nested glass and large or repeated filtered regions.',
      },
    },
  },
  args: {
    variant: 'solid',
    padding: 'md',
    radius: 'default',
    interactive: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: GH_SURFACE_VARIANTS,
      description: 'Controls the semantic material and its approved visual depth.',
    },
    padding: {
      control: 'select',
      options: GH_SURFACE_PADDINGS,
      description: 'Applies a closed spacing-token value to the host.',
    },
    radius: {
      control: 'select',
      options: GH_SURFACE_RADII,
      description: 'Applies a bounded semantic radius independent from material depth.',
    },
    interactive: {
      control: 'boolean',
      description: 'Adds visual states but does not provide button or link semantics.',
    },
    disabled: {
      control: 'boolean',
      description: 'Adds a visual disabled state; projected controls must disable themselves.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="gh-surface-story-stage">
        <gh-surface
          [variant]="variant"
          [padding]="padding"
          [radius]="radius"
          [interactive]="interactive"
          [disabled]="disabled"
        >
          <h3>Surface playground</h3>
          <p>Projected content keeps its own structure and semantics.</p>
        </gh-surface>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhSurfaceComponent>;

export const Playground: Story = {};

export const MaterialScale: Story = {
  render: () => ({
    template: `
      <div class="gh-surface-story-stage">
        <div class="gh-surface-story-grid">
          @for (variant of ['solid', 'glass-subtle', 'glass', 'glass-elevated', 'glass-floating']; track variant) {
            <gh-surface [variant]="$any(variant)" padding="lg">
              <strong>{{ variant }}</strong>
              <p>One semantic material contract with an opaque fallback.</p>
            </gh-surface>
          }
        </div>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: { variant: 'glass-elevated', padding: 'lg' },
  globals: { theme: 'dark' },
};

export const PaddingScale: Story = {
  render: () => ({
    template: `
      <div class="gh-surface-story-grid">
        @for (padding of ['none', 'xs', 'sm', 'md', 'lg', 'xl']; track padding) {
          <gh-surface [padding]="$any(padding)" variant="glass-subtle">
            <span>padding={{ padding }}</span>
          </gh-surface>
        }
      </div>
    `,
  }),
};

export const RadiusScale: Story = {
  render: () => ({
    template: `
      <div class="gh-surface-story-stage">
        <div class="gh-surface-story-grid">
          @for (radius of ['none', 'small', 'default', 'large']; track radius) {
            <gh-surface [radius]="$any(radius)" variant="glass" padding="lg">
              <span>radius={{ radius }}</span>
            </gh-surface>
          }
        </div>
      </div>
    `,
  }),
};

export const InteractionAndDisabled: Story = {
  render: () => ({
    template: `
      <div class="gh-surface-story-stage">
        <div class="gh-surface-story-grid">
          <gh-surface variant="glass" interactive>
            <h3>Native navigation</h3>
            <p>Tab to the link to reveal the Surface focus-within treatment.</p>
            <a class="gh-surface-story-link" href="#surface-story-target">View destination</a>
          </gh-surface>

          <gh-surface variant="glass" interactive disabled>
            <h3>Visually disabled</h3>
            <p>The projected control also owns a real disabled state.</p>
            <gh-button disabled>Unavailable action</gh-button>
          </gh-surface>
        </div>
      </div>
      <span id="surface-story-target" class="gh-surface-story-target">Destination</span>
    `,
  }),
};

export const RecommendedComposition: Story = {
  render: () => ({
    template: `
      <div class="gh-surface-story-stage">
        <gh-glass-panel variant="glass-elevated" padding="lg" radius="large">
          <h3>One filtered parent</h3>
          <p>Use a solid child instead of stacking another filtered material.</p>
          <gh-divider />
          <gh-surface variant="solid" padding="sm" radius="small">
            <strong>Solid nested content</strong>
          </gh-surface>
        </gh-glass-panel>
      </div>
    `,
  }),
};

export const SolidFallback: Story = {
  args: { variant: 'solid', padding: 'lg' },
  parameters: {
    docs: {
      description: {
        story:
          'Solid never uses backdrop-filter. Glass variants paint their material-specific opaque fallback before CSS feature detection enhances supported browsers.',
      },
    },
  },
};

export const Mobile320: Story = {
  args: { variant: 'glass', padding: 'md' },
  parameters: { viewport: { defaultViewport: 'mobile320' } },
};
