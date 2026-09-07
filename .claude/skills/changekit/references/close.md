# Close

Close a package only when every task is checked and every dependency is done.

## Audit

1. Check each success criterion against behavior that exists, not against
   tasks that are checked.
2. Confirm no task is pending, in progress, or blocked without a follow-up
   that owns it.
3. Where the change altered a normative document, move the delta into it, one
   heading at a time: the document now states the new behavior as current. The
   delta stays in the package, as the record of what became normative; where a
   rule landed differently from how it was declared, its line says so.
4. Confirm code, consumers, scripts, templates, tests and documents agree.
5. Search the scope for drafts, scaffolds, TODOs, open decisions and dead
   references. Remove only what this change made dead, and only where nothing
   still reads it.
6. Confirm the excluded behavior was not built anyway.
7. Run the project's validation command, and the full suite before anything
   activates. Where `validate:` names none, the closure still closes: the
   report says no command ran, and the audit above is what carries it.

## Archive

Record the outcome in `change.md`: what shipped, what changed on the way, and
what was left for later. Delete `Surprises` where nothing was written under it;
where lines stand, they stay as part of the record. Fill `shipped:` in its
header with the version `version:` points at, or none where the project exposes
none. A package opened before the header existed gets what can be filled and
nothing more.

End the report with the package's own history:

    git log --grep='Change: <slug>' --reverse --oneline

That is every commit the package produced, from the opening to the group that
just landed. The archive commit is not in it, being the one you are about to
make.

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
