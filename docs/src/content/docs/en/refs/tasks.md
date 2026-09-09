---
title: tasks.md
description: >-
  The groups, their order, and what proves each item.
sidebar:
  order: 4
---

The work, cut into groups. It is written when the package opens and edited as
the package lands, which makes it the only file in the package that changes
while the work runs.

## The frontmatter

`groups:` is how many follow. `order:` is the numbers they run in, with a
nested list where groups can run in parallel. `blocked:` names the groups an
open decision holds, and is omitted where nothing is blocked.

```yaml
groups: 5
order: [1, 2, [3, 4], 5]
blocked: [1]
```

## A group

One verifiable outcome, and a validation that proves it. Groups are ordered by
dependency, a migration against real user data is its own group or out of
scope, and the last one is cleanup and closure.

```markdown
## 2. The home reads

Status: completed

- [x] Write `docs/src/content/docs/en/index.mdx` in full: the hero, the gate
      quoted alone, the install command, and four cards.
- [ ] Write the `pt` twin as the same sections. It is an adaptation and not a
      translation: same argument, same length.

Validation:

- Both homes render the sections in the order `change.md` gives.
- `npm run lint` passes on both files.
```

An item is one concrete edit that names the file it touches. No item restates
the procedure: that a group is committed, or validated, or reported is true of
every group and belongs to no task.

## Who writes it, and when

`Status:` runs `not started`, `in progress`, `completed`. A group waiting on a
decision says so there and in `blocked:`.

Item state is the checkbox alone, and it is checked the moment that item's own
implementation and validation pass. Not at the commit, and not at the end of
the group. A task is never left checked while its work is incomplete, so a
stop in the middle of a task leaves that task unchecked.

Where a package is run group by group, the conversation driving it is the only
writer of this file. The agents implementing the groups never write anything
under the changes path.
