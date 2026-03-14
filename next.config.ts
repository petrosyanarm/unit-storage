import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   turbopack: {
    rules: {
      '*.svg': [
        {
          condition: 'browser',
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      
      ],
    },
  },
};

export default nextConfig;
