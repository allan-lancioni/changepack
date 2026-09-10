# changepack

This is the only repository where changepack is both the thing maintained and
the thing running. `skill/` is the source and the object of maintenance.
`.claude/skills/changepack/` is the copy Claude Code loads, committed so that a
fresh clone runs the procedure with nothing to install.

`CHANGEPACK.md` configures the procedure and states no rules. The rules are
here, and a change that alters one carries a spec delta like any other
normative document.

## The version is released, never bumped

A push to `main` tags and publishes whatever number `package.json` carries, so
that number is the release itself and not a record of one. Ordinary work leaves
it alone, and leaves the `CHANGELOG.md` entry alone with it.

Releasing is a decision. When it is made, one commit writes the entry and
stamps the number into `package.json`, `skill/SKILL.md`, `CHANGEPACK.md` and
the entry's own heading, which is the agreement `npm run check` enforces across
all four.

## The loaded copy is refreshed at closure, and at a release

The copy is refreshed with `node bin/install.mjs --force` at closure, inside
the archive commit, and never earlier in the package that writes it. So a
package that edits `skill/` runs under the version loaded when the session
opened, not under the one it is writing, and the procedure it lands applies
from the next session. That is what an update already does for every other
project.

A release is the second moment, by the same rule and not as an exception to
it. Stamping the marker edits `skill/SKILL.md`, so the release commit carries
the reinstall or it leaves the two directories differing with no package open
to explain them, which is the first invariant failing.

The two directories differ on purpose while such a package is open. They differ
by mistake at any other time, which is why the reinstall is destructive: it
overwrites without merging, and an edit made in the copy is lost rather than
merged.

## No dashes in prose

Not the em dash, not the en dash, not a hyphen standing in for one. A comma, a
colon, a full stop or a new sentence says it. This was the practice before it
was written down, which is how five of them got in.
