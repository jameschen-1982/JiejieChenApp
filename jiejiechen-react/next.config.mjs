/** @type {import('next').NextConfig} */
const nextConfig = {
  // compress: false,
  output: 'standalone',
  experimental: {
    // esmExternals: false, // optional
    // externalDir: true, // optional
    // outputFileTracingRoot: path.join(__dirname, '../../'), // monorepo option
    appDir: true
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
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
};

export default nextConfig;
