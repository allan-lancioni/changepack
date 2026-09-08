---
title: A new version announces itself
description: A command finds a newer changekit and says what it costs, and a tag on main is what publishes one.
changekit: 1.0.0
opened: 2026-09-08
opened-by: Allan C Lancioni <allan@allanlancioni.com>
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

**What the check is written in.** Blocking group 1.

| Alternative | Cost |
|---|---|
| Node, like `bin/install.mjs` | needs `node` at check time, where the four steps today need only `git`. Works on Windows. |
| POSIX shell, `git` and `sort -V` | no new runtime, and `git` is already required. Breaks on Windows, where `install.mjs` works today. |

Recommendation: Node. changekit installs through `npx`, so every project had
node at least once, and Claude Code is itself commonly installed through npm.
Where it is missing the script fails and the check says nothing, which is the
rule `close.md` already carries for a command that could not run.

## Decided

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

## Outcome

<Written at closure.>
