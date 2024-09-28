// .storybook/main.ts
import path from 'node:path';

import type { StorybookConfig } from '@storybook/nextjs';
import type { Configuration } from 'webpack';

type ExtendedStorybookConfig = {
  devServer?: {
    proxy: {
      [key: string]: any;
    };
    before?: (app: any) => void;
  };
} & StorybookConfig;

const config: ExtendedStorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewports',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config: Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
      },
    },
  },
};

export default config;
