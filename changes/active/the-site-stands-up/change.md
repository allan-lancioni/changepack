---
title: The site stands up
description: A Starlight site in this repository, bilingual and navigable, with
  the home written and every other page left as structure.
changepack: 1.0.0
opened: 2026-09-09
opened-by: Allan C Lancioni <allan@allanlancioni.com>
---

## Context

The procedure explains itself in three root files that serve three readers at
once. `README.md` is the npm page, the install guide and the reference.
`RATIONALE.md` is opinion. `CHANGEPACK.md` is a live configuration that a
newcomer reads as documentation because there is nowhere else to read.
Nothing shows a package from opening to archive, nothing shows what a single
route obliges, and `skill/` can never carry the explanation: it is held to
3600 characters a route and 34000 in total, and every character spent
explaining is a character a turn pays for on every run.

## Goal

A documentation site lives at `docs/`, builds from this repository, and serves
two languages under their own prefixes. Its home states what changepack is,
quotes the gate, gives the install command and routes a reader to the section
they need. Every other section exists as a navigable page with a title and
nothing written under it, so the shape can be reviewed before the words are.

The site describes `skill/` and is never held to. `normative:` continues to
name `skill/` alone, so no page here is a spec and no delta ever targets one.

## Changes

The files this adds, and the three at the root it amends:

```text
+ docs/
  + package.json                astro, @astrojs/starlight, sharp
  + astro.config.mjs            site, i18n, the sidebar
  + tsconfig.json
  + src/
    + content.config.ts         the starlight docs collection
    + content/docs/
      + en/index.mdx            the home
      + pt/index.mdx            the home
  + public/favicon.svg
~ .gitignore                    docs/node_modules, docs/dist, docs/.astro
~ .prettierignore               docs/dist, docs/.astro
~ .markdownlint-cli2.jsonc      the same two, and docs/node_modules
```

The eight sections, in sidebar order, and what each one is for. Only the home
is written by this package; the rest arrive as a title and an empty body:

| Section | Holds | Pages |
|---|---|---|
| Start | install, the first run, a package walked end to end, and the gate read as a refusal | 4 |
| The project file | the nine fields, what earns `normative:`, and the rest | 3 |
| Routes | one page per file in `skill/references/`, same name | 9 |
| The package | the three artifacts, their frontmatter, and the archive | 5 |
| Git | the three commit points, the message, reading a change back | 3 |
| Versions | what the numbers mean here, updating, the changelog | 3 |
| Rationale | marked as opinion. `RATIONALE.md` lands here later | 2 |
| Internals | the two directories and the invariants | 2 |

The home, in the order a reader meets it:

| Order | Section | Carries |
|---|---|---|
| 1 | Hero | the name, one line, and two buttons |
| 2 | The gate | the two sentences, quoted alone and nothing around them |
| 3 | Install | `npx changepack`, and the degit alternative under it |
| 4 | You say, it does | the routing table `README.md` already carries |
| 5 | Where to go | four cards: Start, Routes, The package, Rationale |
| 6 | What is not there | no dependency, no CLI, no state outside the repository |

The gate is section 2 rather than a line in the hero because it is the whole
argument and it is two sentences long. A tagline compresses it into something
agreeable, and agreeable is the opposite of what it does.

Starlight arrives unstyled by this package. The typography of the sibling site
is a later pass, and doing it now would mean designing against pages that are
still empty.

## Decided

**Both languages carry a prefix, and neither sits at the root.** `defaultLocale`
is English, `root` is unset, so `/en/` and `/pt/` are the only paths that serve
content. This follows the sibling site, where the rule exists so every page has
exactly one URL and no language is privileged by living at the root. The cost
is that the apex needs a redirect, which the deployment package writes.

**`docs/` carries its own `package.json`.** The published package declares its
dependencies at the root, and `npx changepack` installs them. Astro at the root
would be downloaded by every install, `files:` notwithstanding, because `files:`
trims the tarball and not the dependency tree. A second manifest costs one
directory to `cd` into.

**The home is `.mdx`, the rest is `.md`.** The card grid is a component and
needs MDX. Nothing else on the site does, and a page that is plain markdown can
be read in the repository without a build.

**The house rule naming `docs/` as a consumer of `skill/` is not written.**
That line would make changepack find the pages when a route changes, which is
the question this repository wants answered by observation rather than by
assumption. Writing it now settles the question by removing it. It is a one
line change and can be written the moment the observation says it is needed.

**The site answers at `allan-lancioni.github.io/changepack`.** The manifest
needed a `site` before the build could name a canonical URL, and the package
had left hosting open. GitHub Pages serves this repository under a project
path, so `base` is `/changepack` and every page gains that prefix: the two
homes are `/changepack/en/` and `/changepack/pt/`, and the success criterion
above reads `/en/` as the path under the base. The built tree is unaffected,
`docs/dist/en/` and `docs/dist/pt/` either way, and a later move to an apex
domain is two lines in `astro.config.mjs`.

## Scope

- `docs/`, in full: the manifest, the Astro and Starlight configuration, the
  content collection, the home in both languages, and a title-only page for
  every other section.
- `.gitignore`, `.prettierignore` and `.markdownlint-cli2.jsonc`, each gaining
  the paths a build directory produces.

Out of scope:

- **The content of the twenty one pages.** They arrive as structure here and
  are written in their own packages, section by section, because what goes in
  them is not settled.
- **Deployment.** A site nobody can reach is not the problem being solved this
  week, and publishing a shell of empty pages would be worse than not
  publishing. The hosting decision, GitHub Pages against Firebase, is left with
  the package that needs it.
- **The sixth invariant in `scripts/check.mjs`**, pairing a route with its
  page. It would fail on the day it lands, because the route pages here have no
  content to pair. It belongs with the section that writes them.
- **`RATIONALE.md` moving into the site**, and `README.md` shrinking to what
  the npm page needs. Both wait for the pages that would receive them.
- **Any theme override.** Starlight ships as it ships.

## Cost

- **Keeps working:** every root command. `npm run check` reads `git ls-files
  skill` and never sees `docs/`, so the context budget is unmoved. `npm run
  format` targets `**/*.mjs` and gains `docs/astro.config.mjs`, which is
  formatted like the other three. `npm run lint` gains the pages, wrapped at 80
  like the rest of the repository's prose.
- **A revert does not undo:** nothing. The change is one new directory and
  three ignore lines, and removing them leaves the repository as it was.

## Success criteria

- `cd docs && npm run build` produces a site with no warning about a sidebar
  entry that resolves to nothing.
- `/en/` and `/pt/` both serve a home, and `/` serves neither.
- The home carries all six sections in the order above, and the gate appears as
  two quoted sentences with nothing wrapped around them.
- The sidebar shows the eight sections in both languages, with the labels
  translated, and every entry in it opens a page.
- `npm run check`, `npm run lint` and `npm run format:check` all pass at the
  root, with the context budget unchanged from before this package.
- `normative:` in `CHANGEPACK.md` still reads `skill/`, and no file under
  `docs/` is named by it.

## Outcome

## Surprises
