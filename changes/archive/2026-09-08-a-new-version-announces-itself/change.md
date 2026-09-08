---
title: A new version announces itself
description: A command finds a newer changekit and says what it costs, and a tag on main is what publishes one.
changekit: 1.0.0
opened: 2026-09-08
opened-by: Allan C Lancioni <allan@allanlancioni.com>
shipped: 1.0.0
---

## Context

Closing a package ends with four steps that read a field, resolve a tag,
compare two version strings and decide whether one is larger. None is a
judgment, all of it is described in prose, and it costs 1,002 characters of
`close.md` — 29% of the tightest route in the skill. Meanwhile the upstream
carries one tag, `v0.5.0`, so the comparison those steps perform has returned
nothing since 0.6.0 shipped, and it fails silently by design.

## Goal

- Closing a package runs one command. Silence means nothing to report, which
  is the ordinary outcome and leaves no trace.
- Where there is something, the command names the newer version and prints
  what each release between the two costs to update to.
- A release exists because a merge to `main` created a tag, not because
  somebody remembered.
- The decision to update, hold or stop stays with the person, and nothing is
  written before they answer.

## Changes

**The arithmetic becomes a script**, vendored with the skill so it runs
without a network round-trip to fetch itself.

```
skill/
+ check-update.mjs      reads updates: and changekit: from CHANGEKIT.md,
                        resolves the upstream tag, prints nothing or the
                        entries between the two. No dependencies.
~ references/close.md   the four steps become the command and one sentence
~ references/update.md  loses resolving the tag, fetching the changelog and
                        composing the install ref

scripts/
~ check.mjs             the context budget counts .md alone

.github/workflows/
+ tag.yml               on push to main: tag v<package.json version> where no
                        tag has it yet
```

**What the command prints**, when there is anything to print. It is what
`update.md` presents, so the route stops composing it:

```
changekit 1.2.0 is available; you run 1.0.0.

1.1.0  Updating: nothing.
1.2.0  Updating: rename `specs:` to `normative:` in CHANGEKIT.md.
```

The budget invariant changes because the budget measures context and only
markdown is loaded. Counting a script against a ceiling that exists to protect
a turn's context would charge for something no turn reads.

## Open decisions

None.

## Decided

**The check is written in Node.** Claude Code is itself a Node application, so
node is present wherever the check runs; the dependency is free rather than
tolerated. POSIX shell would have avoided it and broken on Windows, where
`install.mjs` works today.

**This is still 1.0.0.** No tag exists and `main` is at 0.7.0, so the release
has not happened and the changelog entry is amended rather than added to.

**The command reports and never decides.** Update now, hold this version, or
stop stays an `AskUserQuestion`, and naming the entries that ask for a hand
edit stays the model's before anything is written.

**The tag is a consequence of merging, not an act.** 0.6.0, 0.7.0 and 1.0.0
shipped untagged because tagging depended on somebody remembering, and three
times nobody did.

## Scope

- `skill/check-update.mjs`, and `close.md` and `update.md` reduced to what is
  left once it exists.
- `scripts/check.mjs`: the context budget counts `.md` alone.
- `.github/workflows/tag.yml`, the repository's first CI.
- `CHANGELOG.md`: the unreleased 1.0.0 entry gains this.

Out of scope:

- **Publishing as a Claude Code plugin.** The skill is committed with the
  project, which is what lets it govern a repository in any language, and a
  plugin that auto-updates would break a package running under the version its
  session opened with.
- **Generating `CHANGELOG.md` from the archive.** A separate question, and the
  entries are read by `update.md`, so the format is an interface before it is
  documentation.
- **Publishing to npm.** `npx github:` is already versioned, reproducible
  installation, and a Python repository should not need a package manifest to
  hold a procedure.

## Cost

- **Keeps working:** a project that never runs the command loses nothing; the
  check has returned silence since 0.6.0 anyway. `updates: off` still makes no
  network call, and it is the first thing the script reads.
- **A revert does not undo:** tags. Once the workflow has tagged a version,
  reverting it leaves the tags it made, and they are what every installed
  project now compares itself against.

## Success criteria

- Closing a package runs one command and, where nothing is newer, the report
  ends where it would have ended.
- Where something is newer, the command names it and prints the cost line of
  every release between the two.
- `updates: off` reaches no network.
- A merge to `main` that changes the version produces a tag without anyone
  asking for one.
- `close.md` drops below 3,000 characters.
- `npm run check` passes, and its budget note counts markdown alone.

## Surprises

- **Group 2** — the drawing was short rather than wrong. It promised the check
  would print the newer version and the cost lines, and `update.md` then needed
  the ref to install at. The script resolves one and never said it, which only
  the route consuming the output could discover. Group 4 prints it.

## Outcome

Shipped in 1.0.0, still unreleased, so the entry was amended rather than added
to. Closing a package now runs `check-update.mjs` and reads what it prints;
`close.md` fell from 3,452 to 2,794 characters and its update section from
1,002 to about 330. `update.md` went from nine steps to seven. One place states
how versions compare, what `off` and `hold` do, and where the changelog lives,
and it is the script. A push to `main` tags the version where no tag carries
it, so the tag stops depending on anyone remembering. The context budget counts
markdown alone, because markdown alone is what a turn loads.

The check was verified against the real upstream from a scratch fixture: an
installed 0.1.0 reports 0.5.0 with the six cost lines between them, a `hold`
covering the latest is silent, a version newer than upstream is silent, and
`off` returns before any process is spawned.

### What changed on the way

**The drawing was short, and only the second group could see it.** It promised
the check would print the newer version and the cost lines; `update.md` then
needed a ref to install at. The script resolved one internally and never said
it, and `v<version>` is right when a tag resolved it and wrong when the
fallback did. Group 4 printed it. This is the first use of `Surprises`, and
what it caught was an omission rather than a deviation.

**The check reports 0.5.0 today, and that is correct.** 1.0.0 exists on this
branch and no tag carries it, so the tool honestly cannot see it. The bug this
package exists to fix is demonstrated by the tool that fixes it, and the first
merge to `main` resolves both at once.

### Left for later

- **Nothing verifies the changelog contract.** `update.md` and now the script
  both depend on every `## <version>` section ending with one paragraph opening
  `Updating:`. Ten sections hold today, by discipline. No invariant proves it,
  and a section with two such paragraphs, or none, would break the check
  quietly.
- **The workflow has never run.** Its logic was exercised by hand against
  `main`; the first real execution is the merge that lands this branch.
