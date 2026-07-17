import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { GhCardComponent, GhGridComponent } from 'gh-design-system';

const meta: Meta<GhGridComponent> = {
  title: 'Layout/Grid',
  component: GhGridComponent,
  decorators: [moduleMetadata({ imports: [GhCardComponent] })],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Responsive grid with explicit columns or auto-fit behavior based on semantic minimum sizes.',
      },
    },
  },
  args: { columns: 'auto', minItemSize: 'md', gap: 'lg', align: 'stretch' },
  argTypes: {
    columns: { control: 'select', options: ['auto', 1, 2, 3, 4] },
    minItemSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    align: { control: 'select', options: ['stretch', 'start', 'center', 'end'] },
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-grid [columns]="columns" [minItemSize]="minItemSize" [gap]="gap" [align]="align">@for (item of [1, 2, 3, 4, 5, 6]; track item) {<div class="gh-story-layout-item">Item {{ item }}</div>}</gh-grid>',
  }),
};

export default meta;
type Story = StoryObj<GhGridComponent>;

export const AutoResponsive: Story = {};
export const OneColumn: Story = { args: { columns: 1 } };
export const TwoColumns: Story = { args: { columns: 2 } };
export const ThreeColumns: Story = { args: { columns: 3 } };
export const FourColumns: Story = { args: { columns: 4, gap: 'sm' } };
export const MobileAutoFit: Story = {
  globals: { viewport: { value: 'mobile375', isRotated: false } },
};
export const RealCards: Story = {
  render: () => ({
    template: `
      <gh-grid columns="auto" minItemSize="md" gap="lg">
        <gh-card variant="outlined" fullHeight><h3>Architecture</h3><p>Composable public APIs.</p></gh-card>
        <gh-card variant="elevated" fullHeight><h3>Accessibility</h3><p>Native behavior and visible focus.</p></gh-card>
        <gh-card variant="subtle" fullHeight><h3>Theming</h3><p>Semantic light and dark tokens.</p></gh-card>
      </gh-grid>
    `,
  }),
};
