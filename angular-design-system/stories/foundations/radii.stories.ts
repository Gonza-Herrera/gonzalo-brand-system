import type { Meta, StoryObj } from '@storybook/angular';

const radii = [
  '--gh-radius-sm',
  '--gh-radius-md',
  '--gh-radius-lg',
  '--gh-radius-xl',
  '--gh-radius-pill',
] as const;

const meta = {
  title: 'Foundations/Radii',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Radius tokens provide consistent geometry from compact controls to expressive surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => ({
    props: { radii },
    template: `
      <div class="gh-story-swatch-grid">
        @for (radius of radii; track radius) {
          <div style="display: grid; min-height: 8rem; place-items: center; border: var(--gh-border-width-default) solid var(--gh-border-default); background: var(--gh-surface-secondary)" [style.border-radius]="'var(' + radius + ')'">
            <code>{{ radius }}</code>
          </div>
        }
      </div>
    `,
  }),
};
