# Review

Read. Do not change anything, even something obviously broken, unless the
user asks for the fix separately.

## Inspect

1. Resolve the intended behavior: the spec where the project has one, the
   approved package for planned work, the request itself otherwise.
2. Read the whole diff in scope, and enough of the tree around it to know
   what it reaches.
3. Trace each rule to its implementation, its consumers and its tests.
4. Look for what is missing rather than what is written: a consumer nobody
   migrated, a stale reference, a rule stated twice, a scaffold left behind,
   a decision taken but not recorded.
5. Run read only validation when it settles a question. Nothing that writes.

## Report

Order findings by impact, not by file:

- **Blocking:** wrong behavior, unsafe write, broken contract.
- **Risk:** plausible regression, missing coverage, unclear ownership.
- **Cleanup:** duplication or dead material, safe to leave.

Cite the file and line for each. Say which contract it violates and what
happens because of it. When nothing is left, say so plainly instead of
filling the report.
