import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../storybook/**/*.mdx', '../storybook/**/*.stories.ts'],
  tags: {
    page: {},
    card: {},
    icon: {},
    inlineText: {},
    pill: {},
    thumbnail: {}
  },
  // staticDirs: [{ from: '../dist/', to: '/dist' }],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false
  },
};
export default config;
