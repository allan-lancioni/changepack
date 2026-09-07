# Close

Close a package only when every task is checked and every dependency is done.

## Audit

1. Check each success criterion against behavior that exists, not against
   tasks that are checked.
2. Confirm no task is pending, in progress, or blocked without a follow-up
   that owns it.
3. Where the project has specs, move the delta into them: the spec now states
   the new behavior as current, and the delta is no longer needed.
4. Confirm code, consumers, scripts, templates, tests and documents agree.
5. Search the scope for drafts, scaffolds, TODOs, open decisions and dead
   references. Remove only what this change made dead, and only where nothing
   still reads it.
6. Confirm the excluded behavior was not built anyway.
7. Run the project's validation command, and the full suite before anything
   activates.

## Archive

Record the outcome in `proposal.md`: what shipped, what changed on the way,
and what was left for later.

Present the closure report, then move the directory to
`changes/archive/<YYYY-MM-DD>-<slug>/`, dated the day it closed. Closure is a
commit point: it lands without asking, like the others.

## Dropping a package

A package that will not ship is closed too, never left open. Skip the audit,
write what happened under Outcome, and archive it at the same dated path. Say
what was built and left behind, and what would have to be true for the work to
come back.

Load `commit.md`. When closure follows the last task group in the same run,
the archive move goes in that same commit, not a second one.

## Check for a newer changekit

After the archive commit, and never before it. Silence is the ordinary
outcome, it leaves no trace in the report, and nothing here holds up a
closure that already landed.

1. Stop where `updates:` in `CHANGEKIT.md` is set to `off`.
2. Compare the marker at the end of `SKILL.md` against the upstream's latest
   tag:

       git ls-remote --tags --refs --sort=-v:refname \
         https://github.com/allan-lancioni/changekit

   Where the upstream carries no tag at all, read `version` from its
   `package.json` on `main` instead. Where neither answers, because the
   machine is offline or the command was not permitted, stop without a word.
3. Stop where the latest is not newer than the installed version, or not
   newer than the version `updates:` holds. One of these is true almost every
   time. Say nothing at all: not that a check ran, not that there was nothing
   to report. The closure report ends where it would have ended.
4. Otherwise load `update.md`.
