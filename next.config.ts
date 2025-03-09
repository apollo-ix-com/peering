import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["app", "packages"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    localPatterns: [
      {
        pathname: "/public/images/logo/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
        // port: "",
        // pathname: "/ajax/libs/leaflet/1.7.1/images/**",
        // search: "",
        // https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png
      },
    ],
  },
};

export default nextConfig;
