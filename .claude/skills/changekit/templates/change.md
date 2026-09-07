# <Title>

- **changekit:** <the version that planned this>
- **opened:** <YYYY-MM-DD>
- **shipped:** <filled at closure>

## Context

<What is true today, and why that is a problem. Two or three paragraphs, no
history and no options.>

## Goal

<The behavior that should be true when this closes. Where the project has no
specs, this is the normative part of the package: write it as a contract.>

<A line that names a file, a collection or a transaction belongs under Changes.
A line about what keeps working belongs under Cost.>

## Decided

<What this package settled: the question, what was chosen, and what the
alternative would have cost. A decision moves here from Open decisions when it
is answered.>

## Open decisions

- <The question, its alternatives, and what each one costs. Mark it blocking
  when no task can start without the answer.>

## Scope

- <What this change touches.>

Out of scope:

- <What was considered and deliberately left out, and why.>

## Changes

<Draw what moves, and nothing it does not. Pick the notation by what moves:>

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
