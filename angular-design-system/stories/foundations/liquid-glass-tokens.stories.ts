import type { Meta, StoryObj } from '@storybook/angular';

const materialSamples = [
  ['glass-subtle', 'Glass Subtle', 'Low-priority groups and calm repeated surfaces'],
  ['glass', 'Glass', 'Primary panels and intentional visual groups'],
  ['glass-elevated', 'Glass Elevated', 'Important floating or dialog-sized regions'],
  ['glass-floating', 'Glass Floating', 'Compact popovers, menus, and floating actions'],
] as const;

const blurTokens = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
const saturationTokens = ['none', 'subtle', 'default', 'strong'] as const;

function renderTokenRows(prefix: string, tokens: readonly string[]) {
  return tokens
    .map(
      (token) => `
        <tr>
          <th scope="row"><code>--gh-glass-${prefix}-${token}</code></th>
          <td><span class="gh-glass-token-value">var(--gh-glass-${prefix}-${token})</span></td>
        </tr>
      `,
    )
    .join('');
}

function renderMaterialSamples() {
  return materialSamples
    .map(
      ([id, label, description]) => `
        <article class="gh-glass-token-sample gh-glass-token-sample--${id}">
          <span class="gh-glass-token-sample__eyebrow">Enhanced material</span>
          <h3>${label}</h3>
          <p>${description}</p>
          <code>--gh-surface-${id}-*</code>
        </article>
      `,
    )
    .join('');
}

function renderFallbackSamples() {
  return materialSamples
    .map(
      ([id, label]) => `
        <article class="gh-glass-token-sample gh-glass-token-sample--${id} gh-glass-token-sample--fallback">
          <span class="gh-glass-token-sample__eyebrow">Solid fallback</span>
          <h3>${label}</h3>
          <p>The hierarchy remains legible without backdrop filtering.</p>
          <code>--gh-surface-${id}-fallback-background</code>
        </article>
      `,
    )
    .join('');
}

const meta = {
  title: 'Foundations/Liquid Glass Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Token-only reference for the PR 22 material contract. These samples are Storybook fixtures, not public Surface primitives or component implementations.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="gh-story-frame gh-glass-token-docs">
        <section class="gh-story-surface">
          <p class="gh-glass-token-kicker">LIQUID GLASS FOUNDATION</p>
          <h2>Semantic materials, controlled ingredients</h2>
          <p>
            Switch Storybook's theme toolbar to verify the same public contract in light and dark.
            Production components will consume these semantic roles beginning in PR 23.
          </p>
        </section>

        <section class="gh-glass-token-stage" aria-labelledby="materials-title">
          <div class="gh-glass-token-section-heading">
            <h2 id="materials-title">Material comparison</h2>
            <p>Each fixture uses its matching background, boundary, highlight, filter, shadow, text, and radius tokens.</p>
          </div>
          <div class="gh-glass-token-grid">
            ${renderMaterialSamples()}
          </div>
        </section>

        <section class="gh-story-surface" aria-labelledby="scales-title">
          <div class="gh-glass-token-section-heading">
            <h2 id="scales-title">Primitive budgets</h2>
            <p>Primitive slots compose semantic materials; components must not select them directly.</p>
          </div>
          <div class="gh-glass-token-tables">
            <table>
              <caption>Blur scale</caption>
              <thead><tr><th scope="col">Token</th><th scope="col">CSS reference</th></tr></thead>
              <tbody>${renderTokenRows('blur', blurTokens)}</tbody>
            </table>
            <table>
              <caption>Saturation scale</caption>
              <thead><tr><th scope="col">Token</th><th scope="col">CSS reference</th></tr></thead>
              <tbody>${renderTokenRows('saturation', saturationTokens)}</tbody>
            </table>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMaterials: Story = { globals: { theme: 'light' } };
export const DarkMaterials: Story = { globals: { theme: 'dark' } };

export const SolidFallbacks: Story = {
  globals: { theme: 'light' },
  render: () => ({
    template: `
      <div class="gh-story-frame gh-glass-token-docs">
        <section class="gh-glass-token-stage" aria-labelledby="fallbacks-title">
          <div class="gh-glass-token-section-heading">
            <h2 id="fallbacks-title">Solid fallback comparison</h2>
            <p>These fixtures intentionally apply no backdrop filter.</p>
          </div>
          <div class="gh-glass-token-grid">
            ${renderFallbackSamples()}
          </div>
        </section>
      </div>
    `,
  }),
};
