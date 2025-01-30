import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {hostname: 'images.unsplash.com'},
      {hostname: 'https://raffle.ignishub.com.br'},
      {hostname: 'res.cloudinary.com'}
    ]
  }
};

export default nextConfig;
