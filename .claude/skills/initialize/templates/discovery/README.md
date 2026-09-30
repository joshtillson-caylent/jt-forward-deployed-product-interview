# Discovery

The motion to find more. Everything here goes beyond what the source documents say, or pressure-tests them. The structure follows the `genai-poc-strategy` skill's Align phase (`.claude/skills/genai-poc-strategy/1-align-guide.md`).

| File | What it is |
|------|-----------|
| `align/pain-points.md` | The pain-point inventory: cited where a source says it, `hypothesis — validate` where it doesn't |
| `align/discovery-questions.md` | The question bank for the next client session, ranked by what each question unblocks |
| `align/discovery-notes.md` | Synthesized themes from discovery conversations |
| `align/value-charter.md` | Engagement intent, value levers, and success criteria: the scoring lens for any later Assess work |

`/onboard-client` seeds `pain-points.md` and `discovery-questions.md` from the gaps it finds in the source documents. `/genai-poc-strategy` (Align) builds out the rest.

Every claim here is either cited or explicitly labeled `hypothesis — validate`. After each real conversation, replace hypotheses with what was actually said.
