---
title: <Title>
description: <One line saying what the change is, so a listing of archived
  packages reads without opening any of them.>
changekit: <the version that planned this>
opened: <YYYY-MM-DD>
opened-by: <the git identity that signs the opening commit, as name and email>
issue: <the issue or discussion this came from; omit the key when there is
  none>
shipped: <the release this shipped in, filled at closure; omit the key until
  then>
---

## Context

<Why now, in one paragraph: what is true today and why that is a problem. The
description already said what the change is, so never repeat it here. No
history and no options.>

## Goal

<The contract: the behavior that should be true when this closes, and no more
of it than the change needs. Where the project has no specs, this is the
normative part of the package, so write it as a contract.>

<A line that names a file, a collection or a transaction belongs under Changes.
A line about what keeps working belongs under Cost.>

## Changes

<This section is written last and read first: the drawing is the last thing
known at plan time and the first thing a reader wants. Understand the change,
then draw it here.>

<A line above each drawing, saying what it shows, so the drawing is read rather
than decoded. Then draw what moves, and nothing it does not. Pick the notation
by what moves:>

- <files, modules, packages: a tree, marked `+` added, `-` removed,
  `~` changed;>
- <collection, table, field, state: a table of what each becomes;>
- <route, stream, order in time: a sequence;>
- <service, deploy, routing: a flow.>

<Most changes move two of these. Prefer the tree and the table: they read in a
terminal, on a forge and in an editor alike, with nothing installed.>

<Then the prose the drawing cannot carry, and only that: why this shape and not
the other one. Never restate the drawing.>

<If nothing structural moves, there is no drawing, and probably no package.>

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
- **A revert does not undo:** <only what reverting the drawing would leave
  behind: data written, a policy dropped, an order between groups, a deploy
  that has to be applied rather than reverted. Where the revert is the inverse
  of the drawing, write nothing.>

## Success criteria

- <Observable, and checkable at closure by looking at behavior.>

## Outcome

<Written at closure: what shipped, what changed on the way, what was left.
If the package was dropped instead, say so here, and why.>

## Surprises

<One line per group whose diff did not match the drawing, written as the run
goes. Nothing to say is the ordinary outcome, and an empty section is deleted
at closure.>
