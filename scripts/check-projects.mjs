import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

function checkProjects() {
  const readData = file => YAML.parse(readFileSync(new URL(`../data/en/${file}`, import.meta.url), 'utf8'));
  const username = readData('author.yaml').contactInfo.github;
  const projects = readData('sections/projects.yaml').projects;
  const base = `https://github.com/${username}/`.toLowerCase();
  const listed = new Map();
  const errors = [];

  for (const project of projects) {
    if (!project.repo) continue;
    const url = new URL(project.repo).href.replace(/\/$/, '').toLowerCase();
    if (!url.startsWith(base)) continue;
    if (listed.has(url)) errors.push(`Duplicate repository: ${project.repo}`);
    if (!project.name?.trim() || !project.summary?.trim()) errors.push(`Missing project name or summary: ${project.repo}`);
    listed.set(url, project.name);
  }

  // This public user endpoint includes forks and placeholders but never private
  // repositories. Use the CLI's authentication to avoid shared anonymous limits.
  const result = spawnSync('gh', [
    'api', `users/${encodeURIComponent(username)}/repos?type=owner&per_page=100`,
    '--paginate', '--slurp',
  ], { encoding: 'utf8', timeout: 30_000, maxBuffer: 10 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    const detail = result.stderr?.trim() || result.error?.message || `exit code ${result.status}`;
    throw new Error(`Cannot read the public repository inventory. Install GitHub CLI and sign in with gh auth login.\n${detail}`);
  }
  const pages = JSON.parse(result.stdout);
  if (!Array.isArray(pages) || pages.some(page => !Array.isArray(page))) {
    throw new Error('Expected a paginated GitHub repository inventory.');
  }
  const repositories = pages.flat();
  if (repositories.some(repo => repo.private !== false || !repo.html_url)) {
    throw new Error('Expected only public GitHub repositories.');
  }

  const current = new Set(repositories.map(repo => repo.html_url.toLowerCase()));
  for (const repo of repositories) {
    if (!listed.has(repo.html_url.toLowerCase())) errors.push(`Missing public repository: ${repo.html_url}`);
  }
  for (const url of listed.keys()) {
    if (!current.has(url)) errors.push(`Repository link is no longer in the public inventory; check for a rename or visibility change: ${url}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`All ${repositories.length} public GitHub repositories are listed exactly once (${projects.length} total project cards).`);
}

try {
  checkProjects();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
