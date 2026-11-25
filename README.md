# DEPLOYMENT-OF-WEB-APPLICATIONS

A [Jekyll](https://jekyllrb.com) site, plus a React app built with [Vite](https://vite.dev) under `/app/`, both deployed to GitHub Pages.

| Site apps                                                                   | URLs                              |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| **Jekyll site app:** | https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/ |
| **React app:** | https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/app/ |

## What's where

| Path                                                                     | What it is                                      |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| `_config.yml`, `_posts/`, `index.markdown`, `about.markdown`, `404.html` | The Jekyll site, using the `minima` theme       |
| `Gemfile`, `Gemfile.lock`                                                | The Ruby gems the Jekyll site needs             |
| `app/`                                                                   | The React app, with its own `package.json`      |
| `.github/workflows/deploy.yml`                                           | Builds both and deploys them to GitHub Pages    |

## Install Ruby (macOS)

Jekyll needs Ruby 4.0. The Ruby that comes with macOS (2.6) is too old, and installing gems into it fails with `Gem::FilePermissionError`. Don't use `sudo` to get around this. Install a current Ruby with [Homebrew](https://brew.sh) and put it first on your `PATH`:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
ruby -v   # should print 4.x, not 2.6
```

The `4.0.0` in the path depends on the Ruby version Homebrew installs. If yours is different, use the gems path that `brew install ruby` prints at the end. On Intel Macs, change `/opt/homebrew` to `/usr/local`.

## Run the Jekyll site locally

From the repo root:

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. Jekyll rebuilds the site each time you save a file, except `_config.yml`, which needs a server restart. Press `Ctrl+C` to stop.

New posts go in `_posts/`, named `YYYY-MM-DD-title.markdown`.

The home page's "open the React app" link returns a 404 here, because `jekyll serve` builds only the Jekyll site. It works on GitHub Pages, where the deploy adds the React app. To work on the app, run it on its own (see the next section).

## Run the React app locally

Requires Node.js 20.19+ or 22.12+.

```bash
cd app
npm install
npm run dev
```

Then open http://localhost:5173/DEPLOYMENT-OF-WEB-APPLICATIONS/app/.

Run these commands from inside `app/`:

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build the production app into `app/dist/` |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Check the code with Oxlint                |

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Jekyll** builds the site at the repo root into `_site/`, with the base URL set to `/DEPLOYMENT-OF-WEB-APPLICATIONS` so links and CSS work on github.io.
2. **Vite** builds the React app into `app/dist/`.
3. `app/dist/` is copied to `_site/app/`.
4. `_site/` is published to GitHub Pages.

To redeploy without pushing, open the **Actions** tab, pick **Deploy to GitHub Pages**, and click **Run workflow**.

The repo's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment → Source). GitHub Actions also has to be able to run. If a deploy fails with "account is locked due to a billing issue", update the payment method in your GitHub billing settings and re-run it.

### Things to know

- In Jekyll pages and templates, build links with `relative_url`, for example `{{ "/about/" | relative_url }}`, so they include the `/DEPLOYMENT-OF-WEB-APPLICATIONS` prefix. A hardcoded leading `/` breaks on GitHub Pages.
- Don't give any Jekyll page the `/app/` path. The React app is copied there.
- `_config.yml` excludes `app/` and `README.md`, so Jekyll doesn't publish the React source code or this file.
- `base` in `app/vite.config.js` is `/DEPLOYMENT-OF-WEB-APPLICATIONS/app/`. Change it if the repo is renamed or the app moves.
- In the React code, build paths to files in `app/public/` from `import.meta.env.BASE_URL`, as `app/src/App.jsx` does for `icons.svg`.
- The deploy uses Ruby 4.0 and the exact gem versions in `Gemfile.lock`. If you add or update a gem, commit the new `Gemfile.lock`.
- The `minima` theme prints yellow Sass `DEPRECATION WARNING` lines during the build. They don't affect the site.

## Start a new Jekyll site from scratch

This repo's Jekyll site was created with Jekyll's quick start. To make another one, install Ruby first (see above), then run these commands outside this repo's folder:

```bash
gem install bundler jekyll
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

Then open http://localhost:4000.

| Command                      | What it does                                                 |
| ---------------------------- | ------------------------------------------------------------ |
| `gem install bundler jekyll` | Install Jekyll and Bundler (once per computer)               |
| `jekyll new <name>`          | Create a new site in the folder `<name>`                     |
| `bundle exec jekyll serve`   | Build and serve at http://localhost:4000, rebuilding on save |
| `bundle exec jekyll build`   | Build the site into `_site/` without starting a server       |
