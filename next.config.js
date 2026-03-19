/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://178.62.234.17/api/v1/:path*',
      },
      {
        source: '/health',
        destination: 'http://178.62.234.17/health',
      },
    ]
  },
}

module.exports = nextConfig
