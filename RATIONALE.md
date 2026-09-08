# Rationale

Why changepack is the way it is.

`CHANGEPACK.md` is the contract, `CHANGELOG.md` is what changed and what it
costs, and the archive holds the reasoning of each package. None of them
holds the reasoning behind the product itself: what it is for, what was
refused on purpose, and what is still open. That is this file.

Nothing here is normative. A rule that binds a change belongs in a document
`normative:` names, not in this one.

## Why it exists

Tokens were being devoured. changepack is small because being small is the
point, not because it is unfinished. The claim it was built to make good on
is that running a change through it costs less than implementing the same
feature by hand, because the procedure caps how much context a run
accumulates instead of letting a long session pay for its whole history on
every turn.

It ran on large private repositories before it was extracted to its own,
long enough to say what it is for: there is no rework.

The first version was not written from nothing. OpenSpec was the
inspiration, which is why the shape is close: a change folder, a delta, a
dated archive. Rather than adopt it, an agent was asked to implement only
the part that was needed, and the rest grew from there. The reason for not
adopting it is the product's own thesis, applied to itself: nothing new was
going to be learned. changepack is what is left of that idea after the
ceremony that did not pay for itself is refused.

## The principle: change driven

Spec driven development makes the specification the artifact and the code a
regenerable output. That carries a cost before any value arrives, because
adopting it means writing specs for a system that already exists.

Change driven starts from the repository instead. The baseline is the code
as it stands, the artifact is the delta, and the question is how to move
from here to there. That is how a developer already thinks, which means
there is nothing to learn: talk to the agent, plan the task, and when the
plan is right, open the package with what is already in the conversation.

A specification is not refused, it is earned. A package carries a
`spec-delta.md` when the change alters something a later change is held to,
and closure folds it into the document it belongs in. A repository that
starts with nothing normative accumulates it change by change, only where it
paid for itself. The spec is the residue, not the entry fee.

## How it is actually used

`/changepack` is almost never typed. The skill's `description` stays resident
and the skill invokes itself when the work warrants it. In practice the user
says what they want, or asks for a change or a package, and the routing
happens without a command.

That is also why the gate is cheap. The last clause of the description,
`Not for edits that already fit a single coherent pass`, is the gate, and it
sits in text that is already paid for on every turn. `SKILL.md` and a route
load only once the answer is yes.

## Deliberate refusals

Each of these reads as a missing feature and is a decision. They are written
down here so that a later change does not fix one of them and lose the
reason.

| Not there | Why |
|---|---|
| An onboarding tutorial | There is no vocabulary to teach. `init.md` reads the repository and proposes a configuration in one turn, and everything else is Claude Code, which the user already knows. |
| A dependency in the governed repository | Publishing to npm is a channel, not a runtime. `npx changepack` copies markdown into `.claude/skills/` and adds nothing to the repository it governs, so a Python, Rust or Go project acquires no manifest, no lockfile and no installed tree, and `npx` was already how the skill arrived. This row used to refuse the package itself, on the grounds that git is the only thing every ecosystem shares; that confused the channel with a dependency. What survives the correction is the row below, which is the refusal that was doing the work all along. |
| A CLI in the governed repository | Nothing is installed where changepack runs. The state is the repository, which is also why there is nothing to phone home about. |
| A record of direct work | Direct work carries no trailers and stays indistinguishable from a commit made by hand. That is the cost of keeping short messages short, and it is accepted, including the metric it makes impossible. |
| One branch or worktree per package | The working tree is the review surface. Split it and the work stops being watched, either because following two branches means two editors, or because the second package never gets opened. The defensive rules about dirty files are the price of keeping one tree, paid on purpose. |
| Packages chained to each other | A queue would run the agent unattended across several approved units. `run.md` already offers the most autonomy this design should carry, and it is safe because it is bounded by one approved package. The focus is following the work, not automating past it. |

## What has already been measured

The context budget is calibration, not law. The numbers in `scripts/check.mjs`
came from measuring what a turn actually loads, against cold and warm starts
and against different ways of dividing a package into groups. What ships today
is the result of that work, and it is the point where the trade stopped
improving.

The ceilings are expected to move as the procedure grows. What matters is that
what enters context is measured, not that it stays under a number chosen once.

## Git as the substrate

changepack runs on git and should lean on it harder. The trailers already make
`git log --grep='Change: <slug>'` return a whole change in order, and the
frontmatter already lets an archived package say what it touched without being
opened. Together with the archive, that is an index nothing queries yet.

The direction is a route that reads it and reports: how many changes closed,
which documents keep changing, how often a package recorded a surprise. The
value is not the query, which anyone could write. It is that nobody ever
would. A route that returns it formatted is the same argument as the gate,
applied on the way out instead of on the way in: the tool does the thing that
is obviously worth doing and reliably skipped.

The one thing the substrate must not become is a runtime. Commands the agent
runs are fine. Hooks installed in the user's repository are not.

## Open directions

**Worktrees for parallel groups.** `order:` declares parallelism that a single
tree cannot deliver safely, and worktrees would make the collision impossible.
This is a real improvement and it is not blocking. It also has to be weighed
against the working tree being the review surface.

**Pruning the archive.** The cost is not disk, it is that archived packages
turn up in a grep and in an editor's search across the project. The shape
being considered leaves the body in git history and keeps a small YAML index
of what was pruned, with the date, the author and the hash, so it still
appears in a report and can be restored. It is a thought, not a decision, and
nothing forces it yet.

## Acknowledged gaps

**Nothing checks whether the request is specified enough to plan.** The gate
classifies size, not clarity. Asked to implement authentication with a
username and a password, changepack opens a package and invents the answers it
was not given. It should instead say what it does not know, raise the
fragilities it found and only those, and offer to settle them first, with an
explicit way to skip the conversation and proceed.

**Interface work is never validated before it is built.** The change draws
what moves, and there is no notation for what a person sees. A design file
helps a little and not much, because closure audits against behavior and a
picture gives it nothing to check.

**Nothing addresses tests.** Repositories running changepack test well, but by
intuition rather than by procedure. Nothing says red first, nothing says
criteria before code, and it is not settled whether saying so is changepack's
place at all: the repository has to work either way, and this is a procedure
rather than a framework. If it belongs anywhere it belongs in `CHANGEPACK.md`,
as the project's own convention.

**Splitting one request into several packages happens without a procedure.**
It works, and how it decides is not written anywhere. There is also nothing
that records one package depending on another, which is a fact worth keeping
even though chaining them is refused.

## What is not changepack's responsibility

The pattern under several of the entries above is one rule. changepack
requires that work is proved and refuses to say how: `validate:` names the
project's command, each task group carries the observation that proves it,
and closure audits criteria against behavior that exists. The same posture
governs `normative:`, which points at documents instead of assuming them, and
`commit:`, which follows the project's convention and never sets it.

That restraint is why the procedure runs in a legacy system with no
specification and in a repository that is nothing but prose. Prescribing a
testing method, a branching model or a document format would buy rigor in one
repository and break every other one.
