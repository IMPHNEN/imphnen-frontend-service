const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: {},
  output: 'standalone',
};

module.exports = composePlugins(withNx)(nextConfig);
