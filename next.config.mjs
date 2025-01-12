

import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js',
  swDest: 'public/service-worker.js',
});

nextConfig.output = 'export';

export default nextConfig;