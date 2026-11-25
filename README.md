# DEPLOYMENT-OF-WEB-APPLICATIONS

A bare-bones static site built with [Next.js](https://nextjs.org) and deployed to GitHub Pages.

| Apps             | URLs                                                              |
| ---------------- | ----------------------------------------------------------------- |
| **Next.js site** | https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/ |

## What's where

| Path                           | What it is                                                         |
| ------------------------------ | ------------------------------------------------------------------ |
| `app/page.tsx`                 | The home page                                                      |
| `app/layout.tsx`               | The layout around every page, including the page title             |
| `app/globals.css`              | Global styles, using Tailwind CSS                                  |
| `public/`                      | Images and other files served as they are                          |
| `next.config.ts`               | Next.js settings: static export and the GitHub Pages base path     |
| `.github/workflows/deploy.yml` | Builds the site and deploys it to GitHub Pages on every push       |

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000/DEPLOYMENT-OF-WEB-APPLICATIONS. The page updates each time you save a file.

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server with hot reload |
| `npm run build` | Build the static site into `out/`    |
| `npm run lint`  | Check the code with ESLint           |

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci` installs the exact dependency versions in `package-lock.json`.
2. `npm run build` builds the site into `out/` as plain HTML, CSS and JavaScript, because `next.config.ts` sets `output: "export"`.
3. `out/` is published to GitHub Pages.

To redeploy without pushing, open the **Actions** tab, pick **Deploy to GitHub Pages**, and click **Run workflow**.

The repo's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment → Source).

### Things to know

- `basePath` in `next.config.ts` is `/DEPLOYMENT-OF-WEB-APPLICATIONS` because GitHub Pages serves the site from that sub-path. Change it if the repo is renamed.
- `next/link` adds the base path to links automatically, but `next/image` doesn't. For images in `public/`, start `src` with `process.env.BASE_PATH`, as `app/page.tsx` does.
- A static export can't use features that need a server, such as cookies, redirects, Server Actions or image resizing. See [Unsupported features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features) in the Next.js docs.
- There's no `npm start`. `next start` runs a Next.js server, and this project builds static files only.
- `node_modules/`, `.next/`, `out/` and `.env*` files are listed in `.gitignore`, so they're never committed.
- `AGENTS.md` comes from create-next-app, and `next dev` recreates it if it's deleted, so it stays committed.

## Changes from the create-next-app starter

The project began as the default `create-next-app` 16.4.6 starter. Changes since then:

- `next.config.ts`: turned on static export, set the GitHub Pages base path, and turned off image optimization, which needs a server.
- `next.config.ts`: turned off `cacheComponents` and `partialPrefetching`. The starter enables them, but they need a server and make a static export fail.
- `app/page.tsx`: added the base path to the image paths so the images load on GitHub Pages.
- `package.json`: removed the `start` script, which can't run with a static export.
- `app/page.tsx` and `app/layout.tsx`: replaced the starter's placeholder heading, text, buttons and page title with this site's own content.
