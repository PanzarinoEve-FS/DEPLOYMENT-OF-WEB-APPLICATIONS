# DEPLOYMENT-OF-WEB-APPLICATIONS

A bare-bones static site built with [Next.js](https://nextjs.org) and served under `/app/`, next to a [Jekyll](https://jekyllrb.com) site at the main URL. Both are deployed to GitHub Pages.

| Apps             | URLs                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| **Next.js site** | https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/app/ |
| **Jekyll site**  | https://panzarinoeve-fs.github.io/DEPLOYMENT-OF-WEB-APPLICATIONS/     |

## What's where

| Path                           | What it is                                                        |
| ------------------------------ | ----------------------------------------------------------------- |
| `app/page.tsx`                 | The Next.js home page                                             |
| `app/layout.tsx`               | The layout around every Next.js page, including the page title    |
| `app/globals.css`              | Global styles for the Next.js site, using Tailwind CSS            |
| `public/`                      | Images and other files the Next.js site serves as they are        |
| `next.config.ts`               | Next.js settings: static export and the `/app/` base path         |
| `jekyll/`                      | The Jekyll site, using the `minima` theme, with its own `Gemfile` |
| `.github/workflows/deploy.yml` | Builds both sites and deploys them to GitHub Pages on every push  |

## Run the Next.js site locally

Requires Node.js 20.9 or newer. From the repo root:

```bash
npm install
npm run dev
```

Then open http://localhost:3000/DEPLOYMENT-OF-WEB-APPLICATIONS/app. The page updates each time you save a file.

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server with hot reload |
| `npm run build` | Build the static site into `out/`    |
| `npm run lint`  | Check the code with ESLint           |

## Run the Jekyll site locally

Requires Ruby 4.0 (see [Install Ruby](#install-ruby-macos) below). From the repo root:

```bash
cd jekyll
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. Jekyll rebuilds the site each time you save a file, except `_config.yml`, which needs a server restart. Press `Ctrl+C` to stop.

New posts go in `jekyll/_posts/`, named `YYYY-MM-DD-title.markdown`.

The home page's "open the Next.js site" link returns a 404 here, because `jekyll serve` builds only the Jekyll site. It works on GitHub Pages, where the deploy adds the Next.js site. To work on the Next.js site, run it on its own (see above).

### Install Ruby (macOS)

The Ruby that comes with macOS (2.6) is too old for Jekyll, and installing gems into it fails with `Gem::FilePermissionError`. Don't use `sudo` to get around this. Install a current Ruby with [Homebrew](https://brew.sh) and put it first on your `PATH`:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
ruby -v   # should print 4.x, not 2.6
```

The `4.0.0` in the path depends on the Ruby version Homebrew installs. If yours is different, use the gems path that `brew install ruby` prints at the end. On Intel Macs, change `/opt/homebrew` to `/usr/local`.

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Jekyll** builds `jekyll/` into `jekyll/_site/`, with the base URL set to `/DEPLOYMENT-OF-WEB-APPLICATIONS` so links and CSS work on github.io.
2. **Next.js** builds the site at the repo root into `out/` as plain HTML, CSS and JavaScript, because `next.config.ts` sets `output: "export"`.
3. `out/` is copied to `jekyll/_site/app/`.
4. `jekyll/_site/` is published to GitHub Pages.

To redeploy without pushing, open the **Actions** tab, pick **Deploy to GitHub Pages**, and click **Run workflow**.

The repo's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment → Source). GitHub Actions also has to be able to run. If a deploy fails with "account is locked due to a billing issue", update the payment method in your GitHub billing settings and re-run it.

### Things to know

- `basePath` in `next.config.ts` is `/DEPLOYMENT-OF-WEB-APPLICATIONS/app` because GitHub Pages serves the repo from `/DEPLOYMENT-OF-WEB-APPLICATIONS/` and the Next.js site lives under `/app/`. Change it if the repo is renamed or the site moves.
- `next/link` adds the base path to links automatically, but `next/image` doesn't. For images in `public/`, start `src` with `process.env.BASE_PATH`, as `app/page.tsx` does.
- A static export can't use Next.js features that need a server, such as cookies, redirects, Server Actions or image resizing. See [Unsupported features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features) in the Next.js docs.
- There's no `npm start`. `next start` runs a Next.js server, and this project builds static files only.
- In Jekyll pages and templates, build links with `relative_url`, for example `{{ "/about/" | relative_url }}`, so they include the `/DEPLOYMENT-OF-WEB-APPLICATIONS` prefix. A hardcoded leading `/` breaks on GitHub Pages.
- Don't give any Jekyll page the `/app/` path. The Next.js site is copied there.
- The Jekyll site's title, footer text and footer links are set in `jekyll/_config.yml`: `title`, `author`, `student_number`, `school_lines`, `email`, `course_dates`, `github_username`, `github_username_heading`, `github_links`, `footer_lines` and `course_modules`. Each module's `url` sets where its footer link goes. The top menu lists only the pages in `header_pages`. `jekyll/_includes/footer.html` and `jekyll/_includes/social.html` are copies of the theme's templates, changed to show these settings.
- CSS changes for the Jekyll site go in `jekyll/assets/main.scss`, after `@import "minima"`. It widens the layout to 1400px and makes the footer three equal columns on screens wider than 800px. Don't edit `jekyll/_site/assets/main.css`, which every build rewrites.
- The modules are posts in `jekyll/_posts/`, dated by the week each module starts, and the Module 1 post links to the Next.js site. Each post's `permalink` keeps its address at `/module-1/` to `/module-4/`. `future: true` in `jekyll/_config.yml` shows posts dated after today, and `jekyll/_layouts/home.html` (a copy of the theme's home layout) lists posts oldest first, so the home page reads Module 1 to Module 4.
- The Jekyll build uses Ruby 4.0 and the exact gem versions in `jekyll/Gemfile.lock`. If you add or update a gem, commit the new `jekyll/Gemfile.lock`.
- The `minima` theme prints yellow Sass `DEPRECATION WARNING` lines during the Jekyll build. They don't affect the site.
- `node_modules/`, `.next/`, `out/`, `jekyll/_site/` and `.env*` files are listed in `.gitignore`, so they're never committed.
- `AGENTS.md` comes from create-next-app, and `next dev` recreates it if it's deleted, so it stays committed.

## Changes from the create-next-app starter

The Next.js site began as the default `create-next-app` 16.4.6 starter. Changes since then:

- `next.config.ts`: turned on static export, set the base path to `/DEPLOYMENT-OF-WEB-APPLICATIONS/app`, and turned off image optimization, which needs a server.
- `next.config.ts`: turned off `cacheComponents` and `partialPrefetching`. The starter enables them, but they need a server and make a static export fail.
- `app/page.tsx`: added the base path to the image paths so the images load on GitHub Pages.
- `package.json`: removed the `start` script, which can't run with a static export.
- `app/page.tsx` and `app/layout.tsx`: replaced the starter's placeholder heading, text, buttons and page title with this site's own content.
- `eslint.config.mjs`: skips `jekyll/`, which has no JavaScript source.

## Start a new Jekyll site from scratch

The Jekyll site in `jekyll/` was created with Jekyll's quick start. To make another one, install Ruby first (see above), then run these commands outside this repo's folder:

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
