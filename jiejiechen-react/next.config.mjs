/** @type {import('next').NextConfig} */
const nextConfig = {
  // compress: false,
  output: 'standalone',
  swrDelta: 31536000,
  experimental: {
    // esmExternals: false, // optional
    // externalDir: true, // optional
    // outputFileTracingRoot: path.join(__dirname, '../../'), // monorepo option
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cjj-prod-fu4c-strapi-assets.s3.ap-southeast-2.amazonaws.com',
      }
    ],
  },
};

export default nextConfig;
