const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

/**
 * next-compose-plugins takes an array of plugins/loaders, and a
 * global configuration object.
 *
 * ```
 * withPlugins(
 *  [
 *      [withPlugin1],
 *      [withPlugin2]
 *  ],
 * {
 *      target: 'server',
 *      /** ... any other global config files /
 * }
 * );
 * ```
 */

module.exports = withPlugins([[withImages]], {
  target: 'serverless'
});
