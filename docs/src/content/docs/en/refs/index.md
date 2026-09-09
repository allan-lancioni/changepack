---
title: SKILL.md
description: >-
  The one file always in context: the project file, the gate, and direct work.
sidebar:
  order: 1
---

The only file that is always loaded. It reads the project file, classifies the
work, and carries direct work itself. Everything else is a reference, loaded
when its route is taken.

## Read the project file first

`CHANGEPACK.md`, at the root of the repository. It sets the changes path, the
documents a later change is held to, the language for written artifacts, the
validation command and the paths nothing may write.

Where it does not exist, the route is [init](/changepack/en/refs/init/), and
nothing is planned or implemented in the same turn. Where the version it
records is behind the running skill, that is said in one line before anything
else.

## Classify before editing

| The work | Route |
|---|---|
| Lands in one coherent pass, no unapproved decision in the way | Direct work, below |
| Larger, ambiguous, staged, migratory, or crossing contexts | [plan](/changepack/en/refs/plan/) |
| Running a package group by group, dispatching each | [run](/changepack/en/refs/run/) |
| Implementing one group yourself | [work](/changepack/en/refs/work/) |
| Looking without changing | [review](/changepack/en/refs/review/) |
| Every task checked and validated | [close](/changepack/en/refs/close/) |
| Updating the skill itself | [update](/changepack/en/refs/update/) |
| Explaining or changing the project file | [init](/changepack/en/refs/init/) |

A package is not opened because the work touches behavior. It is opened
because a single pass cannot land it. Direct work that runs into an unapproved
decision stops where it stands and re-routes to plan.

Opening one is confirmed first, with a question offering the package and the
direct pass, and nothing is written until the answer is in. The question is
skipped only when you asked for a package in so many words.

## Direct work

1. Name the intended behavior before editing.
2. In one pass, change the implementation, its consumers, its tests, and any
   normative document the change alters.
3. Leave no document ahead of the code that implements it.
4. Load [commit](/changepack/en/refs/commit/) to finish.

## Always

- Work that is not yours is preserved. A dirty file nobody touched is never
  reset, restored, restaged or reformatted, and a shared file is re-read
  immediately before it is patched.
- Implementation stops before a decision about domain, schema, persistence,
  compatibility, authorization or observable behavior. The alternatives and
  their consequences go to you, the answer is recorded, and then it continues.
- What is written into the repository follows the language `CHANGEPACK.md`
  records. What is said to you follows the language of your message. The two
  are independent and often differ.
- Every commit point commits without asking: the package when it opens, each
  task group as it lands, the archive move at closure.
- A protected path is never written.
