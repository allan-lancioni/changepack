# Change provenance: design

## Approach

Everything but one file is prose in `skill/`. The three states of `validate:`
are a distinction added to `commit.md`, `close.md` and `run.md`, which today
conflate "failed" with "absent"; the commit shape and its trailers are a new
section in `commit.md`; the version stamp is a header in
`templates/proposal.md` written by `plan.md` at open and completed by
`close.md` at closure.

The one file that is not prose is `scripts/check.mjs`, this repository's own
validation. It sits outside `files:` so npm never ships it, and outside
`bin/`, which does ship. A git install fetches it and the installer ignores
it, since `bin/install.mjs` copies `skill/` alone. It checks four things:

1. `skill/` matches `.claude/skills/changekit/`, unless `changes/active/`
   holds a package that touches `skill/`, which is the one state where they
   are meant to differ.
2. The marker at the end of `SKILL.md`, the `version` in `package.json`, and
   the top heading of `CHANGELOG.md` are the same string.
3. Total characters under `skill/`, and characters in `SKILL.md`, against the
   figures the README states. That budget is the product here: `SKILL.md`
   loads on every turn, and nothing has been holding it.
4. Every `references/*.md` named in `SKILL.md` exists, and every
   `templates/*.md` named in `plan.md` exists.

Invariant 1 is what makes the copy layout safe rather than merely intended. It
is the reason the script is in this package and not left for later.

## Compatibility

A `CHANGEKIT.md` written for 0.5.0 stays valid with no hand edit, which is
what keeps this a minor. `version:` is new and optional; absent means the
closure records no shipped version. `commit:` gains a phrase, and a file that
does not carry it gets the default, which is no agent co-author. The three
states of `validate:` change what an absent value does, and absent was
previously undefined rather than defined otherwise.

A package opened under 0.5.0 has no version header in its `proposal.md`.
Closure fills what it can and leaves the rest blank rather than demanding the
file be edited by hand. This package is that case: it is being written now,
under 0.5.0, and group 4 retrofits its own header.

The commit shape applies from the session after the skill is reinstalled, like
any other procedure change. Commits already in the history are not rewritten.

## Rollback

Reinstall at the previous tag and the procedure is back:

    npx github:allan-lancioni/changekit#v0.5.0 --force

The configuration fields are additive, so a `CHANGEKIT.md` stamped 0.6.0 keeps
working under 0.5.0 once the version line is set back; `version:` and the
`commit:` phrase are read by nothing older and are inert rather than invalid.
`scripts/check.mjs` is removed with the `validate:` line that names it.

What does not roll back is commits already written in the new shape, and
that costs nothing: they are ordinary commits with two extra trailers.
