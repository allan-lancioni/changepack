---
title: What changepack is
description: >-
  Two reasons it exists, the unit it manages, and the three things it refuses
  to be.
sidebar:
  order: 1
---

changepack manages the changes to your code that do not fit in one pass. It is
markdown in your repository and nothing else, and you never invoke it: it reads
the conversation you are already having and engages when the work warrants it.

That is the whole of it. The rest of this page is why it is that way, and
nothing here binds a change. The rules live in the documents `normative:`
names. This is the reasoning behind the product itself.

## Why it exists

Two reasons, and they are independent of each other.

**Tokens were being devoured.** A long session pays for its whole history on
every turn, so the cost of a feature grows with the conversation that produced
it rather than with the feature. changepack is small because being small is the
point, not because it is unfinished. The claim it was built to make good on is
that running a change through it costs less than implementing the same thing by
hand.

**Nobody should have to learn a tool to get that.** Every procedure that
improves how an agent works charges for itself up front, in vocabulary,
commands, and files you write before any value arrives. That price falls on the
person least able to pay it, which is the one who has not used it yet.
changepack charges nothing at the door.

Everything below follows from one of those two.

## There is nothing to learn

You do not invoke changepack. You say what you want, in the words you would
have used anyway, and it decides whether the work fits in one pass or needs a
change.

That works because the trigger is the most ordinary word in software. You were
always going to say you wanted to change something, so there was never a term
to teach: the vocabulary was already yours. What the skill adds is a judgment
on top of a word you were going to type regardless.

Two things make that affordable. The skill's description stays in context on
every turn, which is what lets it recognise the moment without being called,
and it is under four hundred characters, which is what makes staying there cost
nothing worth counting. [SKILL.md](/changepack/en/refs/) and the routes load
only once the answer is yes.

The judgment itself is not the interesting part. Any tool can decline to run,
and not being invoked is the resting state of every skill there is. The
difference is that nothing has to invoke this one. You are not the router.

It also means there is no onboarding. The skill is committed, so a repository
hands it to everyone who clones it and nobody is trained:
[the team runs one procedure](/changepack/en/start/versioning/) and acquired it
by cloning.

## Small on purpose

changepack is one skill, and it pulls its rules in one route at a time. Every
piece carries a character ceiling, held by a check on every commit, so a turn
costs a few thousand characters instead of the whole procedure.

Running a change to the end gives each task group a fresh subagent, and each
one answers in four lines. The conversation driving the change does not grow
with the number of groups: what a group spends implementing is still what it
spends, and nothing else accumulates.

The ceilings are calibration rather than law. They came from measuring what a
turn actually loads, against cold and warm starts and against different ways of
cutting a change into groups, and they are expected to move as the procedure
grows. What matters is that what enters context is measured, not that it stays
under a number chosen once.

## Change driven, not spec first

Spec driven development makes the specification the artifact and the code a
regenerable output. It works, and it charges before it pays: adopting it means
writing specs for a system that already exists, which is a bill that arrives
before any value does.

changepack starts from the repository instead. The baseline is the code as it
stands, the artifact is the delta, and the question is only how to get from
here to there. That is already how you think about your own repository, which
is why there is nothing to adopt.

The specification is not refused. It is earned. A change carries a
[spec-delta.md](/changepack/en/refs/spec-delta/) when it alters something a
later change will be held to, and closure folds that delta into the document it
belongs in. A repository that starts with nothing normative accumulates it
change by change, and only where a change paid for it. The specification is the
residue, not the entry fee.

So changepack is not the opposite of spec driven tooling. It is the way in that
spec driven tooling does not have. Said as three positions:

- Spec first asks for the specification before the work.
- changepack asks for nothing, and produces the specification as the work
  closes.
- Running both is coherent, because the second feeds the first.

None of this was invented from nothing. OpenSpec was the inspiration, which is
why the shape is close: a change folder, a delta, a dated archive. What is
different is the entry point, and what was dropped is the ceremony that did not
pay for itself.

## It runs on top of almost anything

Every field in `CHANGEPACK.md` points at your project instead of prescribing
one. `validate:` takes whatever command you already have, or none. `normative:`
points at whatever documents you are already held to, or none. `commit:`
follows your log rather than setting a convention, `version:` points wherever
your version lives, and `changes:` accepts a path outside the repository
entirely.

That is one rule wearing five hats: changepack requires that work is proved and
refuses to say how. Prescribing a testing method, a branching model or a
document format would buy rigor in one repository and break every other one.

Which is why the range is as wide as it is:

| Where | How it lands |
|---|---|
| A brownfield monorepo | where it fits best. There is no retroactive specification to write, and the legacy is the baseline rather than the obstacle |
| A greenfield project | works too, and works especially well on top of a framework, where the early changes are all on top of conventions somebody else set |
| Any ecosystem | nothing enters your dependencies. A Python, Rust or Go project acquires no manifest, no lockfile and no installed tree |
| A repository that is only prose | a specification spread over forty files that reference each other is a change like any other |
| Your harness | the agent's own configuration, governed by the same three files |

The last row is the one worth saying out loud. changepack is built to be used
on the harness: your `AGENTS.md`, your `.claude/` directory, the skills and the
prompts you have accumulated. Those files decide how everything else gets
built, and they are usually the least governed thing in the repository. A
change is also where you think, and the agent writes the specification with
you, in a document you approve before any of it becomes normative.

This repository is the proof. changepack is planned, run and closed by
changepack.

## The unit is a change

A change is a folder. It opens when the work starts, it holds
[three files](/changepack/en/refs/change/) while it runs, and it is archived
with the date when the work is done.

Change is the short name of change package. There is no other unit hiding
behind the long one.

It exists for one reason, which is that the work does not fit in one coherent
pass. That is size and complexity, and it is never about how important the work
is or whether it touches behavior. Work that fits, lands. Work that does not
opens a change. Work that does not fit in one change becomes several.

What makes a change worth writing is that it outlives everything around it:

- It outlives the session, because a fresh one picks it up by reading the
  folder.
- It outlives the agent, because it is markdown and reads without the skill
  that produced it.
- It outlives the work, because the archive is dated and never pruned.
- It carries its own provenance. The frontmatter records the version that
  planned it and who opened it, and every commit it produced
  [names it in a trailer](/changepack/en/start/git/).

## What it is not

Three things it gets mistaken for. None of them is an omission.

**Not project management.** There is no assignee, no estimate, no status board,
no sprint. A change records what has to be true and what is left to do, and
says nothing about who does it or when. The archive is not a backlog either: a
ticket dies when it closes, and a change is written to be read after it closes.

**Not a workflow engine.** Nothing runs. No CLI in your repository, no daemon,
no hook installed in your tree, and no state anywhere but the repository
itself. Commands the agent runs are fine; machinery that runs without one is
not. The moment the substrate becomes a runtime it has to be installed, and
being installable is exactly what changepack refuses.

**Not the documentation of your system.** changepack does not describe what
your software does. It describes what one change does to it, and the part of
that description which outlives the change is folded into a document you
already had. A repository with nothing normative is valid and stays valid, and
a README never earns `normative:`, so drift there is a documentation bug rather
than a broken commitment.

Each of those is a decision rather than a gap, and they are written down here
so that a later change that undoes one has to argue with this page first.
