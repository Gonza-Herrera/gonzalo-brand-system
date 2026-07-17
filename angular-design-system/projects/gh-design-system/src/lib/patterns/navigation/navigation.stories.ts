import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent } from 'storybook/test';
import { GhNavigationComponent } from 'gh-design-system';
import { STORY_NAVIGATION_ITEMS } from '../../../../../../stories/shared/story-data';

const meta: Meta<GhNavigationComponent> = {
  title: 'Patterns/Navigation',
  component: GhNavigationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive site navigation with active state, safe external links, and keyboard-aware mobile menu.',
      },
    },
  },
  args: {
    brand: 'Gonzalo Herrera',
    brandHref: '#home',
    items: STORY_NAVIGATION_ITEMS,
    sticky: true,
    transparent: false,
    showThemeControl: false,
    menuLabel: 'Open navigation menu',
    closeMenuLabel: 'Close navigation menu',
    navigationLabel: 'Portfolio navigation',
    menuId: 'storybook-navigation-menu',
  },
  render: (args) => ({
    props: args,
    template:
      '<gh-navigation [brand]="brand" [brandHref]="brandHref" [items]="items" [sticky]="sticky" [transparent]="transparent" [showThemeControl]="showThemeControl" [menuLabel]="menuLabel" [closeMenuLabel]="closeMenuLabel" [navigationLabel]="navigationLabel" [menuId]="menuId"></gh-navigation>',
  }),
};

export default meta;
type Story = StoryObj<GhNavigationComponent>;

export const Playground: Story = {};
export const Default: Story = {};
export const Desktop: Story = {};
export const Sticky: Story = { args: { sticky: true } };
export const ActiveItem: Story = {};
export const ExternalLinks: Story = {};
export const Transparent: Story = { args: { transparent: true, sticky: false } };
export const WithProjectedControls: Story = {
  args: { showThemeControl: true },
  render: (args) => ({
    props: args,
    template: `
      <gh-navigation [brand]="brand" [brandHref]="brandHref" [items]="items" [sticky]="sticky" [showThemeControl]="showThemeControl" [menuId]="menuId">
        <a ghNavigationActions href="mailto:hello@example.com">Contact</a>
        <button ghNavigationThemeControl type="button">Theme</button>
      </gh-navigation>
    `,
  }),
};
export const MobileMenu: Story = {
  globals: { viewport: { value: 'mobile375', isRotated: false } },
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: 'Open navigation menu' });
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(openButton);
    const closeButton = canvas.getByRole('button', { name: 'Close navigation menu' });
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(canvas.getByRole('link', { name: 'Work' }));
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(openButton);
    await userEvent.click(canvas.getByRole('button', { name: 'Close navigation menu' }));
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
  },
};
