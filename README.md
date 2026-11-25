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

## Jekyll quick start

GitHub Pages builds sites with [Jekyll](https://jekyllrb.com), a static site generator written in Ruby. These steps create and run a separate starter Jekyll site on your computer. Run them outside this repo's folder so the new site doesn't end up inside it.

### 1. Install Ruby (macOS)

Jekyll is too new for the Ruby that comes with macOS (2.6), and installing gems into that Ruby fails with `Gem::FilePermissionError`. Don't use `sudo` to get around this. Install a current Ruby with [Homebrew](https://brew.sh) and put it first on your `PATH`:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
ruby -v   # should print 4.x, not 2.6
```

The `4.0.0` in the path depends on the Ruby version Homebrew installs. If yours is different, use the gems path that `brew install ruby` prints at the end. On Intel Macs, change `/opt/homebrew` to `/usr/local`.

### 2. Create and serve a site

```bash
gem install bundler jekyll
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

Then open http://localhost:4000. Jekyll rebuilds the site each time you save a file. Press `Ctrl+C` to stop the server.

| Command                      | What it does                                                 |
| ---------------------------- | ------------------------------------------------------------ |
| `gem install bundler jekyll` | Install Jekyll and Bundler (once per computer)               |
| `jekyll new <name>`          | Create a new site in the folder `<name>`                     |
| `bundle exec jekyll serve`   | Build and serve at http://localhost:4000, rebuilding on save |
| `bundle exec jekyll build`   | Build the site into `_site/` without starting a server       |

The default `minima` theme prints yellow Sass `DEPRECATION WARNING` lines during the build. They don't affect the site.
