# Change provenance

## Context

Nothing in the git history points back to a change package. An archived
package holds the reasoning permanently in `proposal.md`, and the commit that
landed the work restates that reasoning in prose, twenty to forty lines of it,
without naming the package once. The messages are long because they are doing
the proposal's job, and the subject line buries the point under it. Reading
the history tells you what someone thought; it does not tell you which unit of
planned work produced the diff.

A change also records no version. Not the changekit version whose procedure
ran, which matters once the templates change shape, and not the release of the
project the work shipped in. An archive read a year later answers neither.
Commits the procedure makes carry the agent as co-author, which is the
harness's default rather than a decision changekit ever took.

Underneath all of it, `validate:` has three states and defines one. A check
that runs and fails stops the work, correctly. A check that is absent, or
cannot run, is undefined: `close.md` reads as mandatory, and `run.md` stops on
"validation fails" without distinguishing that from "there is none". This
repository has no validation command, so changekit governing itself stalls at
the first commit point until the state is defined.

## Goal

A commit made by this procedure says what is true now in its subject, says
what behaves differently in at most a short paragraph, and names its origin in
trailers rather than restating it in prose. The reasoning stays in the package,
which is archived and permanent, and the commit points at it.

Every change package records the changekit version that planned it and the
date it opened, and records at closure the project version the work shipped
in. Where the project exposes no version, the package says so rather than
guessing.

No commit this procedure makes carries an agent as co-author unless the project
asks for one in `CHANGEKIT.md`, because some organisations require that
disclosure and must be able to turn it on.

A missing or unrunnable validation command never blocks a commit, a group, or
a closure. It produces one line in the report saying which check did not run
and why. A validation that runs and fails still stops everything.

The fields of `CHANGEKIT.md` have one place that states them: what each field
accepts, what it defaults to, and what absent means. A project reads that
without opening the skill's internals.

## Scope

- `skill/references/commit.md`, `close.md`, `run.md`, `init.md`, `plan.md`
- `skill/templates/changekit.md`, `proposal.md`
- `CHANGEKIT.md` and `CHANGELOG.md` and `README.md` at the root
- `package.json`, and a new development-only validation script
- `.claude/skills/changekit/`, refreshed at closure by `bin/install.mjs`

Out of scope:

- **An install path that does not need node.** The skill is markdown, but every
  route to it is `npx`, so a Python or Rust project needs node to update files
  it could copy by hand. Real, and its own package.
- **Several validation commands per moment.** `commit.md` already asks for
  targeted tests mid-run and the full suite before closure, while `validate:`
  holds one line. That is configuration modelling, not provenance.
- **Specs for this repository.** The spec-delta routes in `plan.md`,
  `close.md` and `work.md` have never been executed anywhere: no repository has
  ever run with `specs:` set, so a third of the procedure is unexercised and
  the first to find out will be a user. Worth fixing, and it cannot happen
  here, because turning `specs:` on mid-package would owe this package a delta
  it was not planned with. Its own package, after closure, and it may conclude
  that `bin/install.mjs` alone does not justify the folder.

## Open decisions

- **Does `Changekit:` go on every commit, or only on commits that came from a
  package?** On every one it is the marker that separates a commit the
  procedure made from a commit made by hand, and it is greppable. On a
  two-line direct fix it is a line of noise against a two-line body. Taking
  it means accepting that noise; leaving it means direct work is
  indistinguishable from hand work in the history. Not blocking: groups 1 and
  2 do not depend on the answer.
- **Is running `bin/install.mjs` a write to a protected path?** Found at init.
  `protect:` here holds `.claude/skills/changekit/`, and the closure reinstall
  writes exactly that, through the installer rather than by hand. A future
  session could read the rule literally and refuse, which would break closure.
  Either `protect:` gains a sentence about writes made by a command the
  project owns, or this repository drops the field and keeps the house rule
  alone. Not blocking, and group 5 will test it for real.

Taken, not open: the shipped version comes from a new `version:` field
inferred at init, not from inference at closure. A permanent archive record
should not depend on what a later session happens to find.

## Success criteria

- A commit produced by any route has a subject of 72 characters or fewer and
  no agent co-author, and its body, where it has one, says what behaves
  differently rather than why it was decided.
- `git log --grep` finds every commit a package produced, by slug.
- This package's own `proposal.md` carries its changekit version and open
  date, and its shipped version after closure.
- A repository whose `validate:` is empty runs a package start to finish, and
  every report says plainly that no command ran.
- The legal values, defaults and absent behavior of every `CHANGEKIT.md` field
  are stated in one place, and that place agrees with what the references do.
- `node scripts/check.mjs` passes, and fails when any one of its invariants is
  broken on purpose.
- `diff -r skill/ .claude/skills/changekit/` is empty after the archive commit.
- A `CHANGEKIT.md` written for 0.5.0 stays valid with no hand edit.

## Outcome

<Written at closure.>
