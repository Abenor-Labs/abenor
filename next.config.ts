import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Webpack's default xxhash64 runs through WebAssembly, which throws
    // "Cannot read properties of undefined (reading 'length')" in WasmHash
    // ._updateWithBuffer on Node 24.19. It is content-dependent, so it fails
    // intermittently rather than every build. sha256 avoids wasm entirely.
    config.output.hashFunction = "sha256";
    return config;
  },
};

export default nextConfig;
