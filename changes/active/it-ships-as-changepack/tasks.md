---
title: It ships as changepack
groups: 5
# 2 and 3 both depend on the name and on nothing else, so they run in parallel.
order: [1, [2, 3], 4, 5]
---

One group at a time. Check an item only after its validation passes.

## 1. The name

Status: completed

- [x] `skill/SKILL.md`: `name: changepack` in the frontmatter, `/changepack`
      where the command is named, and the marker reads
      `<!-- changepack 1.0.0 -->`.
- [x] `skill/templates/changekit.md` becomes `skill/templates/changepack.md`,
      with `- **changepack:**` as its version field and the heading and prose
      following.
- [x] `skill/templates/change.md`: the frontmatter key `changekit:` becomes
      `changepack:`.
- [x] `skill/references/init.md`: writes `CHANGEPACK.md`, copies
      `templates/changepack.md`, stamps `changepack`, and names `/changepack`.
- [x] `skill/references/update.md`, `close.md`, `run.md`, `work.md`: the path
      to the check is `.claude/skills/changepack/check-update.mjs`.
- [x] `skill/references/run.md`, `commit.md`: `CHANGEPACK.md`.
- [x] `skill/references/plan.md`: the frontmatter key it tells planning to
      stamp is `changepack`.
- [x] `bin/install.mjs`: the target is `.claude/skills/changepack`, and every
      line it prints names changepack and `CHANGEPACK.md`.
- [x] `scripts/check.mjs`: `LOADED` is `.claude/skills/changepack`, and the
      marker it reads is `<!-- changepack ... -->`.
- [x] `CHANGEKIT.md` becomes `CHANGEPACK.md` with `git mv`, its version field
      renamed and its prose following. `protect:` names the new path.
- [x] `.markdownlint-cli2.jsonc`: the path it names.

Validation:

- `grep -rn changekit --exclude-dir=changes --exclude-dir=eval .` returns only
  `CHANGELOG.md` history and `.claude/skills/changekit/`, which group 5
  replaces.

## 2. The channel

Status: completed

- [x] `package.json`: `name` is `changepack`, `bin` maps `changepack` to
      `bin/install.mjs`, `repository` points at the renamed repository, and
      `publishConfig.access` is `public`.
- [x] `.github/workflows/tag.yml` becomes `release.yml`: on a push to `main`
      it tags the version where no tag carries it, then publishes to npm where
      the registry does not already hold that version. Publishing is guarded by
      a registry lookup, not by the tag it just wrote.
- [x] The workflow requests `id-token: write` and publishes with provenance.
- [x] The npm token is read from a repository secret, and the workflow fails
      loudly rather than silently skipping when it is absent.
- [x] `skill/references/commit.md`: the trailer a package's commits carry is
      `Changepack:`, and the sentence about closure naming the old version
      follows. Group 1 surfaced this and did not own it.

Validation:

- `npm pack --dry-run` lists `skill/` and `bin/` and nothing else, and the
  tarball carries no `scripts/`, no `changes/` and no `eval/`.
- The workflow parses: `node -e` over the YAML, or a push to a scratch branch
  that the trigger ignores.

## 3. The check reads the registry

Status: completed

- [x] `package.json` gains `changepack.updating`, the one line of cost for
      this version, taken from the `Updating:` paragraph of the matching
      `CHANGELOG.md` entry.
- [x] `scripts/check.mjs` gains a fifth invariant: `changepack.updating`
      equals the `Updating:` paragraph of the changelog entry for the version
      in `package.json`, joined into one line.
- [x] `skill/check-update.mjs`: one `GET https://registry.npmjs.org/changepack`
      replaces `git ls-remote`, the `raw.githubusercontent` fallback and the
      changelog fetch. The latest version comes from `dist-tags.latest`, and
      each intermediate version's cost from its own `changepack.updating`.
- [x] The script reads `CHANGEPACK.md` and its `changepack:` field, and drops
      `spawnSync` and the `node:child_process` import with the git call.
- [x] Silence still covers every failure: offline, a non-200, a malformed
      document, `updates: off`, a held version, and an installed version that
      is current.
- [x] A version published without an `updating` field reports
      `Updating: not stated.` rather than failing.
- [x] `skill/references/update.md` step 4 installs `npx changepack@<version>
      --force`, and the step no longer speaks of a ref. Group 1 renamed the
      URL it could not yet replace.

Validation:

- Against a `CHANGEPACK.md` stamped with an older version, the script prints
  the latest and one cost line per release between. Confirmed with a local
  fixture until the package is published, then against the registry in
  group 5.
- With the network disabled, and with `updates: off`, it prints nothing and
  exits 0.
- `npm run check` fails when `changepack.updating` is edited to disagree with
  the changelog.

## 4. The documents

Status: completed

- [x] `README.md`: `npx changepack` is the install, `npx changepack --force`
      the update, `/changepack` the command, and the box lists
      `templates/changepack.md`. The paragraph about the update check says one
      request to the registry, not one `git ls-remote`.
- [x] `CHANGELOG.md`: the unreleased 1.0.0 entry gains the rename, the
      registry as the channel and the check that reads it. The command at the
      top of the file becomes `npx changepack --force`.
- [x] That entry's `Updating:` paragraph states the hand edits: rename
      `CHANGEKIT.md` to `CHANGEPACK.md` and its version field, and delete
      `.claude/skills/changekit/` after installing changepack. It says the
      installer does neither.
- [x] `RATIONALE.md`: the refusal of an npm package is rewritten. What is
      refused is a runtime in the governed repository, and the registry is a
      distribution channel that imposes no manifest on a Python, Rust or Go
      repository, because the target is `.claude/skills/` and `npx` already
      required Node before this.
- [x] `RATIONALE.md` is added to git, which has never tracked it.

Validation:

- `npm run lint` passes.
- No document names an install command that this release does not answer to.

## 5. Closure, and the two acts that leave this machine

Status: in progress

**Stop here for confirmation before either outward act.** Renaming the
repository and publishing to the registry are the two steps this package
cannot take back, and the second one holds the name from the moment it lands.

- [ ] `node bin/install.mjs --force`, which writes
      `.claude/skills/changepack/`.
- [ ] `git rm -r .claude/skills/changekit/`, so the old loaded copy leaves the
      tree with the release that replaces it.
- [x] Rename the repository on GitHub to `changepack`. `changekit` answers
      301 to `changepack`, the remote reaches origin, and `check-update.mjs`
      no longer names a URL at all: it resolves against the registry.
- [ ] Merge to `main` and let `release.yml` tag `v1.0.0` and publish
      `changepack@1.0.0`.
- [ ] Confirm `npx changepack` in a scratch repository installs the skill and
      prints the next step.
- [ ] Confirm `check-update.mjs` against the live registry prints nothing at
      1.0.0, and prints the version and cost when `CHANGEPACK.md` is stamped
      lower.

Validation:

- `npm run check` passes with no package open and no drift between `skill/`
  and `.claude/skills/changepack/`.
- `npx changepack` from a directory outside this repository installs 1.0.0.
