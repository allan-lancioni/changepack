# Init

Write `CHANGEKIT.md`, then stop. Do not plan or implement in the same
turn, even if the user asked for both.

## Infer, do not interrogate

Inspect the repository and propose a value for every field. Ask only about
what you could not find.

| Field | Where to look |
|---|---|
| changes | a directory of change packages, proposals or RFCs |
| normative | `CLAUDE.md`, `AGENTS.md`, `.claude/`, found by looking. Ask only where the behavior specs are, if anywhere |
| language | English, unless the README and the documents are not: then ask |
| version | `package.json`, `pyproject.toml`, `Cargo.toml`, a `VERSION` file, the latest tag |
| validate | a test script in `package.json`, `Makefile`, `pyproject.toml`, a CI workflow; else ask, and take none for an answer |
| commit | `git log --oneline -20` |
| protect | real user data, secrets, generated output, a sibling checkout |
| updates | nothing to look for; keep the default |
| house rules | `CLAUDE.md`, `CONTRIBUTING.md`, the normative documents themselves. Delete the section where there is nothing |

Where a field is not found, the `Absent means` column below is the value.

A path may point outside this repository. `../process/changes` is a valid
changes path and needs no special handling.

## The fields

The contract every route reads back, and the only place that states it.

| Field | Accepts | Absent means |
|---|---|---|
| `changekit` | the version this project runs | stamp it from the marker |
| `changes` | a path, in this repository or outside it | `changes/` |
| `normative` | the documents a later change is held to, or none | `CLAUDE.md`, `AGENTS.md`, `.claude/` |
| `language` | what gets written into the repository | English |
| `version` | where this project's own version lives | none, and a package records no shipped version |
| `validate` | one command, or none | no command: the routes report it and continue |
| `commit` | the convention, `ask first`, and `co-author` where the project must disclose | conventional, without asking, and no agent co-author |
| `protect` | paths nothing may write | nothing is protected |
| `updates` | `ask at closure`, `hold <version>`, `off` | `ask at closure` |

A document earns `normative:` when something is held to it and it has named
units you can name before and find after. A generated file has neither, and a
README fails the first test.

A project with no validation command is ordinary, not incomplete.

## Write

Copy `templates/changekit.md` to `CHANGEKIT.md`, at the repository root, in
the language you settled on. The field keys stay English: they are what this
skill reads back. Stamp the version from the marker at the end of `SKILL.md`,
say where each value came from, and mark the ones you guessed.

Create the changes directory, with a `.gitkeep`, since git does not track an
empty one.

Present both and wait for approval of the values, since that file is the one
the project owns. Then commit them alone, touching nothing else.

## Say what happens next

Say in one line that planning, implementing, reviewing and closing all run
through `/changekit`, and that `CHANGEKIT.md` is the only file the project
owns: the skill directory is replaced wholesale on update.

If the same message asked for something else, name it and say it runs next,
once the configuration is approved. Do not do it now, and do not make the
user type it again.
