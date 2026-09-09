# Changepack

How change packages work in this repository.

- **changepack:** 1.0.0
- **changes:** changes/
- **normative:** `skill/` and `CLAUDE.md`. The procedure is the product here,
  so a change that alters what a route obliges carries a spec delta, and so
  does a change to this repository's own rules.
  `.claude/skills/changepack/` is the generated copy and is never the target.
- **language:** English. Everything changepack writes here follows it; what it
  says to you follows your message.
- **version:** `package.json`.
- **validate:** `npm run check`. Five invariants: the loaded copy matches
  `skill/`, the version agrees with itself across four files, the context
  budget holds, nothing names a file that is not there, and the cost of
  updating is said the same way in `CHANGELOG.md` and in `package.json`.
- **commit:** conventional, no agent co-author, one per commit point, without
  asking. Write "ask first" here instead to be asked every time.
- **protect:** `.claude/skills/changepack/`. Written by `bin/install.mjs`
  alone, never by hand.
- **updates:** off. This repository is the upstream, and has nothing to check
  itself against.
