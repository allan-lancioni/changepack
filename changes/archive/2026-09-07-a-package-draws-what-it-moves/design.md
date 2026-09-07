# A package draws what it moves: design

Written in the shape it proposes, because a package that argues for a drawing
and does not draw is the argument against itself.

## Approach

```
skill/templates/
- proposal.md                 892 chars, merged into change.md
- design.md                   241 chars, merged into change.md
+ change.md                   the two, minus what was derived
~ spec-delta.md               what earns one stops being "the project has specs"
~ changekit.md                specs: becomes normative:
  tasks.md                    untouched

skill/references/
~ plan.md                     the file table, the stamping, the specs paragraph
~ run.md                      the brief inlines change.md, drawing included
~ work.md                     "proposal, tasks, and design or delta" is one file
~ close.md                    Outcome and Surprises; the delta folds as it does
~ init.md                     infers normative:, discovers what it can
  SKILL.md                    names no template; unchanged
  review.md, commit.md,       name nothing this renames
  update.md

scripts/check.mjs
~ TOTAL_MAX                   raised in group 1, set deliberately in group 5
  invariant 4                 already proves plan.md names a template that exists
```

### `change.md` is the two files minus what was derived

The spine is the proposal's, in its order, with three insertions and two
deletions. `Decided` goes above `Open decisions`, so a decision migrates
between adjacent sections rather than across a file. `Changes` takes the
design's `Approach` and requires a drawing. `Cost` takes what `Compatibility`
and `Rollback` were, as two lines rather than two sections. `Surprises` sits
beside `Outcome`, both written at closure.

What is deleted is not content: it is restatement. Eighteen of thirty
rollbacks said the revert is the inverse of the change, and a drawing that
already names what moves says that without a sentence.

### The drawing is chosen by what moves, not by taste

Four notations, one line each in the template, and a fifth case that opens no
package at all. The tree and the table are named as the default because they
are text: a terminal, a forge and an editor all render them, and mermaid needs
a renderer. Mermaid is the exception, declared where order in time or topology
is the thing that changed.

The template says draw *and nothing more*, because the failure mode here is not
too few drawings. It is a drawing plus the paragraph that repeats it.

### The delta is asked for by what the change edits

`normative:` replaces `specs:`. Its default is discovered rather than
configured: `CLAUDE.md`, `AGENTS.md` and `.claude/` are found by looking, and
what a project must still say is where its behaviour specs live, when it has
any. `init.md` proposes the discovered set and asks only about the rest.

The condition that keeps it from becoming ceremony is not a list of paths. It
is whether this change alters something a later change will be held to. Renaming
a heading does not. Changing what `commit.md` obliges does.

## Compatibility

Nothing in this repository breaks while it lands. The loaded copy under
`.claude/skills/changekit/` keeps answering with 0.7.0 for the whole run, which
is what the house rule already arranges and what `check.mjs` already tolerates
for an open package that touches `skill/`. The procedure this package writes
applies from the session after it closes.

Downstream is where the break is, and it is deliberate. A project on 0.7.0 with
an open package holding `proposal.md` and `design.md` has to rename and merge
them by hand. That is the definition of a major in this project's own changelog,
and it is why the number moves to 1.0.0 rather than 0.8.0. A project with no
open package pays nothing but the install.

`specs: none` stays readable: `init.md` and the changelog say what it becomes,
and a `CHANGEKIT.md` that still says `specs:` is a hand edit of one word.

## Rollback

Per group, and nothing is a migration until group 5.

Groups 1 to 4 edit `skill/` alone, which no other repository reads until it is
installed, and the loaded copy is not refreshed until closure. Reverting any of
them is reverting its commit.

Group 5 is the one that cannot be quietly undone, because it publishes: the
version, the changelog entry and the reinstall land together, and a project may
have installed between that commit and the revert. Undoing it after that is a
new version saying so, not a revert. That is the ordinary cost of a release and
is the reason the version moves last.
