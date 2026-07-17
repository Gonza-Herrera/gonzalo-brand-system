import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../stories/**/*.stories.ts',
    '../projects/gh-design-system/src/lib/**/*.stories.ts',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  webpackFinal: async (webpackConfig) => ({
    ...webpackConfig,
    // Static Storybook builds are publishable artifacts; avoid embedding local paths.
    devtool: false,
  }),
};

export default config;
