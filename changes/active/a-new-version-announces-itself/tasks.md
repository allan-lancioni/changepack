---
title: A new version announces itself
groups: 4
order: [[1, 3], 2, 4]
---

One group at a time. Check an item only after its validation passes.

Groups 1 and 3 touch nothing in common and may run beside each other. Group 2
needs 1, because it reduces two routes to a command that has to exist. Group 4
needs all of them.

## 1. The arithmetic is a script

Status: completed

- [x] `skill/check-update.mjs`: reads `updates:` and `changekit:` from
      `CHANGEKIT.md`; `off` returns before any network call. Resolves the
      upstream's latest tag, falling back to `version` in `package.json` on
      `main` where no tag exists. Respects `hold <version>`.
- [x] Prints nothing and exits 0 where nothing is newer, or where the machine
      is offline, or where the command was not permitted.
- [x] Where something is newer, fetches `CHANGELOG.md` at that ref and prints
      the newer version and the cost line of every release between the two.
- [x] No dependencies, in the style of `bin/install.mjs`.
- [x] `scripts/check.mjs`: the context budget sums `.md` alone, and the note
      says so.

Validation:

- `node skill/check-update.mjs` in this repository prints nothing and exits 0.
- The same with `updates:` set to `off` makes no network call.
- `npm run check` passes and its note counts markdown alone.

## 2. Two routes keep only what is theirs

Status: completed

- [x] `skill/references/close.md`: the four steps become the command, and the
      sentence saying silence leaves no trace and holds up no closure.
- [x] `skill/references/update.md`: loses resolving the tag, fetching the
      changelog and composing the install ref. Keeps presenting, confirming,
      installing, stamping and committing.
- [x] Neither route describes a comparison a script performs.

Validation:

- `npm run check` passes, and `close.md` is under 3000 characters.
- Reading `close.md` alone is enough to run the check.

## 3. A tag is a consequence of merging

Status: completed

- [x] `.github/workflows/tag.yml`: on push to `main`, tag
      `v<package.json version>` where no tag carries it, and push the tag.
- [x] It writes nothing else: no release notes, no changelog, no version bump.

Validation:

- The workflow's logic run by hand at the current `main` proposes `v0.7.0` and
  writes nothing, because the version there is 0.7.0 and untagged.
- A second run against the same version proposes nothing.

## 4. It is still 1.0.0

Status: not started

- [ ] `skill/check-update.mjs`: print the ref beside the version, since
      `update.md` installs at the ref the check reported and the script
      resolved it without ever saying it.
- [ ] `CHANGELOG.md`: the unreleased 1.0.0 entry gains the command, the
      workflow, and what they change for a project that already installed.
- [ ] No version bump: `main` is at 0.7.0 and 1.0.0 has never shipped.
- [ ] `node bin/install.mjs --force`, inside the archive commit.

Validation:

- `npm run check` passes with the loaded copy matching `skill/`.
- The version reads 1.0.0 in all three places, unchanged.
