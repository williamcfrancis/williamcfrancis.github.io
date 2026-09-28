# William Francis's website

Hugo generates the portfolio, Games, Arcade, Posts, and Photo Gallery pages. The
Toha theme is pinned as a Git submodule; local templates in `layouts/` override it.
Netlify builds and hosts the site, including its serverless functions.

## Setup

- Node.js 24 and npm.
- **Hugo Extended 0.100.2**. The pinned Toha theme relies on this Hugo version;
  upgrade Hugo and the theme together after verifying all templates.
- Initialize the theme with `git submodule update --init --recursive`.
- Install the root workspace lockfile with `npm ci`.

If Hugo is not on `PATH`, set `HUGO_BINARY` to the executable's absolute path.
For example in PowerShell: `$env:HUGO_BINARY = 'C:\Tools\hugo\hugo.exe'`.

## Everyday commands

```sh
npm run check          # TypeScript, tests, catalog and API-route validation
npm run build          # All checks, games, Hugo, published routes, native functions
npm run build:functions # Package and validate native Netlify functions offline
npm run preview        # Serve the existing public/ build on localhost:1313
npm run dev:site       # Stage/build games once, then run Hugo's development server
npm run dev -- turing_shuffle
```

`npm run build:site` skips the initial checks for iteration but still validates
the generated catalog. Additional Hugo options can be forwarded, for example
`npm run build:site -- --baseURL https://example.net/`.

`npm run dev:site` watches Hugo content and templates. When editing a game, use
its Vite server (`npm run dev -- <name>`) for live updates. After changing ordinary
files under `static/`, restart `dev:site` to refresh the staged static copy.

The build stages ordinary static files and all nine Vite games under
`.build/static/`, then asks Hugo to publish to `public/`. Workspace sources,
development helpers, nested `dist/`, dependencies, and source maps are excluded.
Standalone games keep their runtime JS and CSS, including `src/` files used by
Wizard Brawl.
Checked-in Vite snapshots under `static/games/` are ignored by this pipeline;
the current workspace source is always rebuilt. Both output directories are
ignored by Git, and generated bundles do not need to be committed.

## Repository map

- `config.yaml`: Hugo settings and site metadata.
- `data/en/`: author, professional sections, and the shared game catalog in
  `personal.yaml`.
- `content/`, `layouts/`, `assets/`: Hugo pages, local template overrides, and
  source assets such as preview images.
- `games/<name>/`: all Vite/TypeScript game sources, including Scale of Autonomy
  and One Trillion Parameters. See [the games guide](games/README.md).
- `static/games/<name>/`: standalone HTML/JavaScript games and legacy compiled
  snapshots. Only standalone games are copied into the new build.
- `netlify/functions/`, `netlify/handlers/`, `netlify/lib/`: the two deployable
  entry points, endpoint handlers, and shared backend code. See
  [function behavior and limits](netlify/README.md).
- `scripts/`, `tests/`: the shared build pipeline and regression checks.

## Local functions

Use [Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/)
for a local environment that emulates redirects, functions, and Blobs:

```sh
npx netlify-cli dev
```

The configured site proxy listens at `http://localhost:8888`, forwards Hugo from
port 1313, and serves functions on port 9999. Vite game servers also proxy
`/.netlify/functions` to port 9999. For game-only work, start only the backend in
one terminal, then the game in another:

```sh
npx netlify-cli functions:serve --functions netlify/functions --port 9999
npm run dev -- lost_in_translation
```

Set provider credentials in your local shell or an ignored `.env` file. The
existing credential names are `GEMINI_API_KEY`, `GROQ_API_KEY`,
`GOOGLE_TRANSLATE_API_KEY`, and optional `POLLINATIONSAI_API_KEY`. Configure
production values through Netlify's environment variable settings. API keys must
never be added to game source, browser bundles, or committed config files.

The static preview command intentionally serves files only. Use Netlify Dev
when testing AI requests, quiz persistence, redirects, or other platform behavior.

## Deployment and verification

Netlify is the canonical deployment target. Production uses `npm ci && npm run
build`; preview and branch deploys use the same checks with their own base URL.
The GitHub Actions workflow validates pull requests and the `source` branch
without deploying a second copy of the site. The obsolete Jekyll/GitHub Pages
deployments and unrelated CNAME have been removed.

Before merging changes, run `npm run build`, then check affected pages or games
in the browser. The automated checks cover type errors, catalog routes and
preview resources, static staging exclusions, and backend regression cases.
They do not replace gameplay, mobile, graphics, audio, or provider-backed testing.

`npm run validate:functions` checks the source declarations covering all five API
endpoints with two rate-limited route patterns. `npm run build:functions` uses
Netlify's pinned native bundler, validates the emitted traffic rules, ESM runtime,
and quiz data, then runs 50 input/preflight checks against the packaged handlers.
Outbound fetch is disabled during those checks, so they cannot contact providers
or write quiz statistics even when credentials exist in the environment.
Artifacts and the inspectable manifest are written to `.build/functions/`.
The full build and all Netlify deploy contexts include this check. Actual platform
rate enforcement still requires a deploy preview; a local check cannot prove it.

GitHub Actions also runs `npm audit --audit-level=moderate` after the clean install
so dependency advisories at moderate severity or higher fail validation.
