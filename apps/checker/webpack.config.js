const { composePlugins, withNx } = require('@nx/webpack');
const { merge } = require('webpack-merge');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    return merge(config, {
      watchOptions: {
        poll: 1000,
        aggregateTimeout: 300,
      },
    });
  }
);
