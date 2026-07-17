import type { Meta, StoryObj } from '@storybook/angular';

const shadows = ['--gh-shadow-sm', '--gh-shadow-md', '--gh-shadow-lg'] as const;

const meta = {
  title: 'Foundations/Shadows',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic elevation tokens adapt their contrast to the active theme. Use small for resting cards, medium for interactive elevation, and large only for prominent floating surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevation: Story = {
  render: () => ({
    props: { shadows },
    template: `
      <div class="gh-story-swatch-grid" style="padding: var(--gh-space-xl)">
        @for (shadow of shadows; track shadow) {
          <div style="display: grid; min-height: 9rem; place-items: center; border-radius: var(--gh-radius-lg); background: var(--gh-surface-elevated)" [style.box-shadow]="'var(' + shadow + ')'">
            <code>{{ shadow }}</code>
          </div>
        }
      </div>
    `,
  }),
};
