# Init

Write `CHANGEKIT.md`, then stop. Do not plan or implement in the same
turn, even if the user asked for both.

## Infer, do not interrogate

Inspect the repository and propose a value for every field. Ask only about
what you could not find.

| Field | Where to look | Fallback |
|---|---|---|
| changes | An existing directory of change packages, proposals or RFCs | `changes/` |
| specs | A directory of normative behavior documents: `specs/`, `docs/specs/`, `.kiro/specs/` | none |
| language | English, unless the README and the documents are not: then ask | English |
| validate | Test script in `package.json`, `Makefile`, `pyproject.toml`, CI workflow | ask |
| commit | `git log --oneline -20` | conventional |
| protect | Real user data, secrets, generated output, a sibling checkout | none |
| updates | Nothing to look for. Keep the default | ask at closure |
| house rules | `CLAUDE.md`, `CONTRIBUTING.md`, the specs themselves | delete the section |

A path may point outside this repository. `../process/changes` is a valid
changes path and needs no special handling.

## Write

Copy `templates/changekit.md` to `CHANGEKIT.md`, at the root of the
repository, and write it in the language you settled on, keeping the field
keys in English: they are what this skill reads back. Say where each value
came from, and mark the ones you guessed. Stamp the version from the marker
at the end of `SKILL.md`.

Create the changes directory, with a `.gitkeep`, since git does not track an
empty one.

Present both and wait for approval of the values, since that file is the one
the project owns. Then commit them alone, touching nothing else.

## Say what happens next

State in one line that planning, implementing, reviewing and closing all run
through `/changekit`, and that the file you just wrote is the only one the
project owns: everything else under `.claude/skills/changekit/` is replaced
wholesale on update.

If the same message asked for something else, name it and say it runs next,
once the configuration is approved. Do not do it now, and do not make the
user type it again.
