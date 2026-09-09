# Changelog

What changes for a repository that already installed the skill. Ask changepack
to update itself, or run the command yourself:

```bash
npx changepack --force
```

Every entry ends with what updating costs you. Where that is more than the
command above, it says so. Your `CHANGEPACK.md` is never replaced: an update
stamps the version into it and leaves the rest alone.

The numbers are read against the procedure, not against an API. **Major**: your
`CHANGEPACK.md` or an open package has to be edited by hand. **Minor**: a new
route or capability, and the configuration you have stays valid. **Patch**:
wording and fixes that leave the resulting procedure the same.

## 1.0.1

Three rules the procedure already stated, and did not hold to.

**The archive move is always its own commit.** `commit.md` said the three
moments each commit alone, and `close.md` folded the closure into the last task
group, which put a directory rename inside a commit about behavior and left the
package with no visible end. The opening and the closure bracket it again.

**The type says what the commit did to the product.** The opening and archive
commits move nothing, so they take whatever the convention reserves for that.
Everywhere else, what shipped wrong is corrected rather than added, and what
broke on the way here is the feature still landing. The names stay the
project's: this skill sets no types.

**A report leaves out what it has nothing to say about.** `close.md` said a
silent version check leaves no trace, the report list asked for every command
that ran, and the silence got written down anyway. No risk and a clean tree
were being reported the same way. An absent line is silence, never "none".

Updating: nothing. Your commits change shape from the session after you
update.

## 1.0.0

A package is one change, one delta and the tasks, and the change draws what it
moves.

`proposal.md` and `design.md` become `change.md`. They were approved together,
amended together at every stop and archived together; the seam between them was
inherited from tools where each file is a separate approval gate, and this
procedure presents the package as a whole. `tasks.md` is untouched.

**A change draws what it moves.** `change.md` carries a `Changes` section that
requires a drawing: a tree for files and modules, a table for collections,
fields and states, a sequence for order in time, a flow for services and
routing. The tree and the table are the default because they read in a
terminal, on a forge and in an editor with nothing installed. The prose that
follows carries only what the drawing cannot.

**`Compatibility` and `Rollback` become two lines of `Cost`**, each written
only when it has something to say. A rollback line is written only where the
revert is not the inverse of the drawing.

**A settled decision has somewhere to go.** `Decided` sits directly above
`Open decisions`, and an answered gate moves between them rather than being
deleted.

**`Surprises`** records a group whose diff did not match the drawing. Silence
is the ordinary outcome, and an empty section is deleted at closure.

**A delta is earned by what the change edits**, not by whether the project has
specs. `normative:` replaces `specs:` and defaults to what can be discovered
without configuration: `CLAUDE.md`, `AGENTS.md` and `.claude/`. The condition
is whether this change alters something a later change will be held to.

**The brief a dispatched agent receives now inlines `change.md`**, so it
arrives with the drawing. It previously received the proposal alone.

**A package's metadata is frontmatter.** `change.md`, `tasks.md` and
`spec-delta.md` open with a block a machine can read instead of a header
formatted as prose: the title, a one-line description, the changepack version,
the date, who opened it, the issue it came from and what it shipped in. A key
with no value is omitted, so `issue:` and `shipped:` are written when they have
something to say. `tasks.md` states its groups and their execution order there,
and `spec-delta.md` the documents it edits, so an archived package says what it
touched without being opened. Closure fills `shipped:` in the frontmatter, or
in the prose header of a package written before it.

**`change.md` reads like a document.** One paragraph of Context saying why now,
a Goal that is the contract and nothing more, then the drawing. The description
carries what the change is, so nothing below repeats it. Every drawing is
introduced by a line saying what it shows, so it is read rather than decoded.
Alternatives and their costs are a table, and the recommendation stays prose
beneath it.

**More than two blocking gates is said out loud.** One open decision is
ordinary and two is a fork; past that the shape of the work is not settled and
the package is carrying a conversation instead of recording one. Planning says
so with the count before it writes, and offers to settle them first. The
package is not refused.

**A generated file is not normative.** A document earns `normative:` when
something is held to it and it has named units you can name before and find
after. A generated `README.md` has neither, and the rule now sits in `init.md`,
where the field is filled, rather than in a document the init route never
loads.

**The installer replaces the skill directory rather than copying over it.** A
file removed from a release used to survive in every installation, because
`--force` overwrote what it found and deleted nothing. This is the first
release that removes files, and it is the release that found it.

**The update check is one command.** Closing a package runs `check-update.mjs`
and reads what it prints, instead of resolving a tag and comparing two version
strings in prose. Silence means nothing is newer, which is the ordinary
outcome. The script ships inside the skill directory, and it is the only place
that states how the comparison is made, what `off` and `hold` do, and where the
answer is read from.

**A tag is a consequence of merging.** A push to `main` tags the version in
`package.json` where no tag carries it. 0.6.0, 0.7.0 and 1.0.0 shipped untagged
because tagging depended on somebody remembering, and the check has therefore
reported nothing since 0.6.0.

**The context budget counts markdown alone**, because markdown alone is what a
turn loads.

**It ships as changepack.** The skill directory, the file you own, the command,
the frontmatter key, the marker and the commit trailer all read `changepack`.
`changekit` on npm belongs to an unrelated package last published in 2022, and
a name that cannot carry the package is not a name to keep. The repository is
`allan-lancioni/changepack`, and GitHub redirects the old path, so existing
clones keep resolving.

**The registry is the channel.** `npx changepack` installs the skill, with no
owner and no repository to know first, and `npx changepack@<version> --force`
installs a stated version. A push to `main` publishes as well as tagging, which
is why the workflow that tagged is now the one that releases: tagging is
idempotent and publishing is not.

**The check reads the registry too.** `check-update.mjs` makes one request, to
`registry.npmjs.org/changepack`, and that document answers the whole question:
the latest version, and what every release between yours and it costs. The cost
line travels with the package, as `changepack.updating` in each published
manifest, because `CHANGELOG.md` is deliberately not in the tarball npm ships.

Updating: `npx changepack --force`, then by hand. Rename `CHANGEKIT.md` to
`CHANGEPACK.md` and its `changekit:` field to `changepack:`, rename the `specs:`
field in it to `normative:` and give it the documents a change is held to, or
`none`, and delete `.claude/skills/changekit/`. An open package: rename
`proposal.md` to `change.md`, merge `design.md` into it under `Changes` and
`Cost`, and delete `design.md`. The installer neither renames the file nor
deletes the old skill directory: it writes the directory it owns and never the
file you own, so a repository that installed changekit carries two skill
directories until you remove one. Nothing else. Archived packages are history
and are not migrated. The check costs you nothing beyond this, because the
script arrives with the skill directory on this install.

## 0.7.0

The spec delta is grouped by the spec it lands in.

`Added`, `Changed` and `Removed` sorted a delta by what kind of edit each rule
was, which is not how one is applied: folding a delta at closure means opening
one spec and making every change it asks for. The delta now carries a heading
per spec path, and each rule under it is marked `+` added, `~` changed, `-`
removed, so a path is written once instead of once per rule.

Closure also says what becomes of the delta. It stays in the package, as the
record of what became normative, and a rule that landed differently from how
it was declared says so on its own line.

Updating: nothing. A delta already written in the old shape folds the same way;
rewrite it only if you want to.

## 0.6.0

Commits name the package that produced them, and stop restating it.

The message has a shape. A subject of 72 characters or fewer saying what is
true now, and a body that is optional and never longer than 300, carrying what
behaves differently and never the reasoning. The reasoning is the package's,
and the package is archived. Two trailers point at it:

```text
Change: <slug>
Changekit: <the version that governed the run>
```

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
