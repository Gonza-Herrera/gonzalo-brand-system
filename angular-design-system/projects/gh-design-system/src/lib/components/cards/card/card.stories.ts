import type { Meta, StoryObj } from '@storybook/angular';
import { GhCardComponent } from 'gh-design-system';

const meta: Meta<GhCardComponent> = {
  title: 'Components/Cards/Card',
  component: GhCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'General-purpose surface primitive for projected content.' },
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
    variant: { control: 'select', options: ['outlined', 'elevated', 'subtle', 'glass'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-card [variant]="variant" [padding]="padding" [radius]="radius" [interactive]="interactive" [selected]="selected" [fullHeight]="fullHeight" [ariaLabel]="ariaLabel">
        <h3 style="margin-top: 0">Composable card</h3>
        <p style="color: var(--gh-text-secondary); margin-bottom: 0">Projected content inherits the card's semantic surface and spacing.</p>
      </gh-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhCardComponent>;

export const Playground: Story = {};
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Elevated: Story = { args: { variant: 'elevated' } };
export const Subtle: Story = { args: { variant: 'subtle' } };
export const Glass: Story = { args: { variant: 'glass' }, globals: { theme: 'dark' } };

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="gh-story-swatch-grid">
        <gh-card variant="outlined"><strong>Outlined</strong></gh-card>
        <gh-card variant="elevated"><strong>Elevated</strong></gh-card>
        <gh-card variant="subtle"><strong>Subtle</strong></gh-card>
        <gh-card variant="glass"><strong>Glass</strong></gh-card>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: { interactive: true, ariaLabel: 'Interactive card example' },
};
export const Selected: Story = {
  args: { interactive: true, selected: true, ariaLabel: 'Selected card example' },
};
export const NoPadding: Story = { args: { padding: 'none' } };
export const FullHeight: Story = { args: { fullHeight: true } };

export const PaddingVariations: Story = {
  render: () => ({
    template: `
      <div class="gh-story-swatch-grid">
        <gh-card padding="none"><div style="padding: var(--gh-space-sm)">None</div></gh-card>
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
      <div class="gh-story-swatch-grid">
        <gh-card radius="sm">Small</gh-card>
        <gh-card radius="md">Medium</gh-card>
        <gh-card radius="lg">Large</gh-card>
        <gh-card radius="xl">Extra large</gh-card>
      </div>
    `,
  }),
};

export const HeaderContentAndFooter: Story = {
  render: () => ({
    template: `
      <gh-card variant="elevated">
        <div ghCardHeader><p style="color: var(--gh-text-accent); margin-top: 0">Header slot</p><h3>Card anatomy</h3></div>
        <div ghCardContent><p>Content slot holds the primary explanation.</p></div>
        <div ghCardFooter><a href="#details">Footer action</a></div>
      </gh-card>
    `,
  }),
};

export const WithMedia: Story = {
  render: () => ({
    template: `
      <gh-card padding="none">
        <img ghCardMedia src="/cards/project-design-system.svg" alt="Abstract pastel shapes representing a design system" style="display: block; inline-size: 100%" />
        <div ghCardContent style="padding: var(--gh-space-lg)"><h3>Media card</h3><p>Assets are reused from the Showcase public directory.</p></div>
      </gh-card>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    template: `
      <gh-card><h3>Resilient content</h3><p>Cards must support longer explanations without clipping, forcing fixed heights, or relying on a particular page context. This example intentionally spans multiple lines to reveal spacing and reading-width behavior.</p></gh-card>
    `,
  }),
};
