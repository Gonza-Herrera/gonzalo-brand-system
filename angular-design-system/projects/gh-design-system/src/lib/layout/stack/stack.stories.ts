import type { Meta, StoryObj } from '@storybook/angular';
import { GhStackComponent } from 'gh-design-system';

const meta: Meta<GhStackComponent> = {
  title: 'Layout/Stack',
  component: GhStackComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Arranges content vertically with tokenized gaps and alignment.' },
    },
  },
  args: { gap: 'md', align: 'stretch', justify: 'start', wrap: false },
  argTypes: {
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    align: { control: 'select', options: ['stretch', 'start', 'center', 'end'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between'] },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-stack [gap]="gap" [align]="align" [justify]="justify" [wrap]="wrap"><div class="gh-story-layout-item">First</div><div class="gh-story-layout-item">Second</div><div class="gh-story-layout-item">Third</div></gh-stack>',
  }),
};

export default meta;
type Story = StoryObj<GhStackComponent>;

export const Playground: Story = {};
export const Tight: Story = { args: { gap: 'xs', align: 'start' } };
export const Spacious: Story = { args: { gap: '2xl' } };
export const Centered: Story = { args: { align: 'center' } };
export const Justified: Story = { args: { justify: 'between' } };
export const GapScale: Story = {
  render: () => ({
    template:
      '<gh-stack gap="xs"><div class="gh-story-layout-item">xs</div><div class="gh-story-layout-item">xs</div></gh-stack><hr><gh-stack gap="lg"><div class="gh-story-layout-item">lg</div><div class="gh-story-layout-item">lg</div></gh-stack>',
  }),
};
export const FormLikeComposition: Story = {
  render: () => ({
    template:
      '<form (submit)="$event.preventDefault()"><gh-stack gap="md"><label class="gh-form-field__label" for="story-name">Name</label><input class="gh-input" id="story-name" name="name"><button type="submit">Save</button></gh-stack></form>',
  }),
};
export const NestedStacks: Story = {
  render: () => ({
    template:
      '<gh-stack gap="xl"><gh-stack gap="xs"><h3>Group one</h3><p>Related content stays close.</p></gh-stack><gh-stack gap="xs"><h3>Group two</h3><p>Groups use a larger outer gap.</p></gh-stack></gh-stack>',
  }),
};
