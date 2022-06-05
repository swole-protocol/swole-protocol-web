/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: './',
  images: { loader: 'custom' },
}

module.exports = nextConfig