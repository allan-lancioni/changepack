---
title: A new version announces itself
documents:
  - skill/references/close.md
  - skill/references/update.md
---

Normative behavior this change makes true. It lives here until closure, never
in the document it lands in.

## `skill/references/close.md`

- `~` **The update check is one command** — closure runs
  `check-update.mjs` and reads its output. The route no longer describes
  resolving a tag, comparing versions, or honouring `hold`; the script does,
  and it is the only place that states how.
- `~` **Silence still means nothing to report** — unchanged in meaning, and now
  produced by a command exiting 0 with no output rather than by a rule the
  reader applies.

## `skill/references/update.md`

- `~` **The entries are printed, not composed** — the route presents what the
  check printed and names the ones asking for a hand edit. It no longer
  fetches the changelog or resolves the ref to install.
- `~` **The install ref comes from the check** — the tag the check reported is
  the tag installed, so what was compared and what lands are the same thing.
