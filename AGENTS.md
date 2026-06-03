# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a Hugo static portfolio site with an npm-workspace monorepo for browser games. The site uses the **Toha** theme (git submodule at `themes/toha`). Three games (`void_strike`, `neon_breach`, `botanical_brawl`) are Vite/TypeScript builds; the remaining games are static HTML/JS under `static/games/`.

### System dependencies

- **Node.js 24** — required by `netlify.toml`.
- **Hugo v0.100.2 (extended)** — install from [GitHub releases](https://github.com/gohugoio/hugo/releases/tag/v0.100.2). Must be the `extended` variant (needed for SCSS).

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` (from repo root) |
| Build games | `npm run build:games` |
| Build full site | `hugo --gc --minify` |
| Dev server (Hugo) | `hugo server --bind 0.0.0.0 --port 1313 --disableFastRender` |
| Dev server (single game) | `npm run dev -- <game_name>` (e.g. `void_strike`) |
| Full production build | `npm install && npm run build:games && hugo --gc --minify` |

### Caveats

- Git submodules must be initialized before Hugo can build: `git submodule update --init --recursive`.
- The Vite game builds output to `static/games/<name>/`. These built files are committed to the repo so Hugo can serve them. After running `npm run build:games`, Hugo picks them up as static assets.
- Hugo's dev server (`hugo server`) serves the site with live-reload. It does **not** serve Netlify Functions. To test serverless functions locally (weapon forge in Wizard Brawl / Botanical Brawl), install `netlify-cli` and use `netlify dev`.
- The serverless functions (`netlify/functions/`) require `GEMINI_API_KEY` env var for AI weapon generation; they gracefully degrade without it.
- There are no automated test suites or lint commands configured in `package.json`. The `.pre-commit-config.yaml` defines hooks for YAML/JSON/TOML validation, markdown linting, and trailing whitespace, but these are CI-only (`ci:` block).
