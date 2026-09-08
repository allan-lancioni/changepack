#!/usr/bin/env node
// This repository's validation. Four invariants, no dependencies.
//
// It exists because changepack is the only repository where the skill is both
// the thing maintained and the thing running, and that arrangement is safe
// only while something checks it.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const SOURCE = 'skill';
const LOADED = '.claude/skills/changepack';
const ACTIVE = 'changes/active';

// The context budget is the product. What a turn actually loads is SKILL.md
// plus one reference, so those two are the ceilings that bind; the total is a
// drift alarm. This file owns the numbers and the README quotes them.
const SKILL_MAX = 3600;
const FILE_MAX = 3600;
// Markdown alone, because markdown alone is what a turn loads: 34000 against
// 32744 today, about 1250 characters before the alarm sounds.
const TOTAL_MAX = 34000;

const failures = [];
const notes = [];
const fail = (m) => failures.push(m);
const note = (m) => notes.push(m);

// A tracked file that is not on disk is a finding, never a crash.
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const gone = [];
const readOrFlag = (path) => {
  const text = read(path);
  if (text === null) gone.push(path);
  return text;
};

const tracked = (dir) =>
  execFileSync('git', ['ls-files', '-z', dir], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);

// 1. The loaded copy matches the source, unless a package is changing it.
const openPackages = existsSync(ACTIVE)
  ? readdirSync(ACTIVE, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .filter((name) => {
        const tasks = join(ACTIVE, name, 'tasks.md');
        return existsSync(tasks) && readFileSync(tasks, 'utf8').includes(`${SOURCE}/`);
      })
  : [];

const rel = (files, dir) => new Map(files.map((f) => [f.slice(dir.length + 1), f]));
const src = rel(tracked(SOURCE), SOURCE);
const cpy = rel(tracked(LOADED), LOADED);
const drift = [];

for (const [name, path] of src) {
  if (!cpy.has(name)) drift.push(`${name} is missing from the loaded copy`);
  else {
    const a = readOrFlag(path);
    const b = readOrFlag(cpy.get(name));
    if (a !== null && b !== null && a !== b) drift.push(`${name} differs`);
  }
}
for (const name of cpy.keys()) {
  if (!src.has(name)) drift.push(`${name} is in the loaded copy and not in the source`);
}

if (drift.length && openPackages.length) {
  note(
    `${SOURCE}/ and ${LOADED}/ differ, which is expected: ` +
      `${openPackages.join(', ')} is open and touches ${SOURCE}/. ` +
      `The reinstall at closure settles it.`
  );
} else if (drift.length) {
  fail(
    `${SOURCE}/ and ${LOADED}/ differ with no package open to explain it:\n` +
      drift.map((d) => `      ${d}`).join('\n') +
      `\n      Run: node bin/install.mjs --force`
  );
}

// 2. One version, said in three places.
const skillText = readOrFlag(join(SOURCE, 'SKILL.md')) ?? '';
const marker = skillText.match(/<!--\s*changepack\s+([^\s]+)\s*-->/)?.[1];
const pkg = JSON.parse(readFileSync('package.json', 'utf8')).version;
const changelog = readFileSync('CHANGELOG.md', 'utf8').match(/^##\s+(\S+)/m)?.[1];

if (!(marker && pkg && changelog && marker === pkg && pkg === changelog)) {
  fail(
    `the version disagrees with itself: ` +
      `SKILL.md marker ${marker}, package.json ${pkg}, CHANGELOG.md ${changelog}`
  );
}

// 3. The context budget.
const files = tracked(SOURCE);
// Markdown alone. The budget protects what a turn loads, and a turn loads
// markdown; a script shipped in skill/ is run, never read into context, so
// charging it here would charge for characters nobody pays.
const total = files
  .filter((f) => f.endsWith('.md'))
  .reduce((n, f) => n + (readOrFlag(f)?.length ?? 0), 0);
if (skillText.length > SKILL_MAX)
  fail(`SKILL.md is ${skillText.length} characters, over its ${SKILL_MAX} ceiling`);
if (total > TOTAL_MAX)
  fail(`${SOURCE}/ is ${total} characters, over its ${TOTAL_MAX} ceiling`);

let widest = ['', 0];
for (const f of files.filter((f) => f.includes('/references/'))) {
  const n = read(f)?.length ?? 0;
  if (n > widest[1]) widest = [f, n];
  if (n > FILE_MAX)
    fail(`${f} is ${n} characters, over the ${FILE_MAX} a single route may load`);
}
note(
  `SKILL.md ${skillText.length}/${SKILL_MAX}, widest route ${widest[0].split('/').pop()} ` +
    `${widest[1]}/${FILE_MAX}, ${SOURCE}/ markdown ${total}/${TOTAL_MAX}`
);

// 4. Nothing names a file that is not there.
const named = (text, dir) => [...text.matchAll(new RegExp(`${dir}/([\\w.-]+\\.md)`, 'g'))]
  .map((m) => m[1]);

for (const [text, dir, source] of [
  [skillText, 'references', 'SKILL.md'],
  [readOrFlag(join(SOURCE, 'references/plan.md')) ?? '', 'templates', 'plan.md'],
]) {
  for (const name of new Set(named(text, dir)))
    if (!existsSync(join(SOURCE, dir, name)))
      fail(`${source} names ${dir}/${name}, which does not exist`);
}

const orphans = readdirSync(join(SOURCE, 'references')).filter(
  (f) => !skillText.includes(`references/${f}`)
);
if (orphans.length) note(`not named in SKILL.md: ${orphans.join(', ')}`);

if (gone.length)
  fail(`tracked by git and missing from disk: ${[...new Set(gone)].join(', ')}`);

for (const n of notes) console.log(`  ${n}`);
if (failures.length) {
  console.error(`\ncheck failed:\n${failures.map((f) => `  - ${f}`).join('\n')}\n`);
  process.exit(1);
}
console.log('\ncheck passed\n');
