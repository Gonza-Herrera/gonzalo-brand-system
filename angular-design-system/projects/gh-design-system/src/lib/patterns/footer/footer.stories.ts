import type { Meta, StoryObj } from '@storybook/angular';
import { GhFooterComponent } from 'gh-design-system';
import { STORY_FOOTER_GROUPS } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhFooterComponent> = {
  title: 'Patterns/Footer',
  component: GhFooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with brand context, grouped navigation, social and legal content slots.',
      },
    },
  },
  args: {
    brand: 'Gonzalo Herrera',
    description:
      'Frontend engineer focused on accessible design systems and maintainable Angular applications.',
    linkGroups: STORY_FOOTER_GROUPS,
    copyright: '© 2026 Gonzalo Herrera',
    showTagline: true,
    tagline: 'Built with care in Tucumán, Argentina.',
  },
  render: (args) => ({
    props: args,
    template: `
      <gh-footer [brand]="brand" [description]="description" [linkGroups]="linkGroups" [copyright]="copyright" [showTagline]="showTagline" [tagline]="tagline">
        <a ghFooterSocial href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub<span class="gh-visually-hidden"> (opens in a new tab)</span></a>
        <a ghFooterBottom href="#privacy">Privacy</a>
      </gh-footer>
    `,
  }),
};

export default meta;
type Story = StoryObj<GhFooterComponent>;

export const Playground: Story = {};
export const Complete: Story = {};
export const Basic: Story = { args: { linkGroups: [], showTagline: false } };
export const WithGroups: Story = {};
export const WithSocialSlot: Story = {};
export const WithTagline: Story = {};
export const WithBottomSlot: Story = {};
export const Minimal: Story = {
  args: { description: undefined, linkGroups: [], showTagline: false },
};
export const WithoutBottomCopy: Story = { args: { copyright: undefined } };
export const Mobile: Story = { globals: { viewport: { value: 'mobile375', isRotated: false } } };
