# Change provenance: tasks

One group at a time. Check an item only after its validation passes.

Groups run in order. 1 defines the state that lets this repository commit at
all, and 2 builds the check every later group runs. Nothing here is parallel.

## 1. The three states of `validate:`

Status: completed

- [x] `skill/references/commit.md`: separate a check that failed, which stops
      the run, from one that is absent or could not run, which reports a line
      and continues. The existing rule against presenting an unrun check as
      passed stays as it is.
- [x] `skill/references/close.md`: step 7 stops reading as mandatory. A
      closure with no validation command still closes, and the report says so.
- [x] `skill/references/run.md`: the stop condition covers a validation that
      failed, not one that does not exist.
- [x] `skill/references/init.md`: the `validate` row admits "there is none" as
      an outcome rather than asking until it gets a command.
- [x] `skill/templates/changekit.md`: the `validate:` line documents all three
      states, so a project reads them without opening the skill.
- [x] One place states every `CHANGEKIT.md` field: what it accepts, its
      default, and what absent means. Today that contract is split between the
      template's inline comments and the inference table in `init.md`, and
      this package changes three fields at once. Whether it lands as a section
      of `skill/templates/changekit.md` or as `skill/references/config.md` is
      settled while writing it, against the context budget.

Validation:

- No route stops on an absent validation. Read the four files and follow each
  path that mentions validation to its end.
- The contract names every field that exists today, and each stated default
  matches what the references do when the field is absent. Groups 3 and 4
  extend it, with the attribution phrase and with `version:`.
- This group has no command to run: `validate:` is empty here, which is the
  state being defined. The report says exactly that.

## 2. This repository's validation

Status: not started

- [ ] Write `scripts/check.mjs` with the four invariants from `design.md`,
      node only, no dependencies, outside `files:` and outside `bin/`.
- [ ] Invariant 1 exempts the case where `changes/active/` holds a package
      touching `skill/`, and says which package when it does. It also ignores
      what `.gitignore` ignores: group 1 tripped over a `.DS_Store` that only
      exists on one side.
- [ ] Invariant 3 asserts a ceiling the script owns, not the figure the README
      happens to state. Group 1 took the total from 24.2k to 25.9k, so a check
      written against the README's prose would fail on arrival and stay
      hostage to group 5. The README quotes the ceiling; the script holds it.
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
- [ ] `skill/references/init.md`: the field contract's `commit` row gains the
      attribution, so the one place stays the one place.

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
- [ ] `skill/references/init.md`: `version:` joins the field contract and the
      inference table.
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
