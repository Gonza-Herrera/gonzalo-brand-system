import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GhContainerComponent,
  GhGridComponent,
  GhProjectCardComponent,
  GhSectionComponent,
  GhSectionHeadingComponent,
} from 'gh-design-system';
import { STORY_PROJECT } from '../shared/story-data';

const meta = {
  title: 'Compositions/Projects Section',
  decorators: [
    moduleMetadata({
      imports: [
        GhContainerComponent,
        GhGridComponent,
        GhProjectCardComponent,
        GhSectionComponent,
        GhSectionHeadingComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive portfolio project section composed from Section, Container, Grid, Section Heading, and Project Card.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveGrid: Story = {
  render: () => ({
    props: {
      projects: [
        STORY_PROJECT,
        {
          ...STORY_PROJECT,
          title: 'Accessible Form Toolkit',
          imageSrc: undefined,
          imageAlt: undefined,
          status: 'in-progress',
        },
        {
          ...STORY_PROJECT,
          title: 'Portfolio Architecture',
          projectUrl: undefined,
          status: 'completed',
        },
      ],
    },
    template: `
      <gh-section surface="subtle" spacing="lg">
        <gh-container size="wide">
          <gh-section-heading eyebrow="Selected work" title="Projects" description="Systems and interfaces designed to remain clear as they grow.">
            <a ghSectionHeadingAction href="#all-projects">View all projects</a>
          </gh-section-heading>
          <div style="margin-top: var(--gh-space-xl)">
            <gh-grid columns="auto" minItemSize="lg" gap="lg">
              @for (project of projects; track project.title) {
                <gh-project-card [project]="project"></gh-project-card>
              }
            </gh-grid>
          </div>
        </gh-container>
      </gh-section>
    `,
  }),
};

export const Mobile: Story = {
  ...ResponsiveGrid,
  globals: { viewport: { value: 'mobile320', isRotated: false } },
};
