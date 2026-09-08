# Update

The skill directory is replaced wholesale. Nothing the project owns lives in
it, so an update is a copy and never a merge. `CHANGEKIT.md` sits outside it
and is only ever stamped.

Two ways in. `close.md` arrives at **Ask**, having already run the check. A
user asking for an update in so many words runs it first, from the repository
root, and starts at **Update** with what it printed:

    node .claude/skills/changekit/check-update.mjs

## Ask

One line at the end of the closure report, then AskUserQuestion with three
answers:

- **Update now.** Follow the rest of this file.
- **Not now.** Set `updates:` to `hold <latest>` in `CHANGEKIT.md` and commit
  that line alone. The question returns when something newer ships, and this
  version never asks again.
- **Never.** Set `updates:` to `off`. No check runs after that, and no network
  call with it.

What gets recorded is the decision, not the date. A repository is never asked
twice about the same version, and the answer is committed because the version
a project runs belongs to the project and not to whoever happened to close the
package.

## Update

1. Stop where `changes/active/` holds a package. Say the update runs once it
   closes, and write nothing. Arriving from a closure this never fires.
2. Present the entries the check printed, and what each one costs: every
   entry ends with that. Name any that asks for an edit by hand, and say what
   it is before anything is written.
3. Wait for confirmation. Nothing is written before it.
4. Install at the ref the check reported, so what was compared is what lands:

       npx github:allan-lancioni/changekit#<ref> --force

5. Stamp `changekit: <new version>` in `CHANGEKIT.md`. Where `updates:` was
   holding a version, return it to `ask at closure`: what it held is behind
   you now. Where step 2 named a migration, apply it now.
6. Commit `.claude/skills/changekit/` and `CHANGEKIT.md`, and nothing else.
   The rest of the tree is not part of this and is left as it stands.
7. Say the procedure that just landed applies from the next session. This one
   loaded the old one and finishes on it.
