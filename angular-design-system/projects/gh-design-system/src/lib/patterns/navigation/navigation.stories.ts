import { ChangeDetectionStrategy, Component } from '@angular/core';
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

@Component({
  selector: 'gh-navigation-selectors-story',
  standalone: true,
  imports: [GhNavigationComponent],
  template: `
    <gh-navigation
      brand="Gonzalo Herrera"
      brandHref="#home"
      navigationLabel="Portfolio navigation"
      menuId="selector-story-navigation-menu"
      [items]="items"
      [showThemeControl]="true"
      [sticky]="false"
    >
      <nav ghNavigationActions class="story-language" aria-label="Language">
        <a href="#english" aria-current="page">EN</a>
        <a href="#spanish">ES</a>
      </nav>

      <label ghNavigationThemeControl class="story-theme">
        <span>Theme</span>
        <select class="gh-select" aria-label="Theme preference">
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </label>
    </gh-navigation>
  `,
  styles: `
    .story-language,
    .story-theme {
      display: inline-flex;
      align-items: center;
      gap: var(--gh-navigation-selector-gap);
      padding: var(--gh-navigation-selector-padding);
      border: var(--gh-navigation-selector-border-width) solid
        var(--gh-navigation-selector-border-color);
      border-radius: var(--gh-navigation-selector-radius);
      background: var(--gh-navigation-selector-fallback-background);
      color: var(--gh-navigation-selector-label-foreground);
      box-shadow: var(--gh-navigation-selector-shadow), var(--gh-navigation-selector-inner-shadow);
      transition:
        border-color var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard),
        box-shadow var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard);
    }

    .story-language {
      position: relative;
      isolation: isolate;
    }

    .story-language a {
      position: relative;
      z-index: 1;
      display: inline-grid;
      min-width: var(--gh-navigation-item-min-height);
      min-height: var(--gh-navigation-item-min-height);
      place-items: center;
      border: var(--gh-navigation-selector-border-width) solid transparent;
      border-radius: var(--gh-navigation-selector-radius);
      color: var(--gh-navigation-selector-item-foreground);
      box-shadow: var(--gh-navigation-motion-shadow-rest);
      opacity: var(--gh-navigation-motion-opacity-rest);
      text-decoration: none;
      transition:
        background-color var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard),
        border-color var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard),
        box-shadow var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard),
        color var(--gh-navigation-motion-duration-fast) var(--gh-navigation-motion-easing-standard),
        opacity var(--gh-navigation-motion-duration-fast)
          var(--gh-navigation-motion-easing-standard),
        transform var(--gh-navigation-motion-duration-fast)
          var(--gh-navigation-motion-easing-emphasized);
    }

    .story-language a:not([aria-current='page']):hover {
      background: var(--gh-navigation-selector-item-hover-background);
      color: var(--gh-navigation-selector-item-hover-foreground);
      box-shadow: var(--gh-navigation-motion-shadow-hover);
      opacity: var(--gh-navigation-motion-opacity-hover);
    }

    .story-language a:focus-visible,
    .story-theme select:focus-visible {
      outline: var(--gh-navigation-item-focus-ring-width) solid
        var(--gh-navigation-item-focus-ring-color);
      outline-offset: var(--gh-navigation-item-focus-ring-offset);
    }

    .story-language a[aria-current='page'],
    .story-theme select {
      border-color: var(--gh-navigation-selector-item-active-border-color);
      background: var(--gh-navigation-selector-item-active-background);
      color: var(--gh-navigation-selector-item-active-foreground);
      box-shadow:
        var(--gh-navigation-selector-item-active-shadow),
        var(--gh-navigation-selector-item-active-inner-shadow);
      opacity: var(--gh-navigation-motion-opacity-hover);
    }

    .story-theme select {
      width: auto;
      border-radius: var(--gh-navigation-selector-radius);
      transition:
        background-color var(--gh-navigation-motion-duration-slow)
          var(--gh-navigation-motion-easing-standard),
        border-color var(--gh-navigation-motion-duration-normal)
          var(--gh-navigation-motion-easing-standard),
        box-shadow var(--gh-navigation-motion-duration-slow)
          var(--gh-navigation-motion-easing-standard),
        color var(--gh-navigation-motion-duration-fast) var(--gh-navigation-motion-easing-standard),
        transform var(--gh-navigation-motion-duration-fast)
          var(--gh-navigation-motion-easing-emphasized);
    }

    .story-theme select:hover {
      background: var(--gh-navigation-selector-item-hover-background);
      color: var(--gh-navigation-selector-item-hover-foreground);
    }

    .story-language a:active,
    .story-theme select:active {
      background: var(--gh-navigation-selector-item-pressed-background);
      box-shadow: var(--gh-navigation-selector-item-pressed-shadow);
      transform: scale(var(--gh-navigation-motion-scale-pressed));
    }

    @supports selector(.story-language:has(> a[aria-current='page'])) {
      .story-language::before {
        position: absolute;
        z-index: 0;
        inset-block: var(--gh-navigation-selector-padding);
        inset-inline-start: var(--gh-navigation-selector-padding);
        width: var(--gh-navigation-item-min-height);
        border: var(--gh-navigation-selector-border-width) solid
          var(--gh-navigation-selector-item-active-border-color);
        border-radius: var(--gh-navigation-selector-radius);
        background: var(--gh-navigation-selector-item-active-background);
        box-shadow:
          var(--gh-navigation-selector-item-active-shadow),
          var(--gh-navigation-selector-item-active-inner-shadow);
        content: '';
        opacity: 0;
        pointer-events: none;
        transition:
          background-color var(--gh-navigation-motion-duration-slow)
            var(--gh-navigation-motion-easing-standard),
          border-color var(--gh-navigation-motion-duration-slow)
            var(--gh-navigation-motion-easing-standard),
          box-shadow var(--gh-navigation-motion-duration-slow)
            var(--gh-navigation-motion-easing-standard),
          opacity var(--gh-navigation-motion-duration-fast)
            var(--gh-navigation-motion-easing-standard),
          transform var(--gh-navigation-motion-duration-slow)
            var(--gh-navigation-motion-easing-emphasized);
      }

      .story-language:has(> a[aria-current='page'])::before {
        opacity: 1;
      }

      .story-language:has(> a:nth-child(2)[aria-current='page'])::before {
        transform: translateX(calc(100% + var(--gh-navigation-selector-gap)));
      }

      .story-language a[aria-current='page'] {
        border-color: transparent;
        background: transparent;
        box-shadow: var(--gh-navigation-motion-shadow-rest);
      }
    }

    @supports ((backdrop-filter: none) or (-webkit-backdrop-filter: none)) {
      .story-language,
      .story-theme {
        background: var(--gh-navigation-selector-background);
      }
    }

    @media (forced-colors: active) {
      .story-language,
      .story-theme,
      .story-language a[aria-current='page'],
      .story-theme select {
        border-color: ButtonBorder;
        background: Canvas;
        color: CanvasText;
        box-shadow: none;
        transform: none;
        transition: none;
      }

      .story-language::before {
        content: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .story-language::before {
        content: none;
      }

      .story-language a,
      .story-language a:active,
      .story-theme select,
      .story-theme select:active {
        opacity: 1;
        transform: none;
        transition:
          background-color var(--gh-navigation-motion-duration-fast)
            var(--gh-navigation-motion-easing-standard),
          border-color var(--gh-navigation-motion-duration-fast)
            var(--gh-navigation-motion-easing-standard),
          color var(--gh-navigation-motion-duration-fast)
            var(--gh-navigation-motion-easing-standard);
      }

      .story-language a[aria-current='page'] {
        border-color: var(--gh-navigation-selector-item-active-border-color);
        background: var(--gh-navigation-selector-item-active-background);
        box-shadow:
          var(--gh-navigation-selector-item-active-shadow),
          var(--gh-navigation-selector-item-active-inner-shadow);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NavigationSelectorsStoryComponent {
  protected readonly items = STORY_NAVIGATION_ITEMS;
}

function ambientStory(preset: 'brand' | 'subtle', menuId: string): Story {
  return {
    render: (args) => ({
      props: args,
      template: `
        <gh-ambient-background preset="${preset}" intensity="default" style="display: block; min-height: 24rem; padding-block: var(--gh-space-xl)">
          <gh-navigation
            [brand]="brand"
            [brandHref]="brandHref"
            [items]="items"
            [sticky]="false"
            [navigationLabel]="navigationLabel"
            menuId="${menuId}"
          />
        </gh-ambient-background>
      `,
    }),
  };
}

const meta: Meta<GhNavigationComponent> = {
  title: 'Patterns/Navigation',
  component: GhNavigationComponent,
  tags: ['autodocs', 'pr28-navigation', 'pr28-1-navigation-material', 'pr28-2-navigation-motion'],
  decorators: [
    moduleMetadata({
      imports: [
        GhAmbientBackgroundComponent,
        GhIconButtonComponent,
        GhNavigationComponent,
        NavigationSelectorsStoryComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive global navigation with a floating multi-layer Liquid Glass header, an elevated mobile panel, solid fallbacks, native links, a lightweight structural active state and keyboard-safe dismissal. Tabs, Breadcrumbs and Pagination are not public components in the current library.',
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
export const HeaderMaterialLight: Story = { globals: { theme: 'light' } };
export const HeaderMaterialDark: Story = { globals: { theme: 'dark' } };
export const ActiveRoute: Story = {};
export const ActiveNavigationItem: Story = {};
export const ExternalLinks: Story = {};
export const Transparent: Story = { args: { transparent: true, sticky: false } };

export const AmbientBackground: Story = ambientStory('brand', 'ambient-navigation-menu');
export const AmbientBrand: Story = ambientStory('brand', 'ambient-brand-navigation-menu');
export const AmbientSubtle: Story = ambientStory('subtle', 'ambient-subtle-navigation-menu');

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

export const HoverNavigationItem: Story = {
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole('link', { name: 'Experience' }));
  },
};

export const PressedNavigationItem: Story = {
  play: async ({ canvas }) => {
    await userEvent.pointer({
      keys: '[MouseLeft>]',
      target: canvas.getByRole('link', { name: 'Experience' }),
    });
  },
};

export const FocusNavigationItem: Story = NavigationItemFocus;

export const NavigationMotion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Motion reference for restrained hover light, pressed compression, active-indicator continuity and immediate visible focus. The Header material itself remains stable.',
      },
    },
  },
};

export const Hover: Story = HoverNavigationItem;
export const Pressed: Story = PressedNavigationItem;
export const Focus: Story = FocusNavigationItem;

export const LanguageSelector: Story = {
  render: () => ({ template: '<gh-navigation-selectors-story />' }),
  parameters: {
    docs: {
      description: {
        story:
          'Visual projection reference for the EN/ES segmented material. Portfolio retains the real localized Router links and locale behavior.',
      },
    },
  },
};

export const ThemeSelector: Story = {
  ...LanguageSelector,
  parameters: {
    docs: {
      description: {
        story:
          'Visual projection reference for the native Theme select integrated with the Header material. The production Theme Service and persistence remain unchanged.',
      },
    },
  },
};

export const NavigationMaterialComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'PR 28 used a full-width single-layer Glass strip and a bordered selected item. PR 28.1 keeps the same component while introducing floating geometry, restrained multi-layer reflections, a softer outer boundary and a fine active indicator. No legacy production style is retained for comparison.',
      },
    },
  },
};

export const SolidFallbackDocumentation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When backdrop filtering is unsupported, the same bounded geometry, reflections, borders and shadows are painted over an opaque semantic fallback without JavaScript detection.',
      },
    },
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

export const MobileNavigationMaterial: Story = MobileOpen;

export const Mobile320: Story = {
  globals: { viewport: { value: 'mobile320', isRotated: false } },
  play: MobileOpen.play,
};

export const Desktop1440: Story = {
  globals: { viewport: { value: 'desktop1440', isRotated: false } },
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

export const ReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With prefers-reduced-motion, scale and indicator travel are removed while immediate focus and semantic color changes remain available.',
      },
    },
  },
};
