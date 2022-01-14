module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    // "storybook-dark-mode",
    // '@storybook/addon-viewport', // part of essentials
    // '@storybook/addon-measure',// part of essentials
    'storybook-addon-designs',
    // '@storybook/addon-storysource',
    'storybook-addon-mdx-embed',
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
        // rule: {
        //   // test: [/\.stories\.jsx?$/], This is default
        //   include: [path.resolve(__dirname, "../src")], // You can specify directories
        // },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          // parser: 'typescript',
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: "@storybook/react",
};
