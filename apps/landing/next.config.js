const { composePlugins, withNx } = require('@nx/next');
const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: { svgr: false },
  sassOptions: {
    quietDeps: true,
    logger: {
      warn: () => {},
    },
  },
  webpack(config) {
    return config;
  },
};

module.exports = composePlugins(withNx, withPayload)(nextConfig);
