const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');

// module.exports = withPlugins([withTypescript, withCSS], {
//   target: 'serverless',
//   cssModules: true,
//   webpack(config, { dev, isServer }) {
//     if (dev && isServer) {
//       config.plugins.push(new ForkTsCheckerWebapckPlugin());
//     }
//     return config;
//   },
// });

module.exports = withTypescript(
  withCSS({
    target: 'serverless',
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    // postcssLoaderOptions: {},
    webpack(config, { dev, isServer }) {
      if (dev && isServer) {
        config.plugins.push(new ForkTsCheckerWebapckPlugin());
      }
      return config;
    },
  }),
);
