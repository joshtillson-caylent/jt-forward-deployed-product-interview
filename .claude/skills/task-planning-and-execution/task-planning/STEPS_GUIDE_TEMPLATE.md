# steps-guide.md

```md
# [Title] - Steps Guide

**Context doc (source of truth):**
- `.ai/tasks/YYYY-MM-DD/<slug>/<slug>-context.md`

**Steps docs (max 5 steps per doc):**
- `.ai/tasks/YYYY-MM-DD/<slug>/<slug>-steps-1-5.md`
- `.ai/tasks/YYYY-MM-DD/<slug>/<slug>-steps-6-10.md`

**Coordination rule:** Each step is completed by one person in one session.
Do not start a step until all the **Prereqs:** for that step are completed.

**Dependency rules:**
- Steps with dependencies must explicitly list them in **Prereqs** and appear after their prerequisites in the index.
- Steps with no dependencies use **Prereqs: None**—this is expected and valid. Place them wherever makes logical sense.
- Independent steps (Prereqs: None) can be worked in parallel if multiple people are available.

---

## Step index

| Step | Name | Status | Owner | Doc |
| --- | --- | --- | --- | --- |
| 1 | [Name] | Incomplete | [Name] | `.ai/tasks/YYYY-MM-DD/<slug>/<slug>-steps-1-5.md` |
| N | Final validation & review (required, always last) | Incomplete | [Name] | `.ai/tasks/YYYY-MM-DD/<slug>/<slug>-steps-N-N.md` |

---

## Steps doc ranges

- Max 5 steps per steps doc.
- Steps are numbered sequentially across docs.
- The final step is always validation and must live in the last steps doc.

```
