import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /* We need to explicitly allow images from external sources for security reasons */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-3.listennotes.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'bipolar-compass-image-storage.s3.eu-north-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'books.google.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
