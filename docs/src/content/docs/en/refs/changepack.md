---
title: CHANGEPACK.md
description: >-
  The one file the project owns, and what every route reads back from it.
sidebar:
  order: 2
---

The only file the project owns. Everything else changepack ships is replaced
wholesale on update, so whatever you decide about how change packages work
here lives in this one file, at the root of the repository.

Every route reads it before anything else.

```markdown
# Changepack

How change packages work in this repository.

- **changepack:** 1.0.0
- **changes:** changes/
- **normative:** `CLAUDE.md`, `AGENTS.md`, `.claude/`
- **language:** English. Everything changepack writes here follows it; what it
  says to you follows your message.
```

## The nine fields

| Field | Accepts | Absent means |
|---|---|---|
| `changepack` | the version this project runs | it is stamped from the running skill |
| `changes` | a path, in this repository or outside it | `changes/` |
| `normative` | the documents a later change is held to, or none | `CLAUDE.md`, `AGENTS.md`, `.claude/` |
| `language` | what gets written into the repository | English |
| `version` | where this project's own version lives | none, and a change records no shipped version |
| `validate` | one command, or none | no command: the routes report that and continue |
| `commit` | the convention, `ask first`, and `co-author` where the project must disclose | conventional, without asking, and no agent co-author |
| `protect` | paths nothing may write | nothing is protected |
| `updates` | `ask at closure`, `hold <version>`, `off` | `ask at closure` |

The field keys stay English even where the file is written in another
language. They are what the skill reads back.

## What earns `normative:`

A document earns it when something is held to it and it has named units you
can name before and find after: the behavior specs, `CLAUDE.md`, `AGENTS.md`,
what is under `.claude/`. A generated file has neither. A README fails the
first test, so drift there is a documentation bug rather than a broken
commitment.

A change that alters one of these carries a
[spec-delta.md](/changepack/en/refs/spec-delta/). Where the field says none,
no change ever does.

## The ones that read oddly

`language:` governs what is written into the repository: the change files,
their slugs, this file, the commit messages. What is said to you follows the
language of your message instead, so the two are independent and often differ.
Code follows the conventions around it and not this field.

`validate:` takes one command, and a project with none is ordinary rather than
incomplete. Every commit point then reports that no command ran and continues.

`protect:` is for paths nothing may write: real user data, secrets, generated
output, a sibling checkout. In this repository it names the copy of the skill
Claude Code loads, which `bin/install.mjs` writes and nothing else may.

`updates:` records a decision rather than a date. Declining once holds that
version and asks again when something newer ships; `off` ends the check for
good, and the network call with it.

## House rules

A section under the list, for anything a change here has to respect that the
fields do not say. It is deleted where there is nothing.

## Who writes it

[init](/changepack/en/refs/#init) writes it on the first run, says where each
value came from, marks what it guessed, and waits: the values are yours to
approve, and the commit touches nothing else.

After that only [update](/changepack/en/refs/#update) stamps `changepack:`
when a new version lands, and the `updates:` line when you decline one. An
agent implementing a task group never writes this file at all.
