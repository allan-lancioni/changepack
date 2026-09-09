---
title: spec-delta.md
description: >-
  The rules a change adds, changes or removes, folded in at closure.
sidebar:
  order: 5
---

The third file of a change, written only when the work alters something a
later change will be held to. It holds the rules the change makes true, and it
holds them until closure.

## What earns one

The question is whether something is held to the document, not whether the
project has behavior specs. Renaming a heading does not qualify. Changing what
a rule obliges does.

A document qualifies when something is held to it and it has named units you
can name before and find after: the behavior specs, `CLAUDE.md`, `AGENTS.md`,
what is under `.claude/`. A README fails the first test, so drift there is a
documentation bug rather than a broken commitment.

Where nothing normative changes there is no delta, and the intended behavior
goes in `change.md` under Goal instead.

## The shape

The frontmatter carries the title and `documents:`, one path per heading below
and in the same order, so an archived change says what it touched without
being opened.

Then one heading per document, so folding it at closure is one file at a time,
and under each one line per rule: `+` added, `~` changed, `-` removed.

```markdown
## `skill/references/close.md`

- `+` **The closure commits alone**: the archive move is its own commit, even
  where the last task group landed a moment before it.
- `~` **The update check is one command**: closure runs the script and reads
  what it printed.
- `-` **The route resolves the tag**: nothing replaces it. The script is the
  only place that states how.
```

Each line is written as current behavior, in the words the document will
carry. What it will say after closure, not what the change is doing to it.

## Where it lands

Nothing is written into a normative document while the change is open. The
proposed behavior lives here, and the document still states what is true
today.

At closure the delta is folded in, one heading at a time, and the document
states the new behavior as current. The delta stays in the change, as the
record of what became normative. Where a rule landed differently from how it
was declared, its line says so.
