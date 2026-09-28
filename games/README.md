# Games

Source code and build setup for the games hosted on the site. Run all package
commands from the repository root; the root lockfile manages every workspace.

## Structure

| Location | Purpose |
|----------|---------|
| `games/<name>/` | Game **source** (Vite/TypeScript or static). Each game has its own `package.json` and `vite.config.ts` (or is plain HTML). |
| `.build/static/games/<name>/` | Generated Vite output staged for Hugo. Playable at `/games/<name>/`. |
| `static/games/<name>/` | Standalone static games and old compiled snapshots. Built workspace snapshots are excluded from deployments. |

- **Vite games**: `botanical_brawl`, `how_many`, `lost_in_translation`,
  `machine_gaze`, `neon_breach`, `scale_of_autonomy`, `trillion_parameters`,
  `turing_shuffle`, and `void_strike`.
- **Static games** live directly in `static/games/<name>/` and do not need npm.

Shared build config and utilities: `games/_shared/`, `games/_template/` (scaffold for new games).

## Building games for the website

From the **repository root**:

```bash
npm ci
npm run build
```

The shared build discovers every directory under `games/` that has a
`package.json`, excluding directories whose names start with `_`. It typechecks
all games before bundling, rebuilds their assets in `.build/static/games/`, then
generates the Hugo site in `public/`. Commit source and the root lockfile, not
generated bundles. `npm run build:games` rebuilds only game outputs.

## Per-game build (optional)

```bash
npm run dev -- void_strike
npm run build --workspace void-strike
```

Output is written to `.build/static/games/void_strike/` (see
`games/_shared/vite.base.ts`). Vite proxies function calls to localhost:9999;
the [root README](../README.md#local-functions) explains backend setup.

## Dependency maintenance

Machine Gaze pins Transformers.js to `4.3.0`, which supports the patched
`sharp` `0.35.4` dependency. A `sharp` override under Transformers.js 3 leaves an
invalid dependency range, so upgrade the supported package instead. Recheck all
three image pipelines in the browser when updating Transformers.js or ONNX Runtime.

The root `package.json` overrides `uuid` to `11.1.1` only for
`vite-plugin-top-level-await`: its current release pins vulnerable `uuid` 10,
while version 11 preserves the CommonJS API the plugin uses. Remove this override
when an upstream plugin release includes a patched compatible dependency.

Keep the root lockfile and use `npm ci`. It retains `@swc/core` `1.15.18` because
`1.16.2` fails this plugin's production transform with `missing field type`.
There is no additional SWC override; the committed lockfile preserves the tested
resolution while allowing a deliberate plugin/compiler upgrade. Avoid regenerating
the entire lockfile for a targeted update, and run the full build after compiler
changes. The current dependency set passed a clean `npm ci`, `npm audit` with zero
advisories, all game typechecks, and Machine Gaze/Neon Breach production builds.

## Organization

- Keep Vite source under `games/<name>/` and use the shared Vite configuration.
- Keep developer helpers outside `static/`; existing `dev/` directories are
  excluded from published output.
- Register every public game once in `data/en/personal.yaml`. Games and Arcade
  both render this catalog. Add its preview resource under `assets/images/games/`.
- Scaffold a project with `npm run new-game -- my_game`, run `npm install` to
  refresh the root lockfile, then add its metadata and preview before building.
- Every built game must have `tsconfig.json`; `npm run typecheck` checks all
  discovered games and fails if a config is missing.
