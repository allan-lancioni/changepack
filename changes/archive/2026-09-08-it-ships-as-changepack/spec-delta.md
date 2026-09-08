---
title: It ships as changepack
documents:
  - skill/SKILL.md
  - skill/references/init.md
  - skill/references/update.md
  - skill/check-update.mjs
  - skill/templates/changepack.md
---

Normative behavior this change makes true. It lives here until closure, never
in the document it lands in.

## `skill/SKILL.md`

- `~` **The skill's name**: `changepack`, in the frontmatter and in the command
  a user types. Nothing answers to `changekit`, and no alias is kept.
- `~` **The project file**: every route reads `CHANGEPACK.md` at the repository
  root. `CHANGEKIT.md` is not read, and its absence routes to `init.md` exactly
  as an absent file always did.
- `~` **The version marker**: the comment closing the file reads
  `<!-- changepack <version> -->`, and it stays the single source the routes
  stamp from.

## `skill/references/init.md`

- `~` **What the first run writes**: `CHANGEPACK.md`, copied from
  `templates/changepack.md`.
- `~` **The version field**: `changepack`, stamped from the marker.

## `skill/references/update.md`

- `~` **How an update installs**: `npx changepack@<version> --force`, at the
  version the check reported. The install is pinned to a version on the
  registry rather than to a git ref, so what was compared is what lands
  without a tag being involved.
- `~` **What the check is run as**:
  `node .claude/skills/changepack/check-update.mjs`.
- `~` **What closure stamps**: `changepack: <new version>` in `CHANGEPACK.md`.
- `-` **The ref**: the route no longer carries a ref between the check and the
  install, because the registry names versions and not commits. Nothing
  replaces it.

## `skill/check-update.mjs`

- `~` **Where the version comes from**: one `GET` to
  `https://registry.npmjs.org/changepack`. `dist-tags.latest` is the latest
  version, and the document also carries every published version's manifest.
- `~` **Where the cost comes from**: the `changepack.updating` field of each
  published version between the installed one and the latest. The changelog is
  not fetched, and no second host is contacted.
- `~` **What it reads locally**: `CHANGEPACK.md`, and its `changepack:` field.
- `-` **git**: the script runs no subprocess. `updates: off`, `hold <version>`,
  version ordering and silence on every failure are unchanged.
- `+` **A version with no cost published**: reported as
  `Updating: not stated.` The check reports rather than failing, which is what
  it already does for every other absence.

## `skill/templates/changepack.md`

- `~` **The version field**: `- **changepack:** <version>`. A project carrying
  the old field name is not read and not migrated; the changelog says so.
