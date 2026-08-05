import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, userEvent } from 'storybook/test';
import {
  GhAmbientBackgroundComponent,
  GhIconButtonComponent,
  GhNavigationComponent,
  type GhNavigationItem,
} from 'gh-design-system';
import { STORY_NAVIGATION_ITEMS } from '../../../../../../stories/shared/story-data';

const longNavigationItems: readonly GhNavigationItem[] = [
  { label: 'Página principal', href: '#inicio', active: true },
  { label: 'Experiencia profesional', href: '#experiencia' },
  { label: 'Proyectos y casos de estudio', href: '#proyectos' },
  { label: 'Contenido y recursos técnicos', href: '#contenido' },
];

const meta: Meta<GhNavigationComponent> = {
  title: 'Patterns/Navigation',
  component: GhNavigationComponent,
  tags: ['autodocs', 'pr28-navigation'],
  decorators: [
    moduleMetadata({
      imports: [GhAmbientBackgroundComponent, GhIconButtonComponent, GhNavigationComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive global navigation with a bounded Liquid Glass header, an elevated mobile panel, opaque fallbacks, native links, explicit active state and keyboard-safe dismissal. Tabs, Breadcrumbs and Pagination are not public components in the current library.',
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
  argTypes: {
    sticky: { description: 'Keeps the header in normal flow with CSS sticky positioning.' },
    transparent: {
      description: 'Preserves the existing explicit transparent presentation without adding blur.',
    },
    items: { description: 'Consumer-authored native links and active route state.' },
    menuId: { description: 'Stable deterministic ID used by aria-controls.' },
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
export const Sticky: Story = { args: { sticky: true } };
export const LightTheme: Story = { globals: { theme: 'light' } };
export const DarkTheme: Story = { globals: { theme: 'dark' } };
export const ActiveRoute: Story = {};
export const ExternalLinks: Story = {};
export const Transparent: Story = { args: { transparent: true, sticky: false } };

export const AmbientBackground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gh-ambient-background preset="brand" intensity="default" style="display: block; min-height: 24rem; padding-block: var(--gh-space-xl)">
        <gh-navigation
          [brand]="brand"
          [brandHref]="brandHref"
          [items]="items"
          [sticky]="false"
          [navigationLabel]="navigationLabel"
          menuId="ambient-navigation-menu"
        />
      </gh-ambient-background>
    `,
  }),
};

export const WithProjectedControls: Story = {
  args: { showThemeControl: true },
  render: (args) => ({
    props: args,
    template: `
      <gh-navigation
        [brand]="brand"
        [brandHref]="brandHref"
        [items]="items"
        [sticky]="sticky"
        [showThemeControl]="showThemeControl"
        [navigationLabel]="navigationLabel"
        menuId="projected-navigation-menu"
      >
        <a ghNavigationActions href="mailto:hello@example.com">Contact</a>
        <gh-icon-button ghNavigationThemeControl variant="ghost" aria-label="Change theme">
          <span aria-hidden="true">◐</span>
        </gh-icon-button>
      </gh-navigation>
    `,
  }),
};

export const LongEnglishAndSpanishLabels: Story = {
  args: {
    brand: 'Gonzalo Herrera — Design System',
    items: longNavigationItems,
    navigationLabel: 'Navegación principal del portfolio',
  },
  globals: { viewport: { value: 'tablet768', isRotated: false } },
};

export const NavigationItemFocus: Story = {
  play: async ({ canvas }) => {
    const activeLink = canvas.getByRole('link', { name: 'Work' });
    activeLink.focus();
    await expect(activeLink).toHaveFocus();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  },
};

export const MobileClosed: Story = {
  globals: { viewport: { value: 'mobile375', isRotated: false } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  },
};

export const MobileOpen: Story = {
  globals: { viewport: { value: 'mobile375', isRotated: false } },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: 'Open navigation menu' });
    await userEvent.click(toggle);
    await expect(canvas.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(canvas.getByRole('navigation', { name: 'Portfolio navigation' })).toBeVisible();
  },
};

export const MobileEscapeRestoresFocus: Story = {
  globals: { viewport: { value: 'mobile320', isRotated: false } },
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: 'Open navigation menu' });
    await userEvent.click(openButton);
    const closeButton = canvas.getByRole('button', { name: 'Close navigation menu' });
    await userEvent.keyboard('{Escape}');
    await expect(closeButton).toHaveAttribute('aria-expanded', 'false');
    await expect(closeButton).toHaveFocus();
  },
};

export const MobileRouteSelectionCloses: Story = {
  globals: { viewport: { value: 'mobile375', isRotated: false } },
  play: async ({ canvas }) => {
    const openButton = canvas.getByRole('button', { name: 'Open navigation menu' });
    await userEvent.click(openButton);
    await userEvent.click(canvas.getByRole('link', { name: 'Work' }));
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
  },
};

export const DarkMobileOpen: Story = {
  globals: {
    theme: 'dark',
    viewport: { value: 'mobile375', isRotated: false },
  },
  play: MobileOpen.play,
};

export const ReducedMotionAndForcedColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'CSS removes decorative transitions for reduced motion and neutralizes Glass with system colors in forced-colors mode; focus and active indicators remain structural.',
      },
    },
  },
};
