import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    transpilePackages: ['three'],
    experimental: {
        serverActions: {
            bodySizeLimit: "200mb",
        },
    },
};

export default nextConfig;
