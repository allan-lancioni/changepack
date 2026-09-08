#!/usr/bin/env node
// Is there a newer changekit? Prints nothing when there is not, which is the
// ordinary outcome, and never fails: offline, unresolvable or forbidden all
// look the same as up to date. No dependencies, no writes, no questions.
//
// Run from the root of the repository being governed:
//
//     node .claude/skills/changekit/check-update.mjs

import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const UPSTREAM = 'https://github.com/allan-lancioni/changekit';
const RAW = 'https://raw.githubusercontent.com/allan-lancioni/changekit';
const TIMEOUT = 10000;

// Every exit but the one that has something to say is this one.
const silence = () => process.exit(0);

// A configuration line is `- **key:** value`, or `key: value` where somebody
// wrote it plainly. Only the value matters, and only its first words.
const field = (text, key) => {
  const m = text.match(new RegExp(`^\\s*[-*]?\\s*\\**${key}:\\**\\s*(.*)$`, 'm'));
  return m ? m[1].trim() : null;
};

const SEMVER = /^\d+\.\d+\.\d+$/;

// Version order, not string order: 1.10.0 is newer than 1.9.0.
const compare = (a, b) => {
  const x = a.split('.').map(Number);
  const y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

const get = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(String(res.status));
  return res.text();
};

// 1. Read the configuration. `off` returns before anything reaches the network.
const config = resolve(process.cwd(), 'CHANGEKIT.md');
if (!existsSync(config)) silence();
const text = readFileSync(config, 'utf8');

const updates = (field(text, 'updates') ?? '').toLowerCase().split(/\s+/);
if (updates[0]?.startsWith('off')) silence();
const held = updates[0]?.startsWith('hold') ? updates[1]?.replace(/[^\d.]/g, '') : null;

const installed = (field(text, 'changekit') ?? '').split(/\s+/)[0];
if (!SEMVER.test(installed)) silence();

// 2. Resolve the upstream. Its latest tag, or `version` on `main` where the
//    upstream carries no tag at all. Where neither answers, because the
//    machine is offline or the command was not permitted, there is nothing
//    to say.
let latest = null;
let ref = null;

const ls = spawnSync('git', ['ls-remote', '--tags', '--refs', UPSTREAM], {
  encoding: 'utf8',
  timeout: TIMEOUT,
  stdio: ['ignore', 'pipe', 'ignore'],
  env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
});

if (ls.status === 0 && ls.stdout) {
  const tags = ls.stdout
    .split('\n')
    .map((line) => line.split('refs/tags/')[1]?.trim())
    .filter(Boolean)
    .filter((tag) => SEMVER.test(tag.replace(/^v/, '')));
  if (tags.length) {
    ref = tags.sort((a, b) => compare(a.replace(/^v/, ''), b.replace(/^v/, ''))).pop();
    latest = ref.replace(/^v/, '');
  }
}

if (!latest) {
  try {
    const pkg = JSON.parse(await get(`${RAW}/main/package.json`));
    if (SEMVER.test(pkg.version ?? '')) {
      latest = pkg.version;
      ref = 'main';
    }
  } catch {
    silence();
  }
}

if (!latest) silence();

// 3. Nothing to report where the latest is not newer than what runs here, or
//    not newer than the version `updates:` holds.
if (compare(latest, installed) <= 0) silence();
if (held && SEMVER.test(held) && compare(latest, held) <= 0) silence();

// 4. The changelog at that ref. Each `## <version>` section ends with a
//    paragraph opening `Updating:`, and that paragraph is the cost. It is
//    wrapped in the source, so it is joined back into the one line it is.
let changelog;
try {
  changelog = await get(`${RAW}/${ref}/CHANGELOG.md`);
} catch {
  silence();
}

const releases = [];
let current = null;
let collecting = false;
for (const line of changelog.split('\n')) {
  const heading = line.match(/^##\s+(\S+)\s*$/);
  if (heading) {
    current = { version: heading[1], cost: [] };
    collecting = false;
    releases.push(current);
    continue;
  }
  if (!current) continue;
  if (collecting) {
    if (line.trim() === '') collecting = false;
    else current.cost.push(line.trim());
    continue;
  }
  if (!current.cost.length && line.startsWith('Updating:')) {
    current.cost.push(line.trim());
    collecting = true;
  }
}

const between = releases
  .filter((r) => SEMVER.test(r.version))
  .filter((r) => compare(r.version, installed) > 0 && compare(r.version, latest) <= 0)
  .sort((a, b) => compare(a.version, b.version));

const say = (m) => process.stdout.write(m + '\n');

say(`changekit ${latest} is available at \`${ref}\`; you run ${installed}.`);
if (between.length) {
  say('');
  const width = Math.max(...between.map((r) => r.version.length));
  for (const r of between)
    say(`${r.version.padEnd(width)}  ${r.cost.join(' ') || 'Updating: not stated.'}`);
}
