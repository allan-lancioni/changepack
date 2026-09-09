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
- **validate:** `npm run check`. Five invariants: the loaded copy matches
  `skill/`, the version agrees with itself across three files, the context
  budget holds, nothing names a file that is not there, and the cost of
  updating is said the same way in `CHANGELOG.md` and in `package.json`.
- **commit:** conventional, no agent co-author, one per commit point, without
  asking. Write "ask first" here instead to be asked every time.
- **protect:** `.claude/skills/changepack/`. Written by `bin/install.mjs`
  alone, never by hand.
- **updates:** off. This repository is the upstream, and has nothing to check
  itself against.

## House rules

**The version is released, never bumped.** A push to `main` tags and publishes
whatever number `package.json` carries, so that number is the release itself
and not a record of one. Ordinary work leaves it alone, and leaves the
`CHANGELOG.md` entry alone with it. Releasing is a decision: when it is made,
one commit writes the entry and stamps `package.json`, `skill/SKILL.md` and
this file together, which is the agreement `npm run check` already enforces.

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
