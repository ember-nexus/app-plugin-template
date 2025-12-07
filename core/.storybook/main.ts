import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../storybook/**/*.mdx', '../storybook/**/*.stories.ts'],
  tags: {
    card: {
      defaultFilterSelection: 'include',
    },
    icon: {
      defaultFilterSelection: 'include',
    },
    inlineText: {
      defaultFilterSelection: 'include',
    },
    pill: {
      defaultFilterSelection: 'include',
    },
    thumbnail: {
      defaultFilterSelection: 'include',
    },
  },
  staticDirs: [{ from: '../dist/', to: '/dist' }],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  }
};
export default config;
