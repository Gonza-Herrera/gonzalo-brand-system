import type { Meta, StoryObj } from '@storybook/angular';

const spacingTokens = [
  { name: '--gh-space-xs', value: '0.25rem' },
  { name: '--gh-space-sm', value: '0.5rem' },
  { name: '--gh-space-md', value: '1rem' },
  { name: '--gh-space-lg', value: '1.5rem' },
  { name: '--gh-space-xl', value: '2rem' },
  { name: '--gh-space-2xl', value: '3rem' },
  { name: '--gh-space-section', value: '6rem' },
] as const;

const meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A compact spacing scale shared by components and layout primitives.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => ({
    props: { tokens: spacingTokens },
    template: `
      <div class="gh-story-token-list">
        @for (token of tokens; track token.name) {
          <div class="gh-story-token">
            <code>{{ token.name }} · {{ token.value }}</code>
            <div class="gh-story-token__sample" [style.--gh-story-value]="'var(' + token.name + ')'" aria-hidden="true"></div>
          </div>
        }
      </div>
    `,
  }),
};
