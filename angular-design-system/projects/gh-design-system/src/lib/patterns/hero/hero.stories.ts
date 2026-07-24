import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { GhHeroComponent, GhHeroVisualDirective } from 'gh-design-system';
import { STORY_HERO_ACTIONS } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhHeroComponent> = {
  title: 'Patterns/Hero',
  component: GhHeroComponent,
  decorators: [moduleMetadata({ imports: [GhHeroVisualDirective] })],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive portfolio introduction with semantic heading, actions, optional visual, and themed surfaces.',
      },
    },
  },
  args: {
    eyebrow: 'Frontend engineer · Design systems',
    title: 'I build accessible interfaces with clarity and character.',
    description:
      'Angular architecture, reusable systems, and thoughtful product experiences for the web.',
    actions: STORY_HERO_ACTIONS,
    alignment: 'start',
    layout: 'split',
    surface: 'gradient',
    minHeight: 'auto',
    headingLevel: 1,
  },
  argTypes: {
    alignment: { control: 'select', options: ['start', 'center'] },
    layout: { control: 'select', options: ['content-only', 'split', 'centered'] },
    surface: { control: 'select', options: ['default', 'subtle', 'gradient', 'glass'] },
    minHeight: { control: 'select', options: ['auto', 'screen'] },
    headingLevel: { control: 'select', options: [1, 2] },
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-hero [eyebrow]="eyebrow" [title]="title" [description]="description" [actions]="actions" [alignment]="alignment" [layout]="layout" [surface]="surface" [minHeight]="minHeight" [headingLevel]="headingLevel">
        <div ghHeroVisual class="gh-story-hero-visual">Token-driven visual</div>
      </gh-hero>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhHeroComponent>;

export const Playground: Story = {};
export const Split: Story = {};
export const WithVisual: Story = {};
export const ContentOnly: Story = { args: { layout: 'content-only', surface: 'default' } };
export const WithoutVisual: Story = {
  render: (args) => ({
    props: args,
    template:
      '<gh-hero [eyebrow]="eyebrow" [title]="title" [description]="description" [actions]="actions" [alignment]="alignment" layout="content-only" [surface]="surface" [minHeight]="minHeight" [headingLevel]="headingLevel"></gh-hero>',
  }),
};
export const Centered: Story = {
  args: { layout: 'centered', alignment: 'center', surface: 'subtle' },
};
export const Gradient: Story = { args: { surface: 'gradient' } };
export const Glass: Story = { args: { surface: 'glass' }, globals: { theme: 'dark' } };
export const OneAction: Story = { args: { actions: [STORY_HERO_ACTIONS[0]!] } };
export const MultipleActions: Story = { args: { actions: STORY_HERO_ACTIONS } };
export const LongContent: Story = {
  args: {
    title:
      'I help product teams turn complex frontend architecture into accessible systems that remain clear as products and organizations grow.',
    description:
      'This intentionally longer introduction validates wrapping, reading width, action placement, and visual balance without truncating consumer-owned copy.',
  },
};
export const FullViewport: Story = { args: { minHeight: 'screen' } };
export const Mobile: Story = { globals: { viewport: { value: 'mobile375', isRotated: false } } };
