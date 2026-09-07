# <Title>: spec delta

Normative behavior this change makes true. It lives here until closure, never
in the document it lands in.

**Does this change alter something a later change will be held to?** That is
what earns a delta, not whether the project has behaviour specs. Renaming a
heading does not qualify; changing what a rule obliges does. A document
qualifies when something is held to it and it has named units you can name
before and find after: the behaviour specs, `CLAUDE.md`, `AGENTS.md`, what is
under `.claude/`. A README fails the first test, and drift there is a
documentation bug rather than a broken commitment.

One heading per document, so folding it at closure is one file at a time.
Under each, one line per rule, marked `+` added, `~` changed, `-` removed.

## `<document path>`

- `+` **<rule>** — <the rule, written as current behavior.>
- `~` **<rule>** — <what changes, and what stays.>
- `-` **<rule>** — <what replaces it, or that nothing does.>
