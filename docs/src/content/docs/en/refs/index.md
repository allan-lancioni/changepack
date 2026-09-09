---
title: SKILL.md
description: >-
  What is loaded on every turn, and the eight references it pulls in on demand.
sidebar:
  order: 1
---

changepack is one skill. `SKILL.md` is always in context; each route is a file
under `references/`, loaded only when that route is taken. This page is all of
them, short. The files themselves are the authority, and they ship in your
repository.

## SKILL.md

### Read the project file first

`CHANGEPACK.md`, at the root of the repository. It sets the changes path, the
documents a later change is held to, the language for written artifacts, the
validation command and the paths nothing may write.

Where it does not exist, the route is [init](#init), and nothing is planned or
implemented in the same turn. Where the version it records is behind the
running skill, that is said in one line before anything else.

### Classify before editing

| The work | Route |
|---|---|
| Lands in one coherent pass, no unapproved decision in the way | Direct work, below |
| Larger, ambiguous, staged, migratory, or crossing contexts | [plan](#plan) |
| Running a package group by group, dispatching each | [run](#run) |
| Implementing one group yourself | [work](#work) |
| Looking without changing | [review](#review) |
| Every task checked and validated | [close](#close) |
| Updating the skill itself | [update](#update) |
| Explaining or changing the project file | [init](#init) |

A package is not opened because the work touches behavior. It is opened
because a single pass cannot land it. Direct work that runs into an unapproved
decision stops where it stands and re-routes to plan.

Opening one is confirmed first, with a question offering the package and the
direct pass, and nothing is written until the answer is in. The question is
skipped only when you asked for a package in so many words.

### Direct work

1. Name the intended behavior before editing.
2. In one pass, change the implementation, its consumers, its tests, and any
   normative document the change alters.
3. Leave no document ahead of the code that implements it.
4. Load [commit](#commit) to finish.

### Always

- Work that is not yours is preserved. A dirty file nobody touched is never
  reset, restored, restaged or reformatted, and a shared file is re-read
  immediately before it is patched.
- Implementation stops before a decision about domain, schema, persistence,
  compatibility, authorization or observable behavior. The alternatives and
  their consequences go to you, the answer is recorded, and then it continues.
- What is written into the repository follows the language `CHANGEPACK.md`
  records. What is said to you follows the language of your message. The two
  are independent and often differ.
- Every commit point commits without asking.
- A protected path is never written.

## references/

Eight files, one loaded per turn. Each one says when it is taken, what it
writes, and where it stops.

### init

Taken when `CHANGEPACK.md` is missing, and whenever the configuration itself
is the subject.

It reads the repository and proposes a value for every field, asking only
about what it could not find. It writes `CHANGEPACK.md` and the changes
directory, says where each value came from, marks what it guessed, and waits:
that file is yours, so nothing is committed before you approve it.

It stops there. No planning and no implementation in the same turn, even when
the same message asked for both.

### plan

Taken when the work does not fit one coherent pass.

It writes `changes/active/<slug>/`: `change.md` and `tasks.md` always, and
`spec-delta.md` where the change alters something a later change is held to.
Every open decision goes in `change.md` as alternatives, costs and a
recommendation. A package with an unanswered decision is not approvable, so
the answer is either taken now or written down as blocking.

It stops after committing the package. It does not implement, and it does not
ask to.

### run

Taken to drive a whole package from one conversation. It dispatches, it
validates, it commits. It never implements.

One fresh agent per group, in order, never a reused one. Each is briefed with
the project file and the package in full, and answers in four lines: the files
it touched, the validation and its result, at most two sentences for the next
group, and whether it is blocked. The driving conversation runs the validation
again itself, reads the diff against the drawing in `change.md`, checks the
items, and commits that group alone.

It stops at a blocked group, at a validation that ran and failed, and at a
diff that left the group's scope. In those cases nothing is marked and nothing
is committed.

### work

Taken to implement one group by hand, one task at a time, in the conversation
you are already in.

It reads the package and the current authority for the behavior about to
change, asks once whether to stop after each group, and checks an item the
moment that item's own validation passes. A task is never left checked while
its work is incomplete.

It stops at an open decision the package did not approve, at a failed
validation, at the end of a group where you asked to stop, and when there is
no group left.

### review

Taken to look without changing.

It resolves the intended behavior, reads the whole diff in scope, traces each
rule to its implementation, its consumers and its tests, and looks for what is
missing rather than what is written: a consumer nobody migrated, a stale
reference, a rule stated twice, a decision taken but not recorded. Findings
come back ordered by impact, blocking before risk before cleanup, each with a
file and a line.

It changes nothing, including what is obviously broken.

### close

Taken when every task is checked and every dependency is done.

It audits the success criteria against behavior that exists rather than
against tasks that are checked, folds the delta into the documents it names,
searches the scope for drafts, scaffolds and dead references, and runs the
project's validation. Then it records the outcome in `change.md`, fills the
shipped version, ends the report with the package's own commits, and moves the
folder to `changes/archive/<YYYY-MM-DD>-<slug>/`.

A package that will not ship is closed the same way, never left open.

It stops after the archive commit, which lands alone.

### commit

Taken at the end of every route that changed a file. Three moments commit, and
each one commits alone: the package when it opens, a task group as it lands,
the archive move at closure.

A check behaves three ways and only one stops the run: it passes and is
reported, it fails and nothing is committed or marked, or it does not exist
and one line says so. A check that did not run is never presented as a check
that passed.

The subject says what is true now, in 72 characters or fewer. The body is
optional, never longer than 300 characters, and carries what behaves
differently rather than the reasoning: the reasoning is the package's. A
package's commits carry two trailers, `Change:` and `Changepack:`, and direct
work carries none. No agent is credited as co-author unless the project says
it must disclose.

### update

Taken from a closure, or when you ask for it in so many words.

The skill directory is replaced wholesale, so an update is a copy and never a
merge. It presents the entries the check printed and what each one costs,
names anything that asks for an edit by hand, and waits. Then it installs that
version, stamps `changepack:` in `CHANGEPACK.md`, and commits those two paths
alone: the rest of the tree is not part of it.

Declining is recorded too. Not now holds the version and asks again when
something newer ships; never turns the check off, and no network call outlives
that answer.

It stops where a package is open, and says the update runs once that package
closes.
