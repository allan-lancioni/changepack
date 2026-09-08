#!/usr/bin/env node
// Copies the changepack skill into the repository you run this in.
// No dependencies, no network, no config: the skill configures itself
// on its first run.

import { cpSync, existsSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const source = join(root, 'skill');
const target = resolve(process.cwd(), '.claude', 'skills', 'changepack');
const force = process.argv.includes('--force') || process.argv.includes('-f');

const say = (m) => process.stdout.write(m + '\n');

const onPath = (bin) => {
  const probe = process.platform === 'win32' ? `where ${bin}` : `command -v ${bin}`;
  const { status } = spawnSync(probe, { stdio: 'ignore', shell: true });
  return status === 0;
};

if (!existsSync(source)) {
  say(`changepack: cannot find the skill at ${source}`);
  process.exit(1);
}

if (existsSync(target) && !force) {
  say(`changepack is already installed at .claude/skills/changepack`);
  say(``);
  say(`  Update it with --force. Your CHANGEPACK.md is never touched,`);
  say(`  because it lives outside the skill directory.`);
  process.exit(1);
}

mkdirSync(dirname(target), { recursive: true });
// The copy is replaced, not merged. A file removed from skill/ has to leave
// every installation, and copying over the top would keep it there forever.
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

say(`changepack ${version} installed at .claude/skills/changepack`);
say(``);

if (!existsSync(resolve(process.cwd(), '.git'))) {
  say(`  This is not a git repository. changepack expects to be committed`);
  say(`  alongside the project it governs.`);
  say(``);
}

if (!onPath('claude')) {
  say(`  Claude Code is not on your PATH. Install it first:`);
  say(``);
  say(`    npm install -g @anthropic-ai/claude-code`);
  say(``);
}

if (existsSync(resolve(process.cwd(), 'CHANGEPACK.md'))) {
  say(`  Configuration already present. Open Claude Code here:`);
  say(``);
  say(`    claude "/changepack"`);
} else {
  say(`  Now configure it. Paste this:`);
  say(``);
  say(`    claude "/changepack"`);
  say(``);
  say(`  It reads the repository, proposes a configuration and writes`);
  say(`  CHANGEPACK.md. That file is yours; everything under the skill`);
  say(`  directory is replaced wholesale on update.`);
}
