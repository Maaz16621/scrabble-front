// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponents: true,
  },
  // Disable HMR on the client side in production
  reactStrictMode: true, // Enable strict mode for React
  
};
export default nextConfig