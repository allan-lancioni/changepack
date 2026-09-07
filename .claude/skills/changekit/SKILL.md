---
name: changekit
description: Plan, implement, review and close change packages, the folders under changes/ that hold work too large or too uncertain to land in one pass. Use when asked to plan a change, when continuing a task in changes/active/, when reviewing or closing a package, or when deciding whether work needs one. Not for edits that already fit a single coherent pass.
---

# Changekit

A change package is one unit of planned work. It lives in
`changes/active/<slug>/` while it runs and moves to
`changes/archive/<YYYY-MM-DD>-<slug>/` when it closes.

## Read the project file first

Read `CHANGEKIT.md`, at the root of the repository. It sets the changes path,
whether this project
has specs, the language for written artifacts, the validation command,
and the paths you must never write.

If it does not exist, load `references/init.md` and follow it. Do not plan
or implement in the same turn.
If the version it records is behind the marker at the end of this file, say so
in one line before continuing, so the project can refresh it.

## Classify before you edit

| The work | Route |
|---|---|
| Lands in one coherent pass, no unapproved decision in the way | Direct, below |
| Larger, ambiguous, staged, migratory, or crossing contexts | `references/plan.md` |
| Running a package group by group, dispatching each | `references/run.md` |
| Implementing one group yourself | `references/work.md` |
| Looking without changing | `references/review.md` |
| Every task checked and validated | `references/close.md` |
| Updating the skill itself | `references/update.md` |

Do not open a package because the work touches behavior. Open one because a
single pass cannot land it. If direct work runs into an unapproved decision,
stop and re-route to `plan.md`.

Confirm before opening one. Ask with AskUserQuestion, offering the package and
the direct pass, and write nothing until the answer is in. Skip the question
only when the user asked for a package in so many words. `plan.md` carries the
form.

## Direct work

1. Name the intended behavior before editing.
2. In one pass, change the implementation, its consumers, its tests, and,
   where this project has specs, the spec.
3. Leave no spec ahead of the code that implements it.
4. Load `references/commit.md` to finish.

## Always

- Preserve work that is not yours. Never reset, restore, restage or reformat
  a dirty file you did not touch. Re-read a shared file immediately before
  patching it.
- Stop before implementing when the work needs a decision about domain,
  schema, persistence, compatibility, authorization or observable behavior.
  Present the alternatives and their consequences, get an answer, record it
  in the package, then continue.
- Write in the language `CHANGEKIT.md` records: the package files, their
  slugs, that file itself, the commit messages. Answer the user in the
  language of their message, English when it carries no signal. The two are
  independent and often differ. Code follows the conventions around it and
  not this field, and an existing document follows its own language.
- Commit at each commit point without asking: the package when it opens, each
  task group as it lands, the archive move at closure. `commit.md` carries the
  exceptions.
- Never write a protected path.

<!-- changekit 0.5.0 -->
