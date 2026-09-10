---
name: release
description: Cut a release of changepack. Reads what changed in the published tree since the last tag, proposes the number that evidence earns, and writes the single commit that stamps it across four files. Use when asked to release, to cut a version, to say what the next version would be, or to write a CHANGELOG entry. Not for ordinary work, which leaves the version alone.
---

# Release

The version is released, never bumped. `package.json` carries the number that
is published, so ordinary work never touches it and this is the only skill
that does.

Two routes. **Propose** reads and writes nothing. **Cut** writes one commit.
The number is the gate between them, and the number is the user's.

## Propose

Write nothing on this route. Not a draft file, not a stamp, nothing.

The last published version, and what changed in what actually ships:

```bash
git describe --tags --abbrev=0
git diff --stat <tag>..HEAD -- skill bin
```

`files:` in `package.json` is `skill` and `bin`, so that diff is the release.
Where it is empty there is nothing to release however many packages closed, and
saying so is the whole answer.

Never read this from `changes/archive/`. A package is archived when it closes,
which can be long after the release its work went out in, and direct work
produces no package at all. Both errors point the same way: the archive is not
the record of what ships.

The commits behind the diff, and where each one's reasoning lives:

```bash
git log --format='%h %s%n%(trailers:key=Change)' <tag>..HEAD -- skill bin
```

A commit carrying a `Change:` trailer names the package that produced it: read
that package's `Outcome`. A commit without one is direct work, and its subject
and its diff are the whole record. Expect both, and expect releases made
entirely of the second.

Then the number, read from the diff to `skill/` and never from the count of
commits or the presence of a package:

| What the diff does to the procedure | Number |
|---|---|
| nothing changed under `skill/` or `bin/` | no release is due |
| wording, ordering, or a fix that leaves every obligation standing | patch |
| a route obliges, stops or writes something it did not | minor |

`bin/` is published too and is read the same way: a copy that behaves as it did
is a patch, an installer that does something new is a minor.

Major has no rule. It means compatibility breaks, it is rare, and the user says
when. Never propose one.

Report the diff, the commits, the packages where there are any, the number and
what earns it, and a draft entry. Then stop.

## Cut

**Refuse where `changes/active/` holds a package.** A release while one is open
publishes a procedure that package is still being planned against, and the
first invariant already reads `skill/` differing from the loaded copy as
expected in that state. Say it and stop. There is nothing to weigh.

**Take the number from the user.** Never infer it, and never carry what Propose
said into a commit without it being confirmed.

Then one commit, in this order:

1. `CHANGELOG.md`, the entry at the top: `## <version>`, a body written from
   the commits and from the `Outcome` of any package they name, and one
   paragraph opening `Updating:` last. It says what updating costs, and says so
   plainly where that is more than `npx changepack --force`.
2. `package.json`: `version`, and `changepack.updating` carrying that same
   paragraph on one line. Write the paragraph once and derive the field from
   it. The fifth invariant compares the changelog paragraph, joined with
   single spaces, against the field.
3. The number into `skill/SKILL.md`'s marker and `CHANGEPACK.md`'s
   `changepack:`. With the heading from 1 and the version from 2, those are the
   four places the second invariant holds together.
4. `node bin/install.mjs --force`. Step 3 edited `skill/`, so without this the
   loaded copy differs with no package open to explain it, which is the first
   invariant failing.
5. `shipped: <version>` in the frontmatter of the packages this release carries,
   which are the ones the `Change:` trailers named and not the ones archived
   since the tag. This corrects what closure guessed, since closure fills that
   field from `package.json` and `package.json` here still holds the previous
   release. That line is the only thing in an archived package that may change.
6. `npm run check` and `npm run lint`, both passing before anything is
   committed.
7. One commit, carrying all of the above and nothing else.

**Stop at the commit.** Merging to `main` tags and publishes, and the registry
does not take it back. Say what the merge will do, and leave it to the user.

## Always

- Never invent the number.
- Never cut with a package open.
- Never change anything in an archived package but its `shipped:` line.
- Never push, never merge, never tag by hand.
