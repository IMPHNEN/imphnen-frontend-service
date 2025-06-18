const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: { svgr: false },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = composePlugins(withNx)(nextConfig);
