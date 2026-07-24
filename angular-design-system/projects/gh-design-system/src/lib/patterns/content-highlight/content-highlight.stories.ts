import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from 'storybook/test';
import { GhContentHighlightComponent } from 'gh-design-system';
import { STORY_HIGHLIGHT } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhContentHighlightComponent> = {
  title: 'Patterns/Content Highlight',
  component: GhContentHighlightComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Prominent editorial or project link with media, type, tags, and safe external-link behavior.',
      },
    },
  },
  args: {
    content: STORY_HIGHLIGHT,
    orientation: 'horizontal',
    surface: 'default',
    headingLevel: 2,
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    surface: { control: 'select', options: ['default', 'accent', 'gradient'] },
    headingLevel: { control: 'select', options: [2, 3] },
  },
};

export default meta;
type Story = StoryObj<GhContentHighlightComponent>;

export const Horizontal: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /Read the article/ });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
export const Article: Story = {};
export const Project: Story = {
  args: {
    content: { ...STORY_HIGHLIGHT, type: 'project', title: 'A composable portfolio architecture' },
  },
};
export const LinkedIn: Story = {
  args: {
    content: {
      ...STORY_HIGHLIGHT,
      type: 'linkedin',
      title: 'Notes from building an Angular design system',
    },
  },
};
export const Resource: Story = {
  args: {
    content: {
      ...STORY_HIGHLIGHT,
      type: 'resource',
      title: 'Design-system contribution checklist',
    },
  },
};
export const Talk: Story = {
  args: {
    content: {
      ...STORY_HIGHLIGHT,
      type: 'talk',
      title: 'Accessible components as team infrastructure',
    },
  },
};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Accent: Story = { args: { surface: 'accent' } };
export const Gradient: Story = { args: { surface: 'gradient' }, globals: { theme: 'dark' } };
export const WithoutImage: Story = {
  args: { content: { ...STORY_HIGHLIGHT, imageSrc: undefined, imageAlt: undefined } },
};
export const WithImage: Story = {};
export const WithTags: Story = {};
export const ExternalLink: Story = {};
