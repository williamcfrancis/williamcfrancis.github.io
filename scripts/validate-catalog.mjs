import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'yaml';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const accents = new Set(['cyan', 'green', 'amber', 'teal', 'pink', 'sky', 'rose', 'violet', 'coral']);

// Hugo minifies some attributes without quotes. Accept either representation.
export function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? match[4]]));
}

function safeRelative(value) {
  return typeof value === 'string' && value.trim().length > 0 && !value.startsWith('/') && !value.includes('\\')
    && !value.split('/').some((part) => part === '..' || part === '.') && !value.includes(':');
}

function isFile(filename) {
  try { return statSync(filename).isFile(); } catch { return false; }
}

function checkLocalAssets(html, route, output, errors) {
  for (const tag of html.matchAll(/<(?:img|script|link)\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)) {
    const attrs = attributes(tag[0]);
    const candidates = [];
    if (attrs.src) candidates.push(attrs.src);
    if (attrs.href && /stylesheet|icon|preload|modulepreload/.test(attrs.rel ?? '')) candidates.push(attrs.href);
    if (attrs.srcset) candidates.push(...attrs.srcset.split(',').map((part) => part.trim().split(/\s+/)[0]));
    for (const candidate of candidates) {
      if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(candidate)) continue;
      let pathname;
      try { pathname = decodeURIComponent(new URL(candidate, `https://site.test${route}`).pathname); }
      catch { errors.push(`${route}: invalid asset URL ${candidate}`); continue; }
      const destination = path.resolve(output, `.${pathname}`);
      if (!destination.startsWith(`${output}${path.sep}`) || !isFile(destination)) {
        errors.push(`${route}: missing published asset ${candidate}`);
      }
    }
  }
}

export function validateCatalog({ root = defaultRoot, output } = {}) {
  root = path.resolve(root);
  const errors = [];
  let games = [];
  try {
    const data = parse(readFileSync(path.join(root, 'data/en/personal.yaml'), 'utf8'));
    const sections = data.sections?.filter((entry) => entry.section?.id === 'games' && entry.section.enable);
    if (sections?.length !== 1 || !Array.isArray(sections[0].games) || !sections[0].games.length) {
      throw new Error('Expected one enabled games section with a nonempty games array.');
    }
    games = sections[0].games;
  } catch (error) {
    return { games, errors: [`Cannot read game catalog: ${error.message}`] };
  }

  const titles = new Set();
  const routes = new Set();
  for (const [index, game] of games.entries()) {
    if (!game || typeof game !== 'object' || Array.isArray(game)) { errors.push(`Game ${index + 1}: expected an object`); continue; }
    const label = game.title || `Game ${index + 1}`;
    for (const field of ['title', 'genre', 'summary', 'icon']) {
      if (typeof game[field] !== 'string' || !game[field].trim()) errors.push(`${label}: missing ${field}`);
    }
    if (titles.has(game.title)) errors.push(`${label}: duplicate title`);
    titles.add(game.title);
    if (!accents.has(game.accent)) errors.push(`${label}: unsupported accent`);
    if (!Array.isArray(game.tags) || !game.tags.length || game.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
      errors.push(`${label}: tags must be a nonempty list of strings`);
    }
    if (typeof game.link?.label !== 'string' || !game.link.label.trim()) errors.push(`${label}: missing link label`);
    const route = game.link?.url;
    if (routes.has(route)) errors.push(`${label}: duplicate route ${route}`);
    routes.add(route);
    const match = typeof route === 'string' && /^\/games\/([a-z0-9_]+)\/$/.exec(route);
    if (!match) errors.push(`${label}: expected a canonical /games/<slug>/ route`);
    else {
      const source = path.join(root, 'games', match[1]);
      const standalone = path.join(root, 'static', route.slice(1), 'index.html');
      const buildable = existsSync(path.join(source, 'package.json')) && existsSync(path.join(source, 'index.html'));
      if (!buildable && !existsSync(standalone)) errors.push(`${label}: missing playable route ${route}`);
    }
    if (!safeRelative(game.image) || !['assets', 'static'].some((base) => isFile(path.join(root, base, game.image)))) {
      errors.push(`${label}: missing or unsafe preview ${game.image}`);
    }
  }

  if (output) {
    output = path.resolve(root, output);
    for (const route of ['/games/', '/arcade/', ...routes]) {
      if (typeof route !== 'string' || !/^\/(?:games|arcade)\/(?:[a-z0-9_]+\/)?$/.test(route)) continue;
      const filename = path.join(output, route.slice(1), 'index.html');
      if (!existsSync(filename)) { errors.push(`${route}: missing published page`); continue; }
      const html = readFileSync(filename, 'utf8');
      checkLocalAssets(html, route, output, errors);
      if (route !== '/games/' && route !== '/arcade/') continue;
      if (!/<html\b[^>]*\blang=(?:["']en["']|en[\s>])/i.test(html)) errors.push(`${route}: missing HTML language`);
      const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map((match) => attributes(match[0]));
      if (!tags.some((tag) => tag.name === 'description' && tag.content?.trim())) errors.push(`${route}: missing description`);
      if (!tags.some((tag) => tag.rel === 'canonical' && /^https?:\/\//.test(tag.href))) errors.push(`${route}: missing canonical URL`);
      if (route === '/games/') {
        const cards = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
          .filter((attrs) => attrs.class?.split(/\s+/).includes('games-cabinet'));
        const publishedRoutes = cards.map((card) => card.href);
        if (JSON.stringify(publishedRoutes) !== JSON.stringify([...routes])) errors.push('Games page differs from the catalog');
        const previews = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => attributes(match[0]))
          .filter((attrs) => attrs.alt?.endsWith(' preview'));
        if (previews.length !== games.length || previews.some((img) => !img.width || !img.height || !img.srcset)) {
          errors.push('Game previews must include responsive sources and dimensions');
        }
        if (previews.slice(4).some((img) => img.loading !== 'lazy')) errors.push('Below-the-fold game previews must be lazy loaded');
        for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
          const href = attributes(match[0]).href;
          if (/^(?:#|\/games\/#)(?:home|about|skills|experiences|education|projects)$/.test(href ?? '')) {
            errors.push(`Games page contains a broken homepage anchor: ${href}`);
          }
        }
      } else {
        const catalogScript = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
          .find((match) => attributes(match[1]).id === 'game-catalog');
        try {
          const arcade = JSON.parse(catalogScript?.[2]);
          if (JSON.stringify(arcade.map((game) => game.url)) !== JSON.stringify([...routes])) errors.push('Arcade differs from the catalog');
        } catch { errors.push('Arcade must contain the generated game catalog'); }
      }
    }
  }
  return { games, errors };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length && (args[0] !== '--output' || args.length !== 2)) throw new Error('Usage: node scripts/validate-catalog.mjs [--output public]');
  const { games, errors } = validateCatalog({ output: args[1] });
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else console.log(`Validated ${games.length} games, previews, and routes${args[1] ? ` in ${args[1]}` : ''}.`);
}
