# Games

Source code and build setup for the games hosted on the site.

## Structure

| Location | Purpose |
|----------|---------|
| `games/<name>/` | Game **source** (Vite/TypeScript or static). Each game has its own `package.json` and `vite.config.ts` (or is plain HTML). |
| `static/games/<name>/` | **Built** output served by Hugo. Playable at `/games/<name>/`. |

- **Vite-built games** (output goes to `static/games/<name>/`): `void_strike`, `botanical_brawl`, `neon_breach`, `machine_gaze`
- **Static games** (no build; files live directly in `static/games/<name>/`): `lily_leap`, `glow_hop`, `lexical_hazard`, `lyrically_lost`, `abyss`, `algorithm_simulator`, `wizard_brawl`

Shared build config and utilities: `games/_shared/`, `games/_template/` (scaffold for new games).

## Building games for the website

From the **repository root**:

```bash
npm ci
npm run build:games
```

This builds every game under `games/` that has a `package.json` (excluding `_template` and `_shared`) and writes output to `static/games/<name>/`. Commit the generated `static/games/` folders so the site hosts all games.

## Per-game build (optional)

```bash
cd games/void_strike
npm ci
npm run build
```

Output is written to `static/games/void_strike/` (see `games/_shared/vite.base.ts`).

## Organization

- **One game per directory** under `games/` and `static/games/`.
- **Dev/test tools** for a game (e.g. image API tests) live under `static/games/<name>/dev/` so they don’t clutter the main play URL.
- Game listing and metadata are in `data/en/personal.yaml`; the Games section template is `layouts/partials/personal/games.html`.
