import type { Meta, StoryObj } from '@storybook/angular';
import { GhContainerComponent } from 'gh-design-system';

const meta: Meta<GhContainerComponent> = {
  title: 'Layout/Container',
  component: GhContainerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: 'Centers content and limits line length with responsive gutters.' },
    },
  },
  args: { size: 'xl', gutters: 'md', centered: true },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'wide', 'full'] },
    gutters: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-container [size]="size" [gutters]="gutters" [centered]="centered"><div class="gh-story-layout-item">{{ size }} container with {{ gutters }} gutters</div></gh-container>',
  }),
};

export default meta;
type Story = StoryObj<GhContainerComponent>;

export const Playground: Story = {};
export const ReadingWidth: Story = { args: { size: 'sm' } };
export const Wide: Story = { args: { size: 'wide', gutters: 'lg' } };
export const FullBleed: Story = { args: { size: 'full', gutters: 'none' } };
export const AllSizes: Story = {
  render: () => ({
    template: `
      @for (size of ['sm', 'md', 'lg', 'xl', 'wide', 'full']; track size) {
        <gh-container [size]="size" gutters="sm"><div class="gh-story-layout-item">{{ size }}</div></gh-container>
      }
    `,
  }),
};
export const AllGutters: Story = {
  render: () => ({
    template: `
      @for (gutter of ['none', 'sm', 'md', 'lg']; track gutter) {
        <gh-container size="full" [gutters]="gutter"><div class="gh-story-layout-item">{{ gutter }} gutters</div></gh-container>
      }
    `,
  }),
};
export const NestedContent: Story = {
  render: () => ({
    template:
      '<gh-container size="wide"><div class="gh-story-surface"><gh-container size="sm"><p>A reading-width container nested inside a wide page shell.</p></gh-container></div></gh-container>',
  }),
};
