import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  GhAmbientBackgroundComponent,
  GhButtonComponent,
  GhCardComponent,
  GhIconButtonComponent,
  GhSurfaceComponent,
} from 'gh-design-system';

const meta: Meta<GhCardComponent> = {
  title: 'Components/Cards/Card',
  component: GhCardComponent,
  tags: ['autodocs', 'pr26-cards'],
  decorators: [
    moduleMetadata({
      imports: [
        GhAmbientBackgroundComponent,
        GhButtonComponent,
        GhIconButtonComponent,
        GhSurfaceComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The existing compositional Card, migrated to component-level Liquid Glass tokens without changing its public API or projected slots. Outlined is the safe Solid default; Subtle maps to Glass Subtle, Glass to Glass, and Elevated to Glass Elevated. Interactive and selected are visual states only: native links, buttons, radios or checkboxes retain semantics.',
      },
    },
  },
  args: {
    variant: 'outlined',
    padding: 'md',
    radius: 'lg',
    interactive: false,
    selected: false,
    fullHeight: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated', 'subtle', 'glass'],
      description:
        'Selects the existing intent, mapped internally to the approved Surface material.',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Uses the closed Card spacing scale.',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Uses the existing Card radius scale.',
    },
    interactive: {
      control: 'boolean',
      description: 'Adds visual hover, active and focus-within feedback without control semantics.',
    },
    selected: {
      control: 'boolean',
      description: 'Adds a non-color visual indicator; the consumer owns selection semantics.',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Allows equal-height layout composition without imposing a fixed height.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Optional accessible label for the Card article landmark.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-card
        [variant]="variant"
        [padding]="padding"
        [radius]="radius"
        [interactive]="interactive"
        [selected]="selected"
        [fullHeight]="fullHeight"
        [ariaLabel]="ariaLabel"
      >
        <div ghCardHeader class="gh-card-story-content">
          <span class="gh-card-story-eyebrow">Architecture</span>
          <h3>Composable Card</h3>
        </div>
        <div ghCardContent class="gh-card-story-content">
          <p>Projected content inherits a semantic material and token-driven spacing.</p>
        </div>
        <div ghCardFooter class="gh-card-story-actions">
          <gh-button variant="secondary" size="sm">Review details</gh-button>
        </div>
      </gh-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhCardComponent>;

export const Playground: Story = {};
export const Default: Story = {};
export const Solid: Story = { args: { variant: 'outlined' } };
export const GlassSubtle: Story = { args: { variant: 'subtle' } };
export const Glass: Story = { args: { variant: 'glass' } };
export const Elevated: Story = { args: { variant: 'elevated' } };

export const MaterialHierarchy: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-card-story-stage" preset="brand">
        <div class="gh-card-story-grid">
          <gh-card variant="outlined" fullHeight><strong>Outlined · Solid</strong><p>Dense and predictable.</p></gh-card>
          <gh-card variant="subtle" fullHeight><strong>Subtle · Glass Subtle</strong><p>Secondary editorial grouping.</p></gh-card>
          <gh-card variant="glass" fullHeight><strong>Glass · Glass</strong><p>Feature-level emphasis.</p></gh-card>
          <gh-card variant="elevated" fullHeight><strong>Elevated · Glass Elevated</strong><p>Highest Card depth.</p></gh-card>
        </div>
      </gh-ambient-background>
    `,
  }),
};

export const Interactive: Story = {
  args: { interactive: true, variant: 'subtle' },
  render: (args) => ({
    props: args,
    template: `
      <gh-card [variant]="variant" [interactive]="interactive">
        <div ghCardHeader><h3>Native navigation</h3></div>
        <div ghCardContent><p>Tab to the link; Card only supplies complementary focus-within feedback.</p></div>
        <div ghCardFooter><a class="gh-card-story-link" href="#card-story-target">View details</a></div>
      </gh-card>
      <span id="card-story-target" class="gh-card-story-target">Card story destination</span>
    `,
  }),
};

export const Selected: Story = {
  args: { interactive: true, selected: true, variant: 'glass' },
  render: (args) => ({
    props: args,
    template: `
      <gh-card [variant]="variant" [interactive]="interactive" [selected]="selected">
        <label class="gh-card-story-selection gh-radio">
          <input class="gh-radio__control" type="radio" name="card-story-plan" checked />
          <span><strong>Selected plan</strong><br />The native radio owns selection semantics.</span>
        </label>
      </gh-card>
    `,
  }),
};

export const PaddingVariations: Story = {
  render: () => ({
    template: `
      <div class="gh-card-story-grid">
        <gh-card padding="none"><div class="gh-card-story-manual-padding">None</div></gh-card>
        <gh-card padding="sm">Small</gh-card>
        <gh-card padding="md">Medium</gh-card>
        <gh-card padding="lg">Large</gh-card>
      </div>
    `,
  }),
};

export const RadiusVariations: Story = {
  render: () => ({
    template: `
      <div class="gh-card-story-grid">
        <gh-card radius="sm">Small</gh-card>
        <gh-card radius="md">Medium</gh-card>
        <gh-card radius="lg">Large</gh-card>
        <gh-card radius="xl">Extra large</gh-card>
      </div>
    `,
  }),
};

export const HeaderTitleAndSubtitle: Story = {
  render: () => ({
    template: `
      <gh-card variant="subtle">
        <div ghCardHeader class="gh-card-story-content">
          <span class="gh-card-story-eyebrow">Header slot</span>
          <h3>Title controlled by the consumer</h3>
          <p>Subtitle and metadata wrap naturally without a fixed height.</p>
        </div>
        <div ghCardContent><p>The content slot follows in logical DOM order.</p></div>
      </gh-card>
    `,
  }),
};

export const FooterAndActions: Story = {
  render: () => ({
    template: `
      <gh-card variant="elevated">
        <div ghCardHeader><h3>Actions use migrated controls</h3></div>
        <div ghCardContent><p>The Card does not reproduce Button or Icon Button styling.</p></div>
        <div ghCardFooter class="gh-card-story-actions">
          <gh-button size="sm">Continue</gh-button>
          <gh-button variant="secondary" size="sm">Save draft</gh-button>
          <gh-icon-button size="sm" aria-label="More Card actions"><span aria-hidden="true">•••</span></gh-icon-button>
        </div>
      </gh-card>
    `,
  }),
};

export const WithMedia: Story = {
  render: () => ({
    template: `
      <gh-card padding="none" variant="subtle">
        <img class="gh-card-story-media" ghCardMedia src="/cards/project-design-system.svg" alt="Abstract pastel shapes representing a design system" />
        <div ghCardContent class="gh-card-story-media-body"><h3>Media Card composition</h3><p>Only the media region clips; content and focus remain visible.</p></div>
      </gh-card>
    `,
  }),
};

export const LeadingIconOrAvatar: Story = {
  render: () => ({
    template: `
      <gh-card variant="subtle">
        <div ghCardHeader class="gh-card-story-heading-row">
          <span class="gh-card-story-avatar" aria-hidden="true">GH</span>
          <div><h3>Frontend leadership</h3><p>Decorative monogram with consumer-owned heading.</p></div>
        </div>
      </gh-card>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    template: `
      <gh-card variant="outlined"><h3>Resilient content</h3><p>Cards support longer explanations without clipping, truncation, fixed heights, or dependence on a particular viewport. This paragraph intentionally wraps across several lines so responsive growth and a 200% zoom remain testable.</p><p>Dense reading content stays on the Solid mapping.</p></gh-card>
    `,
  }),
};

export const ListContent: Story = {
  render: () => ({
    template: `
      <gh-card variant="outlined"><h3>Review checklist</h3><ul><li>Semantic controls remain native.</li><li>Media reserves stable space.</li><li>Content grows without truncation.</li></ul></gh-card>
    `,
  }),
};

export const FormContent: Story = {
  render: () => ({
    template: `
      <gh-card variant="outlined">
        <form class="gh-card-story-form" (submit)="$event.preventDefault()">
          <h3>Dense form content stays Solid</h3>
          <label class="gh-form-field__label" for="card-story-email">Email</label>
          <input class="gh-input" id="card-story-email" type="email" autocomplete="email" />
          <gh-button type="submit">Continue</gh-button>
        </form>
      </gh-card>
    `,
  }),
};

export const CompactComposition: Story = {
  args: { padding: 'sm', radius: 'md', variant: 'subtle' },
};

export const FeatureComposition: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-card-story-stage" preset="cool">
        <gh-card variant="glass" padding="lg">
          <div ghCardHeader><span class="gh-card-story-eyebrow">Featured</span><h2>Design systems as product infrastructure</h2></div>
          <div ghCardContent><p>Glass is reserved for concise, high-level emphasis over a meaningful ambient context.</p></div>
          <div ghCardFooter><gh-button>Read feature</gh-button></div>
        </gh-card>
      </gh-ambient-background>
    `,
  }),
};

export const StatComposition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Stat Card is a documented composition of the existing base Card; no additional public component was introduced.',
      },
    },
  },
  render: () => ({
    template: `
      <gh-card variant="subtle">
        <div ghCardHeader><span class="gh-card-story-eyebrow">Delivery health</span></div>
        <div ghCardContent class="gh-card-story-stat"><strong>98%</strong><span>successful builds</span></div>
        <div ghCardFooter><span>Last 30 days</span></div>
      </gh-card>
    `,
  }),
};

export const LightTheme: Story = { args: { variant: 'glass' }, globals: { theme: 'light' } };
export const DarkTheme: Story = {
  args: { variant: 'glass', padding: 'lg' },
  globals: { theme: 'dark' },
};

export const AmbientBrandBackground: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-card-story-stage" preset="brand">
        <div class="gh-card-story-grid"><gh-card variant="subtle"><h3>Glass Subtle</h3><p>Editorial grouping.</p></gh-card><gh-card variant="glass"><h3>Glass</h3><p>Feature emphasis.</p></gh-card></div>
      </gh-ambient-background>
    `,
  }),
};

export const AmbientCoolBackground: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-card-story-stage" preset="cool">
        <gh-card variant="elevated"><h3>Elevated summary</h3><p>Controlled depth over a cool ambient environment.</p></gh-card>
      </gh-ambient-background>
    `,
  }),
};

export const SolidBackground: Story = {
  render: () => ({
    template:
      '<div class="gh-story-surface"><gh-card variant="outlined"><h3>Solid on solid</h3><p>Border and hierarchy remain visible without translucency.</p></gh-card></div>',
  }),
};

export const NestedSolidSurface: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-card-story-stage" preset="brand">
        <gh-card variant="glass" padding="lg">
          <h3>One filtered Card</h3>
          <p>Dense nested content uses a Solid Surface instead of nested Glass.</p>
          <gh-surface variant="solid" padding="sm" radius="small"><strong>Predictable nested content</strong></gh-surface>
        </gh-card>
      </gh-ambient-background>
    `,
  }),
};

export const Responsive320: Story = {
  args: { variant: 'glass', padding: 'md' },
  parameters: { viewport: { defaultViewport: 'mobile320' } },
};

export const LongEnglishAndSpanish: Story = {
  render: () => ({
    template: `
      <div class="gh-card-story-grid">
        <gh-card variant="subtle"><h3>Maintainable application architecture</h3><p>Long English content wraps without hiding important information or reducing type size.</p></gh-card>
        <gh-card variant="subtle"><h3>Arquitectura de aplicaciones mantenible y accesible</h3><p>El contenido extenso en español crece de forma natural y mantiene el orden de lectura.</p></gh-card>
      </div>
    `,
  }),
};

export const ReducedMotionAndForcedColors: Story = {
  args: { variant: 'glass', interactive: true, selected: true },
  parameters: {
    docs: {
      description: {
        story:
          'Use browser emulation to verify both preferences. Reduced motion removes transforms and transitions while preserving states; forced colors removes Glass decoration and preserves selected and focus indicators with system colors.',
      },
    },
  },
};
