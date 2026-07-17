import type { Meta, StoryObj } from '@storybook/angular';
import { GhProjectCardComponent } from 'gh-design-system';
import { STORY_PROJECT } from '../../../../../../../stories/shared/story-data';

const meta: Meta<GhProjectCardComponent> = {
  title: 'Components/Cards/Project Card',
  component: GhProjectCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Portfolio project summary with media, status, technologies, and safe links.',
      },
    },
  },
  args: { project: STORY_PROJECT, orientation: 'vertical', headingLevel: 2 },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    headingLevel: { control: 'inline-radio', options: [2, 3] },
  },
};

export default meta;
type Story = StoryObj<GhProjectCardComponent>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const Completed: Story = { args: { project: { ...STORY_PROJECT, status: 'completed' } } };
export const Concept: Story = {
  args: { project: { ...STORY_PROJECT, status: 'concept', featured: false } },
};
export const Archived: Story = {
  args: { project: { ...STORY_PROJECT, status: 'archived', featured: false } },
};
export const WithoutImage: Story = {
  args: { project: { ...STORY_PROJECT, imageSrc: undefined, imageAlt: undefined } },
};
export const WithoutLinks: Story = {
  args: { project: { ...STORY_PROJECT, projectUrl: undefined, repositoryUrl: undefined } },
};
export const InProgress: Story = {
  args: { project: { ...STORY_PROJECT, status: 'in-progress', featured: false } },
};
export const RepositoryOnly: Story = {
  args: { project: { ...STORY_PROJECT, projectUrl: undefined } },
};
export const ManyTechnologies: Story = {
  args: {
    project: {
      ...STORY_PROJECT,
      technologies: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Sass',
        'Storybook',
        'Playwright',
        'Accessibility',
      ],
    },
  },
};
export const SpanishNestedSection: Story = {
  args: {
    project: {
      ...STORY_PROJECT,
      description:
        'Un Design System reutilizable en Angular basado en tokens, accesibilidad y composición.',
      statusLabel: 'En desarrollo',
    },
    headingLevel: 3,
    ariaLabel: 'Proyecto: Angular Design System',
    featuredLabel: 'Destacado',
    technologiesLabel: 'Tecnologías',
    linksLabel: 'Enlaces del proyecto',
  },
};
