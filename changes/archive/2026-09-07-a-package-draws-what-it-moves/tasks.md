# A package draws what it moves: tasks

One group at a time. Check an item only after its validation passes.

Group 1 comes first: every group after it grows `skill/` before the merge gives
space back. Group 2 comes next, because 3 and 4 both edit files it rewrites.
Groups 3 and 4 need only 2 and may run beside each other. Group 5 was opened
by group 3. Group 6 needs all of them.

## 1. There is room to land this

Status: completed

- [x] `scripts/check.mjs`: raise `TOTAL_MAX` to 34000, with a comment naming
      group 5 of this package as what sets the real number.

Validation:

- `npm run check` passes and its note reports the new ceiling.

## 2. A package is one change, one delta and the tasks

Status: completed, with one deviation of my own making. The second validation
line was written for the wrong group: `run.md` and `close.md` still name
`proposal.md`, and group 4 owns both files. The grep it asks for is already
group 4's, and is left there.

- [x] `skill/templates/change.md`: the merged template. `Context`, `Goal`,
      `Decided`, `Open decisions`, `Scope`, `Changes`, `Cost`,
      `Success criteria`, `Outcome`, `Surprises`, and the 0.6.0 header.
- [x] `Changes` names the four notations, the tree and the table as the
      default, and says to draw and not to restate the drawing.
- [x] `Cost` carries two lines, each deleted when it has nothing to say.
- [x] Delete `skill/templates/proposal.md` and `skill/templates/design.md`.
- [x] `skill/references/plan.md`: the file table names `change.md`,
      `tasks.md` and `spec-delta.md`; the stamping line names `change.md`;
      the paragraph about where intended behavior goes without specs follows.

Validation:

- `npm run check` passes, which proves `plan.md` names no template that is gone.
- `ls skill/templates/` holds `change.md`, `tasks.md` and `spec-delta.md`,
  and neither file this group deleted.

## 3. The delta is asked for by what the change edits

Status: completed. It reported, rather than decided, that renaming the field
leaves `SKILL.md` and `close.md` naming one that no longer exists. Group 5 is
opened for it.

- [x] `skill/templates/spec-delta.md`: what earns a delta is that a later
      change is held to the document, not that the project has behaviour specs.
      The heading-per-document and the `+ ~ -` markers stay as 0.7.0 left them.
- [x] `skill/templates/changekit.md`: `specs:` becomes `normative:`, with the
      discovered default written out and behaviour specs as the part a project
      adds.
- [x] `skill/references/init.md`: the inference table row, discovering
      `CLAUDE.md`, `AGENTS.md` and `.claude/` and asking only about specs.
- [x] `skill/references/plan.md`: the delta's row states the same condition.
- [x] `README.md`: the sentence describing what a package carries.

Validation:

- `npm run check` passes.
- A `CHANGEKIT.md` written from the template names `normative:` and no
  `specs:`, and reading `init.md` alone is enough to fill it.

## 4. Every route reads the new package

Status: completed, and the same deviation as group 2, which is now a pattern
worth naming: the `grep -rn 'proposal' skill/` line needs group 3's `init.md`
to land before it can go clean. Two of five groups carried a validation another
group had to satisfy.

- [x] `skill/references/run.md`: the brief inlines `CHANGEKIT.md`, `change.md`
      and `tasks.md`, so the agent implementing a group receives the drawing.
- [x] `skill/references/work.md`: reads `change.md`, `tasks.md`, and the delta
      where it exists.
- [x] `skill/references/close.md`: the outcome goes in `change.md`; `Surprises`
      is written per group whose diff did not match the drawing, and silence is
      the ordinary outcome.
- [x] `skill/references/run.md`: after a group returns, the diff is read
      against the drawing, and only a mismatch is written down.

Validation:

- `npm run check` passes.
- `grep -rn 'proposal' skill/` returns nothing.
- Each of `plan.md`, `run.md`, `work.md`, `close.md` names `change.md` and none
  names a file that is not in `templates/`.

## 5. The rename leaves nothing dangling

Status: completed

Found by group 3. The package scoped `SKILL.md` as unchanged, which was wrong:
it names the field twice, and `close.md` gates the fold on it. A skill that
tells an agent to read a field its own template does not define is the drift
this repository's validation exists to catch, and no invariant catches this one.

- [x] `skill/SKILL.md`: the sentence saying what `CHANGEKIT.md` sets names
      `normative:` rather than whether the project has specs.
- [x] `skill/SKILL.md`: direct work updates the normative document the change
      alters, rather than "the spec, where this project has specs".
- [x] `skill/references/close.md`: the delta folds where the change altered a
      normative document, not "where the project has specs".

Validation:

- `npm run check` passes, with `SKILL.md` under 3600 and `close.md` under 3600.
- `grep -rn 'has specs' skill/` returns nothing.

## 6. It is 1.0.0, and the ceiling is set on purpose

Status: completed. The last item, `CHANGEKIT.md` and the reinstall, is the
driver's: a dispatched agent may write neither.

- [x] `scripts/check.mjs`: confirm `TOTAL_MAX` at 34000 against the finished
      size, and name the margin in the comment rather than leaving it implied.
- [x] `package.json`, the marker at the end of `skill/SKILL.md` and
      `CHANGEKIT.md`: 1.0.0.
- [x] `CHANGELOG.md`: what changed, and that updating costs a hand edit of any
      open package and of `specs:` in `CHANGEKIT.md`.
- [x] `node bin/install.mjs --force`, inside the archive commit, as the house
      rule requires.

Validation:

- `npm run check` passes with the loaded copy matching `skill/`.
- The version agrees with itself across `package.json`, `SKILL.md` and
  `CHANGELOG.md`.
- `changes/` holds no package written in the old shape except the archived ones.
