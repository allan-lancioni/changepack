# Change provenance: tasks

One group at a time. Check an item only after its validation passes.

Groups run in order. 1 defines the state that lets this repository commit at
all, and 2 builds the check every later group runs. Nothing here is parallel.

## 1. The three states of `validate:`

Status: not started

- [ ] `skill/references/commit.md`: separate a check that failed, which stops
      the run, from one that is absent or could not run, which reports a line
      and continues. The existing rule against presenting an unrun check as
      passed stays as it is.
- [ ] `skill/references/close.md`: step 7 stops reading as mandatory. A
      closure with no validation command still closes, and the report says so.
- [ ] `skill/references/run.md`: the stop condition covers a validation that
      failed, not one that does not exist.
- [ ] `skill/references/init.md`: the `validate` row admits "there is none" as
      an outcome rather than asking until it gets a command.
- [ ] `skill/templates/changekit.md`: the `validate:` line documents all three
      states, so a project reads them without opening the skill.

Validation:

- No route stops on an absent validation. Read the four files and follow each
  path that mentions validation to its end.
- This group has no command to run: `validate:` is empty here, which is the
  state being defined. The report says exactly that.

## 2. This repository's validation

Status: not started

- [ ] Write `scripts/check.mjs` with the four invariants from `design.md`,
      node only, no dependencies, outside `files:` and outside `bin/`.
- [ ] Invariant 1 exempts the case where `changes/active/` holds a package
      touching `skill/`, and says which package when it does.
- [ ] `package.json`: add `scripts.check`.
- [ ] `CHANGEKIT.md`: `validate:` becomes the command.

Validation:

- `node scripts/check.mjs` passes on the tree as it stands.
- It fails, one at a time, on: a stray edit in `.claude/skills/changekit/`, a
  marker that disagrees with `package.json`, a `SKILL.md` over its stated
  budget, a `references/` file named but missing. Each failure is reverted
  after it is observed.

## 3. The shape of the commit

Status: not started

- [ ] `skill/references/commit.md`: a section on the message. Subject of 72
      characters or fewer saying what is true now; body optional, short, and
      about what behaves differently; the reasoning stays in the package.
- [ ] Same file: trailers. `Change: <slug>` only where a package produced the
      commit, `Changekit: <version>` per the open decision once it is answered.
- [ ] Same file: no agent co-author by default, with `CHANGEKIT.md` carrying
      the exception for projects that must disclose.
- [ ] `skill/templates/changekit.md`: the `commit:` line carries the
      attribution phrase and says how to turn it on.

Validation:

- `node scripts/check.mjs`.
- This group's own commit satisfies the shape it just wrote, trailers
  included. If it cannot, the rule is wrong.

## 4. The version inside the change

Status: not started

- [ ] `skill/templates/proposal.md`: a header holding the changekit version
      and the open date, and the shipped version left blank until closure.
- [ ] `skill/references/plan.md`: stamp the version and date when the package
      is written.
- [ ] `skill/references/close.md`: fill the shipped version at closure, and
      leave it blank where the project exposes none.
- [ ] `skill/references/init.md`: infer `version:` from `package.json`,
      `pyproject.toml`, `Cargo.toml`, a `VERSION` file or a git tag, and
      accept that there is none.
- [ ] `skill/templates/changekit.md`: the `version:` field.
- [ ] `CHANGEKIT.md`: `version:` points at `package.json`.
- [ ] Retrofit this package's own `proposal.md` header, which was written
      under 0.5.0 without one. This is the compatibility case being lived.

Validation:

- `node scripts/check.mjs`.
- This package's `proposal.md` carries changekit 0.5.0 and its open date.

## 5. Cleanup and closure

Status: not started

- [ ] `CHANGELOG.md`: the 0.6.0 entry, each item ending with what updating
      costs, and the answer to the `Changekit:` trailer decision recorded.
- [ ] `README.md`: distinguish what this repository maintains from what a
      consumer installs, so `scripts/check.mjs` does not contradict "nothing
      to run". Say that commits name their package.
- [ ] `package.json` and the marker at the end of `skill/SKILL.md` go to
      0.6.0.
- [ ] `node bin/install.mjs --force`, refreshing the loaded copy.
- [ ] `CHANGEKIT.md`: stamp `changekit: 0.6.0`.
- [ ] Audit against `proposal.md`, write the Outcome, archive to
      `changes/archive/<date>-change-provenance/`.

Validation:

- `node scripts/check.mjs` passes, including invariant 1 now that the reinstall
  has run and no package is open.
- `diff -r skill/ .claude/skills/changekit/` is empty.
- The last group and the archive move land in one commit, per `work.md`.
