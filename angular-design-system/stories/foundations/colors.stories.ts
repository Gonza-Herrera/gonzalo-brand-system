import type { Meta, StoryObj } from '@storybook/angular';

interface ColorToken {
  readonly name: string;
  readonly value: string;
}

const primitiveColors: readonly ColorToken[] = [
  { name: 'Ivory', value: 'var(--gh-color-ivory)' },
  { name: 'Lavender', value: 'var(--gh-color-lavender)' },
  { name: 'Peach', value: 'var(--gh-color-peach)' },
  { name: 'Cloud blue', value: 'var(--gh-color-cloud-blue)' },
  { name: 'Ink', value: 'var(--gh-color-ink)' },
  { name: 'Mint', value: 'var(--gh-color-mint)' },
  { name: 'Sand', value: 'var(--gh-color-sand)' },
  { name: 'Sky', value: 'var(--gh-color-sky)' },
  { name: 'White', value: 'var(--gh-color-white)' },
];

const semanticColors: readonly ColorToken[] = [
  { name: 'Background primary', value: 'var(--gh-background-primary)' },
  { name: 'Background secondary', value: 'var(--gh-background-secondary)' },
  { name: 'Surface primary', value: 'var(--gh-surface-primary)' },
  { name: 'Text primary', value: 'var(--gh-text-primary)' },
  { name: 'Text secondary', value: 'var(--gh-text-secondary)' },
  { name: 'Text accent', value: 'var(--gh-text-accent)' },
  { name: 'Border default', value: 'var(--gh-border-default)' },
  { name: 'Primary action', value: 'var(--gh-action-primary-background)' },
  { name: 'Success', value: 'var(--gh-status-success-background)' },
  { name: 'Warning', value: 'var(--gh-status-warning-background)' },
  { name: 'Danger', value: 'var(--gh-status-danger-background)' },
];

const meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primitive colors express the brand palette. Components consume semantic color tokens so theme changes preserve intent.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const renderTokens = (tokens: readonly ColorToken[]) => ({
  props: { tokens },
  template: `
    <div class="gh-story-swatch-grid">
      @for (token of tokens; track token.name) {
        <div class="gh-story-swatch">
          <div class="gh-story-swatch__sample" [style.--gh-story-value]="token.value"></div>
          <div class="gh-story-swatch__label">
            <strong>{{ token.name }}</strong>
            <code>{{ token.value }}</code>
          </div>
        </div>
      }
    </div>
  `,
});

export const PrimitivePalette: Story = { render: () => renderTokens(primitiveColors) };
export const SemanticPalette: Story = { render: () => renderTokens(semanticColors) };
export const LightTheme: Story = {
  render: () => renderTokens(semanticColors),
  globals: { theme: 'light' },
};
export const DarkTheme: Story = {
  render: () => renderTokens(semanticColors),
  globals: { theme: 'dark' },
};
