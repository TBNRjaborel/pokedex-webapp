import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'assets.pokemon.com',
            pathname: '/assets/cms2/img/pokedex/full/**',
        },
    ],
},
};

export default nextConfig;
