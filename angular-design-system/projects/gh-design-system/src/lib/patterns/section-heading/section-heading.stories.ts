import type { Meta, StoryObj } from '@storybook/angular';
import { GhSectionHeadingComponent } from 'gh-design-system';

const meta: Meta<GhSectionHeadingComponent> = {
  title: 'Patterns/Section Heading',
  component: GhSectionHeadingComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Consistent section introduction with configurable hierarchy, alignment, and action slot.',
      },
    },
  },
  args: {
    eyebrow: 'Selected work',
    title: 'Projects that turn systems into experiences',
    description: 'A focused selection of architecture, interaction, and accessibility work.',
    alignment: 'start',
    headingLevel: 2,
  },
  argTypes: {
    alignment: { control: 'select', options: ['start', 'center'] },
    headingLevel: { control: 'select', options: [2, 3, 4] },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-section-heading [eyebrow]="eyebrow" [title]="title" [description]="description" [alignment]="alignment" [headingLevel]="headingLevel">
        <a ghSectionHeadingAction href="#all-projects">View all</a>
      </gh-section-heading>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhSectionHeadingComponent>;

export const Playground: Story = {};
export const WithAction: Story = {};
export const Start: Story = { args: { alignment: 'start' } };
export const Centered: Story = {
  args: { alignment: 'center' },
  render: (args) => ({
    props: args,
    template:
      '<gh-section-heading [eyebrow]="eyebrow" [title]="title" [description]="description" [alignment]="alignment" [headingLevel]="headingLevel"></gh-section-heading>',
  }),
};
export const WithEyebrow: Story = {};
export const WithDescription: Story = {};
export const HeadingLevelThree: Story = { args: { headingLevel: 3 } };
export const HeadingLevelFour: Story = { args: { headingLevel: 4 } };
export const CompactHierarchy: Story = {
  args: { eyebrow: undefined, description: undefined, headingLevel: 3 },
};
