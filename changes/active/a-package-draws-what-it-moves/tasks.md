# A package draws what it moves: tasks

One group at a time. Check an item only after its validation passes.

Group 1 comes first: every group after it grows `skill/` before the merge gives
space back. Group 2 comes next, because 3 and 4 both edit files it rewrites.
Groups 3 and 4 need only 2 and may run beside each other. Group 5 needs all of
them, and answers the open decision before it sets a number.

## 1. There is room to land this

Status: not started

- [ ] `scripts/check.mjs`: raise `TOTAL_MAX` to 34000, with a comment naming
      group 5 of this package as what sets the real number.

Validation:

- `npm run check` passes and its note reports the new ceiling.

## 2. A package is one change, one delta and the tasks

Status: not started

- [ ] `skill/templates/change.md`: the merged template. `Context`, `Goal`,
      `Decided`, `Open decisions`, `Scope`, `Changes`, `Cost`,
      `Success criteria`, `Outcome`, `Surprises`, and the 0.6.0 header.
- [ ] `Changes` names the four notations, the tree and the table as the
      default, and says to draw and not to restate the drawing.
- [ ] `Cost` carries two lines, each deleted when it has nothing to say.
- [ ] Delete `skill/templates/proposal.md` and `skill/templates/design.md`.
- [ ] `skill/references/plan.md`: the file table names `change.md`,
      `tasks.md` and `spec-delta.md`; the stamping line names `change.md`;
      the paragraph about where intended behavior goes without specs follows.

Validation:

- `npm run check` passes, which proves `plan.md` names no template that is gone.
- `grep -rn 'proposal\.md\|design\.md' skill/` returns nothing.

## 3. The delta is asked for by what the change edits

Status: not started

- [ ] `skill/templates/spec-delta.md`: what earns a delta is that a later
      change is held to the document, not that the project has behaviour specs.
      The heading-per-document and the `+ ~ -` markers stay as 0.7.0 left them.
- [ ] `skill/templates/changekit.md`: `specs:` becomes `normative:`, with the
      discovered default written out and behaviour specs as the part a project
      adds.
- [ ] `skill/references/init.md`: the inference table row, discovering
      `CLAUDE.md`, `AGENTS.md` and `.claude/` and asking only about specs.
- [ ] `skill/references/plan.md`: the delta's row states the same condition.
- [ ] `README.md`: the sentence describing what a package carries.

Validation:

- `npm run check` passes.
- A `CHANGEKIT.md` written from the template names `normative:` and no
  `specs:`, and reading `init.md` alone is enough to fill it.

## 4. Every route reads the new package

Status: not started

- [ ] `skill/references/run.md`: the brief inlines `CHANGEKIT.md`, `change.md`
      and `tasks.md`, so the agent implementing a group receives the drawing.
- [ ] `skill/references/work.md`: reads `change.md`, `tasks.md`, and the delta
      where it exists.
- [ ] `skill/references/close.md`: the outcome goes in `change.md`; `Surprises`
      is written per group whose diff did not match the drawing, and silence is
      the ordinary outcome.
- [ ] `skill/references/run.md`: after a group returns, the diff is read
      against the drawing, and only a mismatch is written down.

Validation:

- `npm run check` passes.
- `grep -rn 'proposal' skill/` returns nothing.
- Each of `plan.md`, `run.md`, `work.md`, `close.md` names `change.md` and none
  names a file that is not in `templates/`.

## 5. It is 1.0.0, and the ceiling is set on purpose

Status: not started, and blocked on the open decision about the ceiling.

- [ ] Answer the open decision, and record it under `Decided`.
- [ ] `scripts/check.mjs`: set `TOTAL_MAX` to the answer, with the margin
      named in the comment rather than implied.
- [ ] `package.json`, the marker at the end of `skill/SKILL.md` and
      `CHANGEKIT.md`: 1.0.0.
- [ ] `CHANGELOG.md`: what changed, and that updating costs a hand edit of any
      open package and of `specs:` in `CHANGEKIT.md`.
- [ ] `node bin/install.mjs --force`, inside the archive commit, as the house
      rule requires.

Validation:

- `npm run check` passes with the loaded copy matching `skill/`.
- The version agrees with itself across `package.json`, `SKILL.md` and
  `CHANGELOG.md`.
- `changes/` holds no package written in the old shape except the archived ones.
