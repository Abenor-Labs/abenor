import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM examples; keep them out of the server bundle path
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['@react-three/drei'],
  },
  // Avatar requests q82. Next 16 rejects any quality not declared here, so
  // this is not cosmetic — it is the upgrade blocker paid off early.
  images: {
    qualities: [82],
  },
}

export default nextConfig
