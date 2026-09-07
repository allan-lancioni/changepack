# Changekit

How change packages work in this repository.

- **changekit:** 0.6.0
- **changes:** changes/
- **specs:** none
- **language:** English. Everything changekit writes here follows it; what it
  says to you follows your message.
- **version:** `package.json`.
- **validate:** `npm run check`. Four invariants: the loaded copy matches
  `skill/`, the version agrees with itself across three files, the context
  budget holds, and nothing names a file that is not there.
- **commit:** conventional, no agent co-author, one per commit point, without
  asking. Write "ask first" here instead to be asked every time.
- **protect:** `.claude/skills/changekit/`. Written by `bin/install.mjs` alone,
  never by hand.
- **updates:** off. This repository is the upstream, and has nothing to check
  itself against.

## House rules

This is the only repository where changekit is both the thing maintained and
the thing running. `skill/` is the source and the object of maintenance.
`.claude/skills/changekit/` is the copy Claude Code loads, committed so that a
fresh clone runs the procedure with nothing to install.

The copy is refreshed with `node bin/install.mjs --force` at closure, inside
the archive commit, and never before it. So a package that edits `skill/` runs
under the version loaded when the session opened, not under the one it is
writing, and the procedure it lands applies from the next session. That is what
an update already does for every other project.

The two directories differ on purpose while such a package is open. They differ
by mistake at any other time, which is why the reinstall is destructive: it
overwrites without merging, and an edit made in the copy is lost rather than
merged.
