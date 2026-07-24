import type { Meta, StoryObj } from '@storybook/angular';
import { GhSectionComponent } from 'gh-design-system';

const meta: Meta<GhSectionComponent> = {
  title: 'Layout/Section',
  component: GhSectionComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vertical page region with semantic surfaces and responsive spacing.',
      },
    },
  },
  args: { spacing: 'md', surface: 'transparent', fullHeight: false },
  argTypes: {
    spacing: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    surface: {
      control: 'select',
      options: ['transparent', 'primary', 'secondary', 'subtle', 'accent'],
    },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-section [spacing]="spacing" [surface]="surface" [fullHeight]="fullHeight"><div class="gh-story-frame"><h2>Section content</h2><p>Spacing and surfaces adapt through design tokens.</p></div></gh-section>',
  }),
};

export default meta;
type Story = StoryObj<GhSectionComponent>;

export const Playground: Story = {};
export const Surfaces: Story = {
  render: () => ({
    template: `
      <gh-section spacing="sm" surface="primary"><strong>Primary</strong></gh-section>
      <gh-section spacing="sm" surface="secondary"><strong>Secondary</strong></gh-section>
      <gh-section spacing="sm" surface="subtle"><strong>Subtle</strong></gh-section>
      <gh-section spacing="sm" surface="accent"><strong>Accent</strong></gh-section>
    `,
  }),
};
export const Spacings: Story = {
  render: () => ({
    template: `
      <gh-section spacing="none" surface="subtle"><strong>None</strong></gh-section>
      <gh-section spacing="sm"><strong>Small</strong></gh-section>
      <gh-section spacing="md" surface="subtle"><strong>Medium</strong></gh-section>
      <gh-section spacing="lg"><strong>Large</strong></gh-section>
    `,
  }),
};
export const FullHeight: Story = { args: { fullHeight: true, surface: 'subtle' } };
