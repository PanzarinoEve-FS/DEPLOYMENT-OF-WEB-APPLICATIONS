import type { NextConfig } from "next";

// GitHub Pages serves this repo's site from /<repo name>/, and the Jekyll site
// (in jekyll/) owns that root, so this site lives under /app/. Every page and
// asset URL needs this prefix. The deploy workflow passes the real Pages path
// in PAGES_BASE_PATH, so a renamed repo keeps working; builds on your computer
// fall back to the current repo name.
const pagesBasePath =
  process.env.PAGES_BASE_PATH ?? "/Deployment-of-Web-Applications";
const basePath = `${pagesBasePath}/app`;

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
