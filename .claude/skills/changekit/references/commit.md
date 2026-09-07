# Commit

Every route that changed a file ends here. For a package, "this run" is every
task checked since the last commit, not only the last one.

## When

Three moments commit, and each one commits alone:

- the package, when it opens;
- a task group, as it lands;
- the archive move, at closure.

## Validate

Run the project's validation command. Add, in proportion to what changed:

- targeted tests for the contract you touched and for its consumers;
- the full suite before an activation or a closure;
- `git diff --check`;
- a search for TODOs, scaffolds, open decisions and references to anything
  you removed.

If a check cannot run at all, say which one and why. Never present a check
that did not run as a check that passed.

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

## Commit

Commit without asking. The report is the record, not a request for permission.
Ask first only when the user said to in this conversation, when `CHANGEKIT.md`
says to, when a check failed or could not run, or when the tree holds work that
is not yours and partial staging cannot separate it.

1. Stage only this run's paths. Use partial staging when a file holds
   someone else's work too.
2. Read the staged diff before committing.
3. One commit for the run, in the project's convention.
4. Report the hash and what is left in the tree.

Start the next group after committing only when the user chose to run to the
end. Otherwise stop here.
