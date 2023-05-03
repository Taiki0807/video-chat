var path = require('path');
module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  features: {
    interactionsDebugger: true
  },
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  webpackFinal: config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': path.resolve(__dirname, '../')
        }
      }
    };
  },
  docs: {
    autodocs: true
  }
};