---
title: <Title>
description: <one line saying what the change is, so a listing of archived
  packages reads without opening any>
changekit: <the version that planned this>
opened: <YYYY-MM-DD>
opened-by: <the git identity that signs the opening commit, as name and email>
issue: <the issue this came from; omit the key when there is none>
shipped: <the release this shipped in; filled at closure, omitted until then>
---

## Context

<Why now, in one paragraph: what is true today and why that is a problem. The
description already said what the change is, so never repeat it here. No
history and no options.>

## Goal

<The behavior that should be true when this closes, written as a contract, and
no more of it than the change needs. Where nothing normative changes, this is
the normative part of the package.>

<A line naming a file, a collection or a transaction belongs under Changes; one
about what keeps working belongs under Cost.>

## Changes

<Written last and read first: understand the change, then draw it. A line above
each drawing says what it shows, so it is read rather than decoded. Draw what
moves and nothing it does not, picking the notation by what moves:>

- <files, modules, packages: a tree, marked `+` added, `-` removed,
  `~` changed;>
- <collection, table, field, state: a table of what each becomes;>
- <route, stream, order in time: a sequence;>
- <service, deploy, routing: a flow.>

<Most changes move two of these. Prefer the tree and the table: they read in a
terminal, on a forge and in an editor alike, with nothing installed.>

<Then the prose the drawing cannot carry, and only that: why this shape and not
the other one. Never restate the drawing. If nothing structural moves, there is
no drawing, and probably no package.>

## Open decisions

**<The question.>**

| Alternative | Cost |
|---|---|
| <one> | <what it costs.> |
| <the other> | <what it costs.> |

<The recommendation, in prose under the table: which one, and why. Say it is
blocking when no task can start without the answer.>

## Decided

<What this package settled: the question, what was chosen, and what the
alternative would have cost. A decision moves here from Open decisions when it
is answered.>

## Scope

- <What this change touches.>

Out of scope:

- <What was considered and deliberately left out, and why.>

## Cost

<Two lines. Delete either one when it has nothing to say; silence is the
ordinary answer.>

- **Keeps working:** <what stands while this lands, and what breaks if anything
  does.>
- **A revert does not undo:** <only what reverting the drawing leaves behind:
  data written, a policy dropped, an order between groups, a deploy applied
  rather than reverted. Where the revert is the drawing's inverse, write
  nothing.>

## Success criteria

- <Observable, and checkable at closure by looking at behavior.>

## Outcome

<Written at closure: what shipped, what changed on the way, what was left.
If the package was dropped instead, say so here, and why.>

## Surprises

<One line per group whose diff did not match the drawing, written as the run
goes. Nothing to say is the ordinary outcome, and an empty section is deleted
at closure.>
