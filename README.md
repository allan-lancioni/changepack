# changepack

A change package is a small folder that holds one unit of planned work:
the problem, the intended behavior, and the tasks that get you there. It
opens when the work starts and it is archived when the work is done.

changepack is the procedure for running them, written as a Claude Code skill.
The part that matters is not the folder. It is the gate in front of it:

> Never open a change package because the work touches behavior.
> Open one because a single pass cannot land it.

Most spec driven tooling has one path, the long one, and charges you a
planning ritual for a two line fix. This one classifies first and says
"just do it" out loud, which is the answer most of the time.

## Install

Copy it into the repository it will govern:

```bash
npx changepack
```

Then open Claude Code in that repository and run `/changepack`. It reads the
repo, proposes a configuration, and writes one file. That is the whole setup.

The skill is committed with your project, so everyone who clones it gets the
same process, with nothing to install.

## Using it

Everything runs through `/changepack`, in plain language:

| You say | It does |
|---|---|
| "plan the multi tenant migration" | Classifies. If it is too big for one pass, asks before opening the package, writes it, commits it, and stops |
| "start task 2" | Summarises what is left, asks how far to run, then implements and checks items as they validate |
| "run the whole change" | Dispatches a fresh agent per group, validates each one itself, commits group by group |
| "review this" | Reads and reports, ordered by impact, and changes nothing |
| "close it" | Audits the criteria against real behavior, archives with a date |
| "update changepack" | Reads what each release between your version and the latest costs, says so, then replaces the skill |
| "rename this variable" | Tells you it does not need a package, and does it |

Every commit it makes names the package that produced it, in trailers rather
than in prose, so `git log --grep='Change: <slug>'` returns a whole change in
order. The subject says what is true now, the body stays under 300 characters,
and the reasoning lives in the package, which is archived. No agent is
credited as co-author unless your configuration asks for one.

It stops on its own when a decision needs you: schema, persistence,
compatibility, observable behavior. Everything else runs without a checkpoint.
It commits at three moments, the package when it opens, each group as it lands,
and the archive move at closure, and reports what it did instead of asking
whether it may.

There are two questions it always asks, both as one prompt with the options in
front of you: whether to open a package at all, and, once one is open, whether
to stop after each group or run to the end.

## The one file you own

`CHANGEPACK.md`, at the root of your repository, holds where the packages
live, which documents a change is held to, the language for written artifacts,
the validation command, whether commits land on their own, and the paths
nothing may write. It is yours, it sits
outside the skill directory, and updates never touch it. It reads as plain
documentation, so a new colleague learns the process from it without
installing anything.

Everything under `.claude/skills/changepack/` is replaceable. Nothing of yours
belongs in there, which is what makes updating safe:

```bash
npx changepack --force
```

You rarely have to remember that. When a package closes, and only then, the
skill compares itself against the latest release and offers to update. It asks
about a version once: decline it and it is recorded as a hold, so the question
comes back only when something newer ships. `updates: off` in your config stops
the check, and the network call with it. Nothing is checked while a package is
open, because a package planned under one procedure keeps it until it closes.

## Specs are optional

A package carries a `spec-delta.md` when the change alters something a later
change is held to: a behavior spec, `CLAUDE.md`, `AGENTS.md`, anything under
`.claude/`. It names each rule added, changed or removed, and folds into the
document at closure.

If your repository keeps no normative documents at all, nothing is missing.
The intended behavior is written in the package and read from there. Adopting
this does not start with writing specs for a system you already built.

## What is in the box

```text
skill/                  what gets copied into your repository
  SKILL.md              the gate, the routes, and direct work
  check-update.mjs      is there a newer version, and what does it cost
  references/
    init.md             first run: infer the config, write it, stop
    plan.md             write a package, stop before implementing
    run.md              dispatch a group at a time, validate each one
    work.md             implement a task, continue through its group
    review.md           read and report, change nothing
    close.md            audit against behavior, archive
    commit.md           validate, report, wait, commit once per run
    update.md           offer the new version, say what it costs, replace
  templates/
    change.md           the context, the goal, the drawing, the cost
    tasks.md            the groups, and what proves each one
    spec-delta.md       the rules a change adds, changes or removes
    changepack.md       the config file, written on the first run
```

About 32k characters of procedure, held to ceilings that are checked: 3.6k for
SKILL.md, which is always loaded, and 3.6k for the widest single route, so a
turn loads between 4k and 8k depending on where it goes.

There is still nothing to install in your repository: no dependencies, no
services, no state outside it. The only thing that runs is the update check,
one request to the npm registry made at one moment, and what it remembers is a
line in the file you own. This repository keeps a `scripts/check.mjs` for its
own invariants, which the installer never copies and npm never ships.

## License

MIT.
