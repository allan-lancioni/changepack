# A package reads like a document

- **changekit:** 1.0.0
- **opened:** 2026-09-07
- **shipped:**

## Context

Two packages opened by a clean agent against a real repository came out at
1,435 and 2,300 words. The drawings work and the prose after them is earned,
but a person opening the file meets metadata formatted as prose, then several
hundred words, before reaching the part that says what the change does. The
sections have no length written into them, so they grow with the change: the
same two sections went 139 to 188 and 179 to 245 words between the two.

## Goal

- A package's metadata is frontmatter, machine-readable and out of the prose:
  title, a one-line description, the changekit version, the date, who opened
  it, the issue it came from, and what it shipped in.
- `change.md` opens with one short paragraph of context and a contract, then
  the drawing.
- Every drawing is introduced by a line saying what it shows, so it is read
  rather than decoded.
- Alternatives and their costs are a table. The recommendation stays prose.
- `tasks.md` states its execution order where a machine can read it.
- A package that would open with more than two blocking gates says so, because
  it is not approvable and the conversation has not happened yet.

## Decided

**The gate threshold is two.** One open decision is ordinary and two is a fork;
past that the shape of the work is not settled and the package is carrying a
conversation instead of recording one. The procedure does not refuse to open
it, it says so and offers to settle them first.

**This folds into 1.0.0.** That version has no tag and no release, so this is
the same major, and the changelog entry is amended rather than added to.

**`description` earns the shorter Context.** It carries what the change is, so
Context carries only why now, and never repeats it.

**A key with no value is omitted.** `issue:` and `shipped:` are written when
they have something to say. A frontmatter of empty keys trains a reader to skip
the block, and `blocked:` goes with it.

**The criterion for what is normative moves into `init.md`.** The eval put a
Cog-generated `README.md` under `normative:`, because the rule excluding it
lives in `spec-delta.md`, which the init route never loads. The rule has to be
where the field is filled.

## Open decisions

None.

## Scope

- `skill/templates/change.md`: frontmatter, section order, length written into
  Context and Goal, the line before each drawing, the table under Open
  decisions.
- `skill/templates/tasks.md`: frontmatter carrying `order:` and `blocked:`.
- `skill/templates/spec-delta.md`: frontmatter carrying `documents:`.
- `skill/references/plan.md`: stamping the frontmatter, reading the git
  identity, and the gate threshold.
- `skill/references/init.md`: what earns a place under `normative:`.
- `skill/references/close.md`: filling `shipped:` in frontmatter.
- `CHANGELOG.md`: the unreleased 1.0.0 entry gains this.

Out of scope:

- **`tasks.md`'s body.** Only its frontmatter moves. The group format is what
  131 of 182 commits in the reference repository touched and it works.
- **Archived packages.** History is not migrated.
- **A tool that reads `order:`.** The field is written for a machine, and
  nothing reads it yet. `run.md` keeps deciding from the prose beside it.

## Changes

**The metadata leaves the prose**, and `title` and `description` are what make
a listing of `changes/archive/` readable without opening anything.

```
---
title: Find logs by tag
description: Tag prompts as they run or afterwards, and filter the log by tag.
changekit: 1.0.0
opened: 2026-09-07
opened-by: Allan C Lancioni <allan@allanlancioni.com>
issue: https://github.com/simonw/llm/issues/1234
---
```

`opened-by` is `git config user.name` and `user.email` resolved in the
package's own repository, local before global. It is the identity that signs
the opening commit, which is what makes it checkable later: the frontmatter and
`git log` of that commit have to agree.

**The order changes so the file answers its first question first**, and the
lengths are written in rather than left to the change.

```
~ Context           one paragraph, and the description is not repeated
~ Goal              the contract, and no longer than the change needs
~ Changes           a line before each drawing, saying what it shows
~ Open decisions    alternative and cost in a table; recommendation in prose
  Decided           unchanged
  Scope             unchanged
  Cost              unchanged
  Success criteria  unchanged
  Outcome           unchanged
  Surprises         unchanged
```

The order moves from `Context, Goal, Decided, Open decisions, Scope, Changes`
to `Context, Goal, Changes, Open decisions, Decided, Scope`. Reading order is
not writing order: the drawing is the last thing known at plan time and the
first thing wanted at read time, and the template says so, or a model will draw
before it understands.

**`tasks.md` states its order where a machine can read it.** Today the same
fact is a paragraph that `run.md` has to interpret.

```
---
title: Find logs by tag
groups: 6
order: [1, [2, 3], 4, 5, 6]
blocked: [1]
---
```

A nested list runs in parallel.

## Cost

- **Keeps working:** an open package written before this reads exactly as it
  did; nothing parses the header today, so nothing breaks on one that has no
  frontmatter. `close.md` fills `shipped:` in whichever form it finds.
- **A revert does not undo:** nothing. No data is written and no released
  version carries this, because 1.0.0 has not shipped.

## Success criteria

- A package opened after this lands carries frontmatter, and `opened-by` equals
  the author of its own opening commit.
- Its `change.md` reaches the first drawing inside the first screen.
- Every drawing has a line above it saying what it shows.
- Open decisions with alternatives are a table, and the recommendation is not.
- A package with three blocking gates is not opened silently.
- Filling `normative:` no longer requires reading `spec-delta.md`.
- `npm run check` passes.

## Outcome

<Written at closure.>
