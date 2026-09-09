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
where lines stand, they stay as part of the record. Fill `shipped` in the
frontmatter with the version `version:` points at, omitting the key where the
project exposes none. A package written before the frontmatter carries
`shipped:` in a prose header instead: fill it there, and nothing else.

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

Load `commit.md`. The archive move is its own commit even where the last task
group landed a moment before it. The package opened on a commit of its own and
closes on one, and the two bracket everything it produced.

## Check for a newer changepack

After the archive commit, and never before it, from the repository root:

    node .claude/skills/changepack/check-update.mjs

Silence is the ordinary outcome. It leaves no trace in the report, not even as
a command that ran, and nothing here holds up a closure that already landed.
Where it prints, load `update.md` and carry its output there.
