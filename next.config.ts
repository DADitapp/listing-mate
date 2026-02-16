import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Shim out the internal Next.js module causing the dynamic require error
      'next/dist/server/node-environment-extensions/node-crypto.js':
        '/opt/buildhome/repo/src/lib/noop.js',
    };
    return config;
  },
};

export default nextConfig;
