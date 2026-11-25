import type { NextConfig } from "next";

// GitHub Pages serves this repo's site from /DEPLOYMENT-OF-WEB-APPLICATIONS/,
// so every page and asset URL needs that prefix. Update it if the repo is renamed.
const basePath = "/DEPLOYMENT-OF-WEB-APPLICATIONS";

const nextConfig: NextConfig = {
  // Build a fully static site (plain HTML, CSS and JS) into out/.
  output: "export",
  basePath,
  // next/image's default loader resizes images on a server, and a static
  // site has no server, so images are served as they are.
  images: { unoptimized: true },
  // next/image doesn't add basePath to src, so pages prefix it themselves.
  env: { BASE_PATH: basePath },
  // The create-next-app starter also turns on cacheComponents and
  // partialPrefetching. Both need a running server, and with output: "export"
  // the build fails with "PPR cannot be enabled in export mode", so they're off.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
