---
title: The routes
description: >-
  Eight files, one of which a turn loads, and what picks between them.
sidebar:
  order: 1
---

`SKILL.md` is always in context. It holds the gate, the table that classifies
the work, and direct work itself. Everything that obliges more than a
paragraph lives in one of eight files under `references/`, and a turn loads
the one it needs.

Before any of them, the agent reads `CHANGEPACK.md`. That file sets the
changes path, the documents a later change is held to, the language, the
validation command and the paths nothing may write. Where it is missing, the
only route available is [init](/changepack/en/routes/init/).

## What picks the route

| The work | Route |
|---|---|
| Lands in one coherent pass, no unapproved decision in the way | Direct work, in `SKILL.md` |
| Larger, ambiguous, staged, migratory, or crossing contexts | [plan](/changepack/en/routes/plan/) |
| Running a package group by group, dispatching each | [run](/changepack/en/routes/run/) |
| Implementing one group yourself | [work](/changepack/en/routes/work/) |
| Looking without changing | [review](/changepack/en/routes/review/) |
| Every task checked and validated | [close](/changepack/en/routes/close/) |
| Updating the skill itself | [update](/changepack/en/routes/update/) |
| Explaining or changing the project file | [init](/changepack/en/routes/init/) |

The gate does not read the subject of the work. Touching behavior is not what
opens a package; a single pass failing to land it is. Direct work that runs
into a decision nobody approved stops where it stands and re-routes to plan.

## Where each one stops

A route is written to end somewhere, and where it ends is most of what it
says.

| Route | It writes | It stops |
|---|---|---|
| init | `CHANGEPACK.md`, and the changes directory | before planning or implementing anything |
| plan | the package | before a line of implementation |
| run | `tasks.md`, `change.md`, and one commit per group | at a blocked group, a failed validation, or a diff outside scope |
| work | the implementation, and `tasks.md` | at the end of a group, or at an open decision |
| review | nothing at all | it changes nothing, including what is obviously broken |
| close | the outcome, and the archive move | after the archive commit |
| commit | the commit | after reporting the hash and what is left in the tree |
| update | the skill directory, and one line of `CHANGEPACK.md` | before touching anything else in the tree |

## Every route that changed a file ends on commit

[commit](/changepack/en/routes/commit/) is not chosen from the table above. It
is loaded at the end of whatever route wrote something, and it is the only
place that validates, reports and commits. Three moments commit, and each one
commits alone: the package when it opens, a task group as it lands, the
archive move at closure.

## One file at a time

The routes sit in separate files because a turn pays for what it loaded. The
gate costs a page. A route costs a page. A package being run costs a page, its
own files, and four lines back from each group.

Every file has a character ceiling, held by a check on every commit, so the
budget is a fact of the repository and not an intention.
