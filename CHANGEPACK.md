# Changepack

How change packages work in this repository.

- **changepack:** 1.0.0
- **changes:** changes/
- **normative:** `skill/`. The procedure is the product here, so a change that
  alters what a route obliges carries a spec delta.
  `.claude/skills/changepack/` is the generated copy and is never the target.
- **language:** English. Everything changepack writes here follows it; what it
  says to you follows your message.
- **version:** `package.json`.
- **validate:** `npm run check`. Four invariants: the loaded copy matches
  `skill/`, the version agrees with itself across three files, the context
  budget holds, and nothing names a file that is not there.
- **commit:** conventional, no agent co-author, one per commit point, without
  asking. Write "ask first" here instead to be asked every time.
- **protect:** `.claude/skills/changepack/`. Written by `bin/install.mjs`
  alone, never by hand.
- **updates:** off. This repository is the upstream, and has nothing to check
  itself against.

## House rules

**No dashes in prose.** Not the em dash, not the en dash, not a hyphen standing
in for one. A comma, a colon, a full stop or a new sentence says it. This was
the practice before it was written down, which is how five of them got in.

This is the only repository where changepack is both the thing maintained and
the thing running. `skill/` is the source and the object of maintenance.
`.claude/skills/changepack/` is the copy Claude Code loads, committed so that a
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
