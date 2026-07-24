import type { Meta, StoryObj } from '@storybook/angular';
import { GhContactCalloutComponent } from 'gh-design-system';
import { STORY_CONTACT_ACTIONS } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhContactCalloutComponent> = {
  title: 'Patterns/Contact Callout',
  component: GhContactCalloutComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Closing call to action with responsive alignment, themed surface, and safe link actions.',
      },
    },
  },
  args: {
    eyebrow: 'Start a conversation',
    title: 'Have a thoughtful product problem to solve?',
    description: 'I am available for design-system, frontend architecture, and accessibility work.',
    actions: STORY_CONTACT_ACTIONS,
    alignment: 'center',
    surface: 'gradient',
  },
  argTypes: {
    alignment: { control: 'select', options: ['start', 'center'] },
    surface: { control: 'select', options: ['subtle', 'accent', 'gradient'] },
  },
};

export default meta;
type Story = StoryObj<GhContactCalloutComponent>;

export const Gradient: Story = {};
export const Center: Story = { args: { alignment: 'center' } };
export const Start: Story = { args: { alignment: 'start' } };
export const Accent: Story = { args: { surface: 'accent' } };
export const SubtleStartAligned: Story = { args: { surface: 'subtle', alignment: 'start' } };
export const OneAction: Story = { args: { actions: [STORY_CONTACT_ACTIONS[0]!] } };
export const TwoActions: Story = { args: { actions: STORY_CONTACT_ACTIONS } };
export const WithoutActions: Story = { args: { actions: [] } };
export const LongContent: Story = {
  args: {
    title:
      'Have a complex frontend platform or design-system challenge that needs a clear path forward?',
    description:
      'This longer callout validates responsive line length, action wrapping, and spacing when consumer-owned copy must explain a nuanced engagement.',
  },
};
export const Mobile: Story = { globals: { viewport: { value: 'mobile320', isRotated: false } } };
