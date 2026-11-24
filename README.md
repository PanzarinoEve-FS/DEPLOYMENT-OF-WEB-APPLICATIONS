# DEPLOYMENT-OF-WEB-APPLICATIONS

A React app built with [Vite](https://vite.dev) and deployed to GitHub Pages through Jekyll.

**Live site:** https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Then open http://localhost:5173/DEPLOYMENT-OF-WEB-APPLICATIONS/.

| Command           | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload   |
| `npm run build`   | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally     |
| `npm run lint`    | Check the code with Oxlint             |

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Vite** builds the React app into `dist/`.
2. **Jekyll** builds `dist/` into `_site/` with `actions/jekyll-build-pages`, the same builder GitHub Pages uses by default.
3. `_site/` is published to GitHub Pages.

To redeploy without pushing, open the **Actions** tab, pick **Deploy to GitHub Pages**, and click **Run workflow**.

The repo's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment → Source).

### Things to know

- `base` in `vite.config.js` is `/DEPLOYMENT-OF-WEB-APPLICATIONS/` because GitHub Pages serves the site from that sub-path. Change it if the repo is renamed.
- When code references a file in `public/`, build the path from `import.meta.env.BASE_URL` (as `src/App.jsx` does for `icons.svg`). A hardcoded leading `/` points outside the site on GitHub Pages.
- Jekyll skips files whose names start with `_` or `.`, so don't give files in `public/` names like that.
