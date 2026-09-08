# A package reads like a document: tasks

One group at a time. Check an item only after its validation passes.

Groups 1 and 2 touch different files and may run beside each other. Group 3
needs both. Group 4 needs 1. Group 5 needs all of them.

## 1. `change.md` opens with what the change is

Status: completed

- [x] Frontmatter: `title`, `description`, `changekit`, `opened`, `opened-by`,
      and `issue` and `shipped` written only when they have a value.
- [x] The order becomes `Context`, `Goal`, `Changes`, `Open decisions`,
      `Decided`, `Scope`, `Cost`, `Success criteria`, `Outcome`, `Surprises`.
- [x] `Context` asks for one paragraph. `Goal` asks for the contract and no
      more. Neither leaves its length to the change.
- [x] `Changes` asks for a line above each drawing saying what it shows, and
      says the drawing is written last and read first.
- [x] `Open decisions` asks for alternative and cost as a table, with the
      recommendation in prose beneath it.

Validation:

- `npm run check` passes.
- The template names every section in the new order and no other.

## 2. The other two templates carry their metadata

Status: completed

- [x] `skill/templates/tasks.md`: frontmatter with `title`, `groups`, `order:`
      as a list where a nested list runs in parallel, and `blocked:` written
      only when a group is.
- [x] `skill/templates/spec-delta.md`: frontmatter with `title` and
      `documents:`, so an archived package says what it touched without being
      opened.

Validation:

- `npm run check` passes.
- `order:` written for the reference repository's own six-group package
  reproduces the ordering its prose states.

## 3. `plan.md` stamps the frontmatter and counts the gates

Status: completed

- [x] The stamping paragraph names the frontmatter keys, and says `opened-by`
      is `git config user.name` and `user.email` resolved in the package's
      repository, local before global.
- [x] A key with no value is omitted rather than written empty.
- [x] More than two blocking gates: say so before writing, and offer to settle
      them first. The package is not refused, and the count is what is said.
- [x] The decision-gates paragraph points at the table form.

Validation:

- `npm run check` passes, and `plan.md` stays under 3600 characters.
- `plan.md` names each frontmatter key that appears in a template, and none
  that does not.

## 4. Two routes follow

Status: not started

- [ ] `skill/references/init.md`: what earns a place under `normative:` — that
      something is held to the document and it has named units. A generated
      file does not, and neither does a README.
- [ ] `skill/references/close.md`: `shipped:` is filled in the frontmatter, and
      a package written without one is filled where it can be.

Validation:

- `npm run check` passes, and `init.md` and `close.md` stay under 3600.
- Filling `normative:` needs `init.md` alone.

## 5. It is still 1.0.0

Status: not started

- [ ] `CHANGELOG.md`: the unreleased 1.0.0 entry gains what this changed. No
      new version: 1.0.0 has no tag and has not shipped.
- [ ] `node bin/install.mjs --force`, inside the archive commit.

Validation:

- `npm run check` passes with the loaded copy matching `skill/`.
- The version still reads 1.0.0 in all three places.
