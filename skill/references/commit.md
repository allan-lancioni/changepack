# Commit

Every route that changed a file ends here. For a package, "this run" is every
task checked since the last commit, not only the last one.

## When

Three moments commit, and each one commits alone:

- the package, when it opens;
- a task group, as it lands;
- the archive move, at closure.

## Validate

Run the project's validation command, where `validate:` names one. Add, in
proportion to what changed:

- targeted tests for the contract you touched and for its consumers;
- the full suite before an activation or a closure;
- `git diff --check`;
- a search for TODOs, scaffolds, open decisions and references to anything
  you removed.

A check behaves three ways, and only one of them stops the run:

- it runs and passes: report it;
- it runs and fails: stop, commit nothing, mark nothing;
- there is none, or it could not run: one line saying which check and why, and
  the run continues.

An empty `validate:` is a project with no command, not a project that failed.
Never present a check that did not run as a check that passed.

## Report

Present, covering the whole run:

- where the run completed a task group, its items as a table, one row per
  item with what proved it;
- what behaves differently now;
- the files that changed;
- decisions approved along the way;
- commands run, and their results;
- risks and anything still open;
- unrelated work still sitting in the tree;
- why the run stopped here.

## The message

The subject says what is true now, in 72 characters or fewer. Concrete rather
than evocative: someone scanning the log decides from it alone whether the
commit concerns them.

The body is optional and never longer than 300 characters. It carries what the
subject could not, which is what behaves differently, never the reasoning. The
reasoning is the package's, and the package is archived. A body that will not
fit is telling you the work needed a package.

Where a package produced the commit, two trailers close it:

    Change: <slug>
    Changekit: <the version that governed the run>

Both or neither, on all three of the package's moments. At closure
`Changekit:` still names the old version where the package is what ships the
new one: that is what ran. Direct work carries no trailers.

The opening and archive commits name the package in the subject and say which
moment it is. The type follows the project's convention, which this skill
never sets.

No agent is credited as co-author. A project that must disclose machine
assistance says so in `commit:`, and only then is the trailer added.

## Commit

Commit without asking. The report is the record, not a request for permission.
Ask first only when the user said to in this conversation, when `CHANGEPACK.md`
says to, when a check ran and failed, or when the tree holds work that is not
yours and partial staging cannot separate it.

1. Stage only this run's paths. Use partial staging when a file holds
   someone else's work too.
2. Read the staged diff before committing.
3. One commit for the run, in the shape above.
4. Report the hash and what is left in the tree.

Start the next group after committing only when the user chose to run to the
end. Otherwise stop here.
