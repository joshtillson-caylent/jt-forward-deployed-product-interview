# Marker Contract

The interface between `/initialize` and `/onboard-client`. `/initialize` lays down marker blocks. `/onboard-client` fills them, and re-fills them on a re-run. Both sides must agree on this list. If a key is added or renamed, update the templates in the template repo (`.claude/skills/initialize/templates/`) and this file together.

```
<!-- onboard-client:begin <key> -->          Markdown files
...content that /onboard-client owns...
<!-- onboard-client:end <key> -->

// onboard-client:begin <key>                  site/workspace.config.js
...
// onboard-client:end <key>
```

**Rules**
- Fill blocks with `scripts/blocks.py fill <file> <key> <content-file|->`. It replaces only the content between the markers and keeps the markers, so the next re-run can find them. Never delete a marker.
- `scripts/blocks.py list <repo>` shows every block's status and exits 1 while any required block is unfilled. Onboarding isn't done until it exits 0.
- `/initialize`'s default content in each block starts with an `onboard-client:default` sentinel (`<!-- onboard-client:default -->` in Markdown, `// onboard-client:default` in JS), and `blocks.py` reports the block `UNFILLED` while it's there. Filling replaces the whole body, sentinel included. Never keep the sentinel in filled content. Two blocks (`claude-directories`, `readme-layout-extras`) start empty and may stay empty.
- A block's content is the whole truth for that block. On a re-run, write the full new content, not a diff appended to the old.
- Content outside the markers belongs to the user. Don't rewrite it.

## Blocks

| File | Key | Must contain | Limit |
|---|---|---|---|
| `CLAUDE.md` | `claude-summary` | Client, industry, engagement level (P1 / P2 / P3 or span) and offering, Claude surfaces, term, sponsor and day-to-day contact, the one-sentence "why Caylent is here", and the teams in scope. End with "Full detail: `context/engagement-profile.md`, `case-file/`." | ≤ 12 lines (CLAUDE.md stays under ~200) |
| `CLAUDE.md` | `claude-directories` | One bullet per overlay folder (`enablement/`, `build/`, `service/`), in the same style as the directory map above it. Empty if no overlay. | 1 line per folder |
| `CLAUDE.md` | `claude-guardrails` | Level guardrail lines for every applied overlay (`engagement-levels.md`), then industry lines (`industry-overlays.md`), then any engagement-specific rule from the SOW or intake (data classes, review gates, client terminology, what never goes in the repo). Replaces the defaults, so restate any default that still applies. | ≤ 15 bullets |
| `CLAUDE.md` | `claude-git` | The source-docs decision (`case-file/source/` local-only or tracked) and any client rule about repo hosting | ≤ 3 bullets |
| `README.md` | `readme-header` | `# <Client> — <Engagement name>` plus a 1–2 sentence description of the engagement | ≤ 4 lines |
| `README.md` | `readme-layout-extras` | A fenced block listing the overlay folders, in the same format as the layout above it. Empty if no overlay. | |
| `README.md` | `readme-status` | Onboarded date, engagement phase, next milestone, and the template it was initialized from (keep that line) | ≤ 5 lines |
| `context/engagement-profile.md` | `profile` | The full body from `templates/engagement-profile.md`. Also set the frontmatter fields: `status: onboarded`, `onboarded`, `client`, `industry`, `engagement_level`, `offering`, `claude_surfaces`, `start_date`, `end_date`, `source_docs_in_git`. Leave `evo_slug` / `evo_url` to `/publish`. | ~150 lines |
| `context/engagement-team.md` | `team` | Mission, Team table (both sides), Stakeholders, Ways of working, Glossary, Key links. Same shape as the stub. | ~120 lines |
| `case-file/README.md` | `case-file-index` | The table of files actually written in `case-file/` | |
| `site/workspace.config.js` | `site-identity` | A complete, valid `export const IDENTITY = { … };` with `status: "onboarded"`; `title` (`<Client> — <Engagement name>`); `brand` (`mark`: 2–3 letter client initials, `name`: the client's short name, `sub`: `"Engagement"` or the level label); `client`; `engagement`; `home.headline` (keep the default unless the user wants otherwise) and `home.description` (1–2 plain sentences: the engagement in the client's language); `glance` chips (Level, Term, Sponsor, Next milestone; values from the profile); `about` (2 short paragraphs: who the client is and why Caylent is here, then what the workspace holds). Nothing sensitive: the site is published to Evo. Must pass `node --check --input-type=module < site/workspace.config.js`. | ≤ 40 lines |
| `deliverables/README.md` | `deliverables-tracker` | The tracker table, one row per SOW deliverable (IDs as the SOW numbers them), status `not started` unless the user says otherwise | |

Frontmatter fields in `context/engagement-profile.md` sit outside any marker, but `/onboard-client` owns them too. Edit them in place, and log every change in the profile's change log.
