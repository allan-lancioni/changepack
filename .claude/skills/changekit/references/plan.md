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
for the component. Copy each one from `templates/`, same name, and create only the files the
work needs. A template is a floor: add a section when it carries something
the work needs said, never to fill the page.

| File | When | Holds |
|---|---|---|
| `proposal.md` | always | problem, goal, scope, out of scope, success criteria |
| `tasks.md` | always | groups of work, each with one verifiable outcome |
| `design.md` | when the approach, compatibility or rollback is not obvious | how it is built, and how it is undone |
| `spec-delta.md` | only where the project has specs | what becomes normative: added, changed, removed |

Without specs, the intended behavior goes in `proposal.md` under Goal, and
there is no delta. Proposed behavior lives in the package either way. Never
write it into an active spec before closure.

## Decision gates

List every open decision about domain, schema, persistence, compatibility,
authorization or observable behavior. They go in `proposal.md`, under Open
decisions. A task group that waits on one says so in its `Status`. Give each one its alternatives and
their consequences. A package with an unanswered gate is not approvable, so
either get the answer now and record it, or write it down as blocking.

## Task groups

- One verifiable outcome per group, and a validation line that proves it.
- Order by dependency. Say which groups can run in parallel.
- Keep a migration against real user data as its own group, or out of scope.
- End with cleanup and closure.
- Do not write tasks that restate this procedure.

Present the package as a whole, then load `commit.md`: opening it is a commit
point, and it lands without asking. Stop there. Do not implement, and do not
ask to.
