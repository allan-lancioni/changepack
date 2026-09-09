---
title: change.md
description: >-
  The context, the goal, the drawing of what changes, and the cost.
sidebar:
  order: 3
---

Why the change exists, and what will be true when it closes. It is written
when the package opens, read before every group, and finished at closure. It
is also where the reasoning lives, which is why a commit body never carries
any: the reasoning is the package's, and the package is archived.

## The frontmatter

| Key | Holds |
|---|---|
| `title` | the package, named for the outcome |
| `description` | one line, so a listing of archived packages reads without opening any |
| `changepack` | the version that planned it |
| `opened` | the day it opened |
| `opened-by` | the git identity that signs the opening commit, name and email |
| `issue` | where the work came from, omitted when there is none |
| `shipped` | the release it shipped in, filled at closure |

A key with no value is omitted rather than written empty.

## The sections

| Section | Holds |
|---|---|
| Context | what is true today, and why that is a problem |
| Goal | the behavior that should be true at closure, written as a contract |
| Changes | the drawing of what moves |
| Open decisions | the questions in the way, with alternatives and costs |
| Decided | what the package settled, and what the alternative would have cost |
| Scope | what it touches, and what was left out on purpose |
| Cost | what keeps working, and what a revert does not undo |
| Success criteria | what closure can check by looking at behavior |
| Outcome | what shipped, what changed on the way, what was left |
| Surprises | a line per group whose diff did not match the drawing |

The template is a floor. A section is added because the work has something to
say there, never to fill the page.

## The drawing

Written last and read first: understand the change, then draw it. Draw what
moves and nothing it does not, and pick the notation by what moves.

| What moves | Notation |
|---|---|
| files, modules, packages | a tree, marked `+` added, `-` removed, `~` changed |
| collection, table, field, state | a table of what each becomes |
| route, stream, order in time | a sequence |
| service, deploy, routing | a flow |

Most changes move two of these. The tree and the table are preferred because
they read in a terminal, on a forge and in an editor alike, with nothing
installed. Under the drawing goes only the prose the drawing cannot carry, and
that is why this shape and not the other one.

Where nothing structural moves there is no drawing, and probably no package.

The drawing is not decoration. While the package runs, each group's diff is
read against it, and where the two disagree a line goes under Surprises.

## Decisions

An open decision is the question in bold, the alternatives and their costs in
a table, and the recommendation in prose under it. It says it is blocking when
no task can start without the answer, and the groups it holds say so too.

An answered decision moves to Decided and is not deleted. The package keeps
what was chosen and what the alternative would have cost, which is the record
nobody has to reconstruct later.

## At closure

Outcome is written then: what shipped, what changed on the way, and what was
left for later. A package that will not ship says that here instead, with what
was built and left behind, and what would have to be true for the work to come
back.

Surprises is deleted where nothing was written under it. Where lines stand,
they stay as part of the record.
