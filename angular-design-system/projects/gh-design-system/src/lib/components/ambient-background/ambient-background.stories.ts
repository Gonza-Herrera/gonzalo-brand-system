import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GH_AMBIENT_INTENSITIES,
  GH_AMBIENT_PRESETS,
  GhAmbientBackgroundComponent,
  GhButtonComponent,
  GhContainerComponent,
  GhGlassPanelComponent,
  GhHeroComponent,
  GhHeroVisualDirective,
  type GhNavigationItem,
  GhNavigationComponent,
  GhSectionComponent,
  GhSurfaceComponent,
  GhTagComponent,
} from 'gh-design-system';

const meta: Meta<GhAmbientBackgroundComponent> = {
  title: 'Foundations/Ambient Backgrounds',
  component: GhAmbientBackgroundComponent,
  tags: ['autodocs', 'pr24-ambient'],
  decorators: [
    moduleMetadata({
      imports: [
        GhButtonComponent,
        GhContainerComponent,
        GhGlassPanelComponent,
        GhHeroComponent,
        GhHeroVisualDirective,
        GhNavigationComponent,
        GhSectionComponent,
        GhSurfaceComponent,
        GhTagComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Static, token-driven environmental context for solid and glass surfaces. One decorative layer remains aria-hidden and pointer-inert; projected content keeps normal semantics. Presets—not low-level colors, blur or coordinates—own composition. Forced colors removes ambience, and SSR, theme and viewport changes keep identical DOM.',
      },
    },
  },
  args: {
    preset: 'subtle',
    intensity: 'default',
  },
  argTypes: {
    preset: {
      control: 'select',
      options: GH_AMBIENT_PRESETS,
      description: 'Selects one approved environmental color composition.',
    },
    intensity: {
      control: 'select',
      options: GH_AMBIENT_INTENSITIES,
      description: 'Maps to a bounded semantic opacity scale.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-ambient-background
        class="gh-ambient-story-stage"
        [preset]="preset"
        [intensity]="intensity"
      >
        <gh-surface variant="glass" padding="lg" radius="large">
          <div class="gh-ambient-story-content">
            <gh-tag variant="accent">Liquid Glass</gh-tag>
            <h2>Calm context, legible content</h2>
            <p>The ambient layer supports hierarchy without becoming the subject.</p>
            <gh-button>Explore foundations</gh-button>
          </div>
        </gh-surface>
      </gh-ambient-background>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhAmbientBackgroundComponent>;

const floatingNavigationItems = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const satisfies readonly GhNavigationItem[];

const renderFloatingLayout =
  (eyebrow: string, preset: 'brand' | 'cool' | 'warm' = 'brand') =>
  () => ({
    props: {
      eyebrow,
      preset,
      items: floatingNavigationItems,
      actions: [
        { label: 'Explore work', href: '#work', variant: 'primary' },
        { label: 'About', href: '#about', variant: 'secondary' },
      ],
    },
    template: `
      <gh-ambient-background
        class="gh-floating-layout-story"
        [preset]="$any(preset)"
        intensity="default"
      >
        <gh-navigation
          brand="Gonzalo Herrera"
          brandHref="#home"
          [items]="items"
          navigationLabel="Portfolio"
          menuLabel="Open menu"
          closeMenuLabel="Close menu"
          menuId="storybook-floating-layout-menu"
          [sticky]="false"
        />

        <main class="gh-floating-layout-story__main">
          <gh-hero
            [eyebrow]="eyebrow"
            title="One canvas from the viewport edge to the first section."
            description="Ambient Background belongs to Layout; Header floats above it and Hero only arranges content."
            [actions]="actions"
            layout="split"
            surface="gradient"
            [headingLevel]="1"
          >
            <aside
              ghHeroVisual
              class="gh-floating-layout-story__visual"
              aria-label="Layout hierarchy"
            >
              <strong>Continuous depth</strong>
              <span>Ambient → Header → Main → Hero</span>
            </aside>
          </gh-hero>

          <gh-section spacing="md" surface="transparent">
            <gh-container size="wide">
              <p class="gh-floating-layout-story__continuation">
                The first section stays on the same environmental plane.
              </p>
            </gh-container>
          </gh-section>
        </main>
      </gh-ambient-background>
    `,
  });

export const Playground: Story = {};

export const Presets: Story = {
  render: () => ({
    template: `
      <div class="gh-ambient-story-grid">
        @for (preset of ['none', 'subtle', 'brand', 'cool', 'warm']; track preset) {
          <gh-ambient-background
            class="gh-ambient-story-stage gh-ambient-story-stage--compact"
            [preset]="$any(preset)"
          >
            <gh-surface variant="glass-subtle" padding="md">
              <strong>{{ preset }}</strong>
              <p>Controlled environmental context.</p>
            </gh-surface>
          </gh-ambient-background>
        }
      </div>
    `,
  }),
};

export const Intensities: Story = {
  render: () => ({
    template: `
      <div class="gh-ambient-story-grid">
        @for (intensity of ['subtle', 'default', 'strong']; track intensity) {
          <gh-ambient-background
            class="gh-ambient-story-stage gh-ambient-story-stage--compact"
            preset="brand"
            [intensity]="$any(intensity)"
          >
            <gh-surface variant="glass" padding="md">
              <strong>{{ intensity }}</strong>
            </gh-surface>
          </gh-ambient-background>
        }
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: { preset: 'cool', intensity: 'default' },
  globals: { theme: 'dark' },
};

export const SurfaceCombinations: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-ambient-story-stage" preset="brand">
        <div class="gh-ambient-story-grid">
          @for (variant of ['solid', 'glass-subtle', 'glass', 'glass-elevated']; track variant) {
            <gh-surface [variant]="$any(variant)" padding="md">
              <strong>{{ variant }}</strong>
              <p>Use solid for dense content or uncertain contrast.</p>
            </gh-surface>
          }
        </div>
      </gh-ambient-background>
    `,
  }),
};

export const GlassPanelAndFormContent: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-ambient-story-stage" preset="warm" intensity="subtle">
        <gh-glass-panel variant="glass-elevated" padding="lg" radius="large">
          <form class="gh-ambient-story-content gh-ambient-story-form">
            <h2>Contact</h2>
            <p>Forms remain real content; ambience stays decorative.</p>
            <label class="gh-form-field__label" for="ambient-story-email">Email</label>
            <input class="gh-input" id="ambient-story-email" type="email" autocomplete="email" />
            <gh-button type="button">Continue</gh-button>
          </form>
        </gh-glass-panel>
      </gh-ambient-background>
    `,
  }),
};

export const LongContent: Story = {
  args: { preset: 'subtle', intensity: 'subtle' },
  render: (args) => ({
    props: args,
    template: `
      <gh-ambient-background class="gh-ambient-story-stage" [preset]="preset" [intensity]="intensity">
        <gh-surface variant="solid" padding="lg">
          <div class="gh-ambient-story-content">
            <h2>Dense documentation remains solid</h2>
            <p>Ambient backgrounds establish broad context. Long-form and high-density content should use a solid reading surface whenever transparency could reduce clarity.</p>
            <p>This composition also verifies wrapping, vertical growth and projected content without a fixed component height.</p>
          </div>
        </gh-surface>
      </gh-ambient-background>
    `,
  }),
};

export const ReducedMotionAndForcedColors: Story = {
  args: { preset: 'brand', intensity: 'strong' },
  parameters: {
    docs: {
      description: {
        story:
          'The initial primitive is intentionally static. Reduced motion explicitly disables animation and transitions; forced-colors hides the decorative layer and paints Canvas/CanvasText. Use the browser emulation tools to verify each preference.',
      },
    },
  },
};

export const Mobile320: Story = {
  args: { preset: 'cool', intensity: 'default' },
  parameters: { viewport: { defaultViewport: 'mobile320' } },
};

export const FloatingLayout: Story = {
  tags: ['pr28-15-floating-layout'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The complete integration: one ambient owner contains the floating Header, transparent Main, Hero and first section.',
      },
    },
  },
  render: renderFloatingLayout('Floating Layout'),
};

export const AmbientLayout: Story = {
  tags: ['pr28-15-floating-layout'],
  parameters: { layout: 'fullscreen' },
  render: renderFloatingLayout('Ambient Layout', 'cool'),
};

export const HeaderIntegration: Story = {
  tags: ['pr28-15-floating-layout'],
  parameters: { layout: 'fullscreen' },
  render: renderFloatingLayout('Header Integration', 'warm'),
};

export const HeroIntegration: Story = {
  tags: ['pr28-15-floating-layout'],
  parameters: { layout: 'fullscreen' },
  render: renderFloatingLayout('Hero Integration'),
};
