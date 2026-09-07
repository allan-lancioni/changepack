# A package draws what it moves

- **changekit:** 0.7.0
- **opened:** 2026-09-07
- **shipped:** 1.0.0

## Context

A package is four files, and three of the boundaries between them were
inherited rather than chosen. Kiro and spec-kit split requirements from design
because each file is one command's output and one human approval: Kiro's own
documentation says "you approve each one before the next begins", and it later
shipped a mode that keeps the files and drops the gates. `plan.md` presents the
package as a whole. One turn, one approval, and a seam that buys nothing.

The seam leaks, measurably. Across 38 packages in a repository that has run
this procedure since 0.1.0: 21 of 38 Goals name a file, a route or a
transaction, which is the design's work done in the proposal; 20 of 38
proposals invented a section for settled decisions, under four different names,
because the template has a gate for open ones and no home for closed ones; and
37 of 38 packages opened a `design.md` whose condition reads "when the approach
is not obvious", which is a condition that never excludes anything.

What those designs hold is structure written as prose. Not one of the 37
carries a drawing: no diagram, no tree, three tables. One of them spends 27
file paths in 668 words. Another spends 400 words saying which of two dozen
functions move and which stay. And 18 of 30 `Rollback` sections say the revert
is the inverse of the change, which the drawing would have said.

The one artifact that works is the one nothing was inherited for. The spec
delta names each rule, so what it claimed can be checked afterwards: of 42
guarantees declared across 13 packages, 40 reached a spec and the 2 that did
not are explained at closure. Nothing else in the package can be checked that
way. But it is gated on `specs:`, and this repository has none, so
`change-provenance` edited eleven normative documents, including six routes of
this skill, and left no record of what became normative. This package cannot
carry a delta either, for the same reason, which is the clearest statement of
the problem available.

## Decided

The template offers no home for a settled decision, so this section is written
into it, exactly as 20 of 38 packages did before. `plan.md` sanctions it: a
template is a floor.

### The package is one change, one delta and the tasks

`proposal.md` and `design.md` become `change.md`. They are approved together,
amended together at every stop, and archived together. `tasks.md` stays
untouched: it is edited alone in 131 of 182 modification commits, and that
different rhythm is the boundary that pays for itself. `spec-delta.md` stays
apart for the reason the other two lack: it is the only file whose content
leaves the package.

### The name stays `spec-delta.md`

It covers more than behaviour specs now, and `delta.md` beside `change.md`
would be two words for the same idea. `spec-delta` is what the field already
calls this, and the concept travels on a name people recognise. What a spec is
here is what the configuration says it is.

### A drawing, then only what a drawing cannot carry

The four shapes the 37 designs actually needed: a tree for files and modules, a
table for collections, fields and states, a sequence for order in time, a flow
for services and routing. The tree and the table are the default because they
read in a terminal, on a forge and in an editor with nothing installed. Most
changes need two of them.

### Compatibility and rollback are notes on the drawing

Not sections. `Cost` carries what keeps working and what a revert does not
undo, and the second line is written only where the revert is not the inverse
of the drawing. Silence is the ordinary answer.

### The delta covers every document a later change is held to

Measured against the same 38 packages: every one that touched a spec wrote a
delta, 23 of 23, so the rule was never loose, only narrow. Widening it to the
documents an agent reads as authority adds seven packages, 24 to 31 of 39. The
seven are real: they add 14 to 33 lines of named rules to files like
`packages/cards/CLAUDE.md`, and a later change is held to every one.

### The delta stays in the package

Settled in 0.7.0, after finding that "no longer needed" was read both ways in
the same repository: 14 deltas kept and about 11 deleted on folding. Deleting
it throws away the only property that makes it worth more than a diff.

### The context ceiling rises to 34,000

30,000 was a drift alarm, not a product requirement, and the skill has grown a
capability since the number was set. It rises once, in group 1, and group 5
confirms it against the finished size and names the margin in the comment
rather than leaving it implied.

### The installer replaces rather than copies over

Taken at closure, when the reinstall left `proposal.md` and `design.md` in the
loaded copy and `npm run check` refused the closure. `bin/install.mjs` copied
with `cpSync` and deleted nothing, so a file removed from a release would have
survived in every installation. `CHANGEKIT.md` already claimed the reinstall
was destructive; the code was not. Shipping 1.0.0 without this would have made
every project's loaded skill hold two templates the procedure no longer names.
The alternative, asking each project to delete them by hand, charges everyone
for a defect in the tool.

## Scope

- `bin/install.mjs`: the reinstall clears the target before copying.
- `change.md`: the merged template, its drawing, and its `Cost`, `Decided`
  and `Surprises` sections. `proposal.md` and `design.md` are removed.
- `spec-delta.md`: what earns a delta, stated without reference to specs alone.
- `changekit.md` and `init.md`: `specs:` becomes `normative:`, defaulting to
  the documents that can be discovered without configuration.
- `plan.md`, `run.md`, `work.md`, `close.md`: every route that names a file
  this package renames, or a section it moves.
- `README.md`: the package's files, as described to someone deciding.
- `scripts/check.mjs`: the context ceiling, loosened to land this and set
  deliberately at closure.
- `CHANGELOG.md` and the version, at 1.0.0.

Out of scope:

- **Archived packages.** `change-provenance` keeps its `proposal.md` and
  `design.md`. An archive is history and is not migrated.
- **`README.md` as a delta target.** Nothing is held to a README; drift there
  is a documentation bug and not a broken commitment. The criterion is that
  something is held to the document, and the README fails it.
- **`review.md`.** It names no file this package renames.
- **Anything about how tasks are written.** `tasks.md` is untouched, and a
  package that changes both at once cannot say which change did what.

## Open decisions

None.

## Success criteria

- A package planned after this lands has `change.md`, `tasks.md` and, where the
  change edits a normative document, `spec-delta.md`. No `proposal.md` and no
  `design.md` are written.
- `change.md` carries a drawing of what moves, and its prose does not restate
  the drawing.
- A `Cost` line about rollback appears only where a revert would leave
  something behind.
- A settled decision has a section to go in, and an open one still has its gate.
- `spec-delta.md` is asked for by what the change edits, not by whether the
  project has behaviour specs.
- Every route that names a package file names one that exists.
- `npm run check` passes, and the four invariants are unchanged in kind.
- A project on 0.7.0 reading `CHANGELOG.md` learns that an open package has to
  be renamed by hand, which is what makes this a major.

## Outcome

A package is `change.md`, `tasks.md` and, where the change alters something a
later change is held to, `spec-delta.md`. `change.md` requires a drawing of
what moves and carries the prose the drawing cannot; `Compatibility` and
`Rollback` are two lines of `Cost`, written only when they have something to
say; `Decided` sits above `Open decisions` and an answered gate migrates rather
than disappearing; `Surprises` records a group whose diff did not match the
drawing. `normative:` replaces `specs:` and discovers its own default. Shipped
as 1.0.0, the first major, and it costs every project a hand edit of
`CHANGEKIT.md` and of any open package.

### What changed on the way

**A sixth group, found by the fifth agent rather than by the plan.** The
package scoped `SKILL.md` as unchanged because it names no template. It names
the *field*: twice, plus once in `close.md`. Renaming `specs:` to `normative:`
would have left the skill telling an agent to read a configuration key its own
template no longer defines, and no invariant in `npm run check` catches that.
Group 3 reported it instead of deciding, which is what the return contract asks
for and what made the repair a group rather than a silent edit.

**The brief carried `design.md`, against the procedure it was running under.**
`run.md` at 0.7.0 inlines `CHANGEKIT.md`, `proposal.md` and `tasks.md` — the
defect group 4 repaired. Withholding the drawing from the agent writing the
file that carries the drawing would have been following the letter against the
sense, so every brief in this run included it. The run therefore proved the fix
before landing it.

**Two of six groups carried a validation another group had to satisfy.** Group
2's `grep proposal` needed group 4; group 4's needed group 3. Both were true
statements about the package and neither was provable by the group that owned
it, so both went unmet at the moment their group closed. A group's validation
has to be provable by that group, or it proves nothing when the box is checked.
That is a lesson about writing task groups, and nothing in the procedure says
it yet.

**This repository's `normative:` is `skill/`.** Set at closure, and it means
this package would have carried a spec delta under its own new rule — the one
thing it argued for and could not do for itself, because it planned under
`specs: none`. The next package here carries one.

**The installer never deleted anything, and nothing had ever asked it to.**
This is the first package to remove a file from `skill/`, so the defect was
nine versions old and had never fired. `npm run check` caught it at closure, in
the reverse direction of invariant 1: a file in the loaded copy and not in the
source. The validation earned its keep.

### Left for later

- **`scripts/check.mjs` says the README quotes its numbers.** The README quotes
  none of them. The comment is stale, predates this package and was left alone.
- **No invariant catches a dangling configuration field.** `npm run check`
  proves that a named file exists; nothing proves that a named field does. That
  is what made group 5 necessary and a person is still what finds it.
- **The archived `change-provenance` keeps `proposal.md` and `design.md`.**
  Deliberate: an archive is history.
