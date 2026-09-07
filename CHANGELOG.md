# Changelog

What changes for a repository that already installed the skill. Ask changekit
to update itself, or run the command yourself:

```bash
npx github:allan-lancioni/changekit --force
```

Every entry ends with what updating costs you. Where that is more than the
command above, it says so. Your `CHANGEKIT.md` is never replaced: an update
stamps the version into it and leaves the rest alone.

The numbers are read against the procedure, not against an API. **Major**: your
`CHANGEKIT.md` or an open package has to be edited by hand. **Minor**: a new
route or capability, and the configuration you have stays valid. **Patch**:
wording and fixes that leave the resulting procedure the same.

## 0.6.0

Commits name the package that produced them, and stop restating it.

The message has a shape. A subject of 72 characters or fewer saying what is
true now, and a body that is optional and never longer than 300, carrying what
behaves differently and never the reasoning. The reasoning is the package's,
and the package is archived. Two trailers point at it:

    Change: <slug>
    Changekit: <the version that governed the run>

Both or neither, on the three moments a package commits, so
`git log --grep='Change: <slug>'` returns a whole change in order from the
opening to the archive. A closure report now ends with exactly that query.
Direct work carries no trailers and stays indistinguishable from a commit made
by hand, which is the cost of keeping short messages short.

**No agent is credited as co-author.** A project that has to disclose machine
assistance writes `co-author` in `commit:`, and only then is the trailer added.

**A change records its versions.** `proposal.md` carries the changekit version
that planned it and the date it opened, and at closure the release its work
shipped in. A new field, `version:`, says where that number lives.

**An absent validation reports instead of stopping.** `validate:` had three
states and defined one. A check that runs and fails still stops everything; one
that is absent or could not run costs a line in the report and the run goes on.
A repository with no validation command is ordinary, not incomplete.

**The fields have a contract.** `init.md` states all nine: what each one
accepts, and what it means when it is absent.

Updating: nothing. Every new field is optional and every default is what you
already have. Your commits change shape from the session after you update, and
packages opened under 0.5.0 close without a version header rather than asking
to be edited by hand.

## 0.5.0

The skill checks for a newer version when a package closes, and updates itself
when you say so.

The check runs after the archive commit, never while a package is open, and is
silent unless there is something to say. Updating reads the changelog between
your version and the latest, says what each entry costs, then installs at that
tag and commits the skill directory and `CHANGEKIT.md` alone.

**Configuration.** A new field, `updates:`, defaulting to `ask at closure`.
Declining records `hold <version>`, so the same version never asks twice and
the next one asks once. `off` stops the check, and the network call with it.

Updating: nothing. The field is optional, and its default is what you have.

## 0.4.2

`language:` governs what gets written into the repository. What the skill says
to you follows the language of your message instead, so the two often differ.
The field defaults to English, and the first run asks where the repository is
documented in another language.

Updating: nothing. `English` stays valid, and no key changed.

## 0.4.1

The first run configures instead of stopping in front of the route, and
carries your original request forward instead of costing it. The installer
ends with the line to paste, and says how to install Claude Code where it is
missing.

Updating: nothing. No configuration field changed.

## 0.4.0

Opening a package is confirmed with AskUserQuestion, a run asks how far to go,
and the three commit points land without asking. A new field, `commit:`, takes
"ask first" where a project wants to be asked every time.

This number shipped twice, six minutes apart, on 19 August 2026. A repository
reporting 0.4.0 with the skill at `skills/changekit/` holds the reverted
eval-suite build: reinstall rather than update.

Updating: nothing, unless you want to be asked before each commit.

## 0.3.0

The `run.md` route: one conversation drives a whole package, dispatching a
fresh agent per group and revalidating each one itself.

Updating: nothing.

## 0.2.0

`.claude/changekit.md` becomes `CHANGEKIT.md`, at the repository root, and
starts recording the version it was written for.

Updating: `git mv .claude/changekit.md CHANGEKIT.md`.

## 0.1.0

The procedure, and `npx github:allan-lancioni/changekit` to copy it in.

Updating: nothing to update from.
