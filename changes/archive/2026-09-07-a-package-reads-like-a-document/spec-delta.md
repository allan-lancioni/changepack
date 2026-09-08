# A package reads like a document: spec delta

Normative behavior this change makes true. It lives here until closure, never
in the document it lands in.

## `skill/templates/change.md`

- `+` **Metadata is frontmatter** — title, description, changekit version,
  opened date, who opened it, the issue, and what it shipped in. A key with no
  value is omitted.
- `~` **The section order** — `Context`, `Goal`, `Changes`, then the rest. The
  file answers what the change is before why it exists.
- `~` **Context and Goal carry their length** — one paragraph, and the contract
  and no more. Neither is left to grow with the change.
- `+` **A drawing is introduced** — a line above each says what it shows.
  Written last, read first.
- `~` **Open decisions are tabular** — alternative and cost in a table, the
  recommendation in prose.

## `skill/templates/tasks.md`

- `+` **Execution order is frontmatter** — `order:` as a list, a nested list
  running in parallel, and `blocked:` naming the groups that are.

## `skill/templates/spec-delta.md`

- `+` **The documents are frontmatter** — `documents:`, so an archived package
  says what it touched without being opened.

## `skill/references/plan.md`

- `+` **`opened-by` is the signing identity** — `git config user.name` and
  `user.email` resolved in the package's own repository, local before global.
  It equals the author of the opening commit.
- `+` **More than two blocking gates is said out loud** — the package is not
  refused, and settling them first is offered.

## `skill/references/init.md`

- `+` **What earns a place under `normative:`** — something is held to the
  document, and it has named units that can be named before and found after. A
  generated file has neither, and a README fails the first.

## `skill/references/close.md`

- `~` **`shipped:` is filled in the frontmatter** — and a package written
  without one is filled where it can be.
