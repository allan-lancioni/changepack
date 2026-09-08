# Plan

Produce a package and stop. Never implement in the same turn.

## Confirm first

Unless the user asked for a package in so many words, ask before writing one.
Use AskUserQuestion, a single question stating what you classified and why,
with three options:

- open the package, naming what it would cover;
- do it directly in one pass, naming what that leaves unresolved;
- neither: stop here.

Write nothing until the answer is in. When the answer is the direct pass, go
back to `SKILL.md` and take that route.

## Before writing

1. State the problem and the behavior observable today.
2. Inventory what the change reaches: code, consumers, tests, scripts,
   templates, documents, and specs where the project has them.
3. Read `changes/active/` and stop if an open package already owns any of it.

## Write the package

Create `changes/active/<slug>/`, kebab-case, named for the outcome and not
for the component. Copy each one from `templates/`, same name, and create
only the files the work needs. A template is a floor: add a section when it
carries something the work needs said, never to fill the page.

| File | When | Holds |
|---|---|---|
| `change.md` | always | problem, goal, decisions, scope, the drawing, cost, success criteria |
| `tasks.md` | always | groups of work, each with one verifiable outcome |
| `spec-delta.md` | when the change alters something a later change is held to | what becomes normative, under the document it lands in |

Stamp the frontmatter as you write each file. `change.md` carries `title`,
`description`, `changekit` (the version from the marker at the end of
`SKILL.md`), `opened` (today), `opened-by`, and `issue`; `shipped` is filled at
closure. `tasks.md` carries `title`, `groups`, `order` and `blocked`.
`spec-delta.md` carries `title` and `documents`. A key with no value is omitted
rather than written empty.

`opened-by` is `git config user.name` and `user.email` resolved in the
package's own repository, local before global. It is the identity that signs
the opening commit, and the two have to agree.

Where nothing normative changes, the intended behavior goes in `change.md`
under Goal, and there is no delta. Proposed behavior lives in the package
either way. Never write it into a normative document before closure.

## Decision gates

List every open decision about domain, schema, persistence, compatibility,
authorization or observable behavior. They go in `change.md`, under Open
decisions: the alternatives and their costs in a table, the recommendation in
prose under it. A task group that waits on one says so in its `Status`, and in
`blocked`. A package with an unanswered gate is not approvable, so either get
the answer now and record it, or write it down as blocking. An answered gate
moves to `Decided`, and is not deleted.

Past two blocking gates the shape of the work is not settled. Say so before
writing, with the count, and offer to settle them first. The package is not
refused.

## Task groups

- One verifiable outcome per group, and a validation line that proves it.
- Order by dependency. Say which groups can run in parallel.
- Keep a migration against real user data as its own group, or out of scope.
- End with cleanup and closure.
- Do not write tasks that restate this procedure.

Present the package as a whole, then load `commit.md`: opening it is a commit
point, and it lands without asking. Stop there. Do not implement, and do not
ask to.
