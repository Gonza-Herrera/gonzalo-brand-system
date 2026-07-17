import type { Meta, StoryObj } from '@storybook/angular';

const meta = {
  title: 'Foundations/Themes',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Themes change semantic tokens on the document root. Components keep the same API and visual intent.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="gh-story-frame" style="display: grid; gap: var(--gh-space-lg)">
        <section class="gh-story-surface">
          <p style="color: var(--gh-text-accent); font-weight: var(--gh-font-weight-semibold); margin-top: 0">Semantic theme</p>
          <h2>One component model, two appearances</h2>
          <p style="color: var(--gh-text-secondary)">Background, text, borders, actions, status, and elevation all resolve through semantic tokens.</p>
          <div style="display: flex; flex-wrap: wrap; gap: var(--gh-space-sm); align-items: center">
            <button type="button" style="padding: var(--gh-space-sm) var(--gh-space-md); border: var(--gh-border-width-default) solid var(--gh-action-primary-border); border-radius: var(--gh-radius-md); background: var(--gh-action-primary-background); color: var(--gh-action-primary-text)">Semantic action</button>
            <span style="padding: var(--gh-space-xs) var(--gh-space-sm); border: var(--gh-border-width-default) solid var(--gh-status-success-border); border-radius: var(--gh-radius-pill); background: var(--gh-status-success-background); color: var(--gh-status-success-text)">Success status</span>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { globals: { theme: 'light' } };
export const Dark: Story = { globals: { theme: 'dark' } };
