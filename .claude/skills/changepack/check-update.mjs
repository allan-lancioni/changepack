#!/usr/bin/env node
// Is there a newer changepack? Prints nothing when there is not, which is the
// ordinary outcome, and never fails: offline, unresolvable or forbidden all
// look the same as up to date. No dependencies, no writes, no questions.
//
// Run from the root of the repository being governed:
//
//     node .claude/skills/changepack/check-update.mjs

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// One document answers the whole question. The registry returns every
// published version's manifest, so the latest version and what each release
// between here and there costs arrive together, in one request.
const REGISTRY = 'https://registry.npmjs.org/changepack';
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

// 1. Read the configuration. `off` returns before anything reaches the network.
const config = resolve(process.cwd(), 'CHANGEPACK.md');
if (!existsSync(config)) silence();
const text = readFileSync(config, 'utf8');

const updates = (field(text, 'updates') ?? '').toLowerCase().split(/\s+/);
if (updates[0]?.startsWith('off')) silence();
const held = updates[0]?.startsWith('hold') ? updates[1]?.replace(/[^\d.]/g, '') : null;

const installed = (field(text, 'changepack') ?? '').split(/\s+/)[0];
if (!SEMVER.test(installed)) silence();

// An update installs into a quiet tree, so a package still open is the whole
// answer: say the version exists and stop. Without this a package nobody
// closes means the check never speaks, because closure is what runs it.
const changes = (field(text, 'changes') ?? 'changes/').split(/\s+/)[0];
const active = resolve(process.cwd(), changes, 'active');
const open = existsSync(active)
  ? readdirSync(active, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
  : [];

// 2. Ask the registry. Anything that is not a document we can read is nothing
//    to say: offline, a non-200, a body that is not JSON, a package that has
//    never been published. The default `Accept` matters, because the
//    abbreviated form of this document drops every field but the ones npm
//    itself installs with, and the cost line is one of the ones it drops.
let doc;
try {
  const res = await fetch(REGISTRY, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(String(res.status));
  doc = JSON.parse(await res.text());
} catch {
  silence();
}

const latest = doc?.['dist-tags']?.latest;
if (typeof latest !== 'string' || !SEMVER.test(latest)) silence();

// 3. Nothing to report where the latest is not newer than what runs here, or
//    not newer than the version `updates:` holds.
if (compare(latest, installed) <= 0) silence();
if (held && SEMVER.test(held) && compare(latest, held) <= 0) silence();

// 4. Where a package is open the update cannot land, so the cost lines would
//    be read and not acted on. One line, and no cost is reported.
if (open.length) {
  process.stdout.write(
    `changepack ${latest} is available; it installs once ` +
      `${open.join(', ')} ${open.length > 1 ? 'close' : 'closes'}.\n`
  );
  process.exit(0);
}

// 5. What each release between here and there costs. Every published version
//    carries its own `changepack.updating`, the one line the changelog entry
//    for that version says under `Updating:`. A version published without one
//    says so rather than stopping the report.
const between = Object.keys(doc?.versions ?? {})
  .filter((version) => SEMVER.test(version))
  .filter((version) => compare(version, installed) > 0 && compare(version, latest) <= 0)
  .sort(compare)
  .map((version) => {
    const stated = doc.versions[version]?.changepack?.updating;
    return {
      version,
      cost: typeof stated === 'string' && stated.trim() ? stated.trim() : 'Updating: not stated.',
    };
  });

const say = (m) => process.stdout.write(m + '\n');

say(`changepack ${latest} is available; you run ${installed}.`);
if (between.length) {
  say('');
  const width = Math.max(...between.map((r) => r.version.length));
  for (const r of between) say(`${r.version.padEnd(width)}  ${r.cost}`);
}
