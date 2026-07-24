import type { Decorator, Preview } from '@storybook/angular';

const themeDecorator: Decorator = (story, context) => {
  const theme = context.globals['theme'] === 'dark' ? 'dark' : 'light';

  if (typeof document !== 'undefined') {
    document.documentElement.dataset['theme'] = theme;
    document.documentElement.style.colorScheme = theme;
  }

  return story();
};

const preview: Preview = {
  decorators: [themeDecorator],
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Global theme for every design-system example',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    layout: 'padded',
    a11y: {
      test: 'error',
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Layout', 'Patterns', 'Compositions'],
      },
    },
    viewport: {
      options: {
        mobile320: { name: 'Mobile 320', styles: { width: '320px', height: '800px' } },
        mobile375: { name: 'Mobile 375', styles: { width: '375px', height: '812px' } },
        tablet768: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' } },
        desktop1024: { name: 'Desktop 1024', styles: { width: '1024px', height: '768px' } },
        desktop1440: { name: 'Desktop 1440', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
