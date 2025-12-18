import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization API
  },
  trailingSlash: true, // Better compatibility with static hosting
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

export default withBundleAnalyzer(nextConfig);
