import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['node:crypto', 'node:buffer', 'node:util', 'node:stream', 'node:events', 'node:http', 'node:https', 'node:url', 'node:zlib', 'node:os', 'node:assert', 'node:tls', 'node:net'],
};

export default nextConfig;
