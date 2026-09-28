# Connector Sweep Playbook

The search recipe for Phase 0 of a GenAI POC engagement. Run it before generating any content, to ground the Product & Design work in real customer evidence rather than priors.

**Portable by design.** Reference connectors by *capability*, not by a hardcoded tool name — the actual MCP tool names differ across Claude Code, Codex, and Cursor and across each user's setup. Discover what's connected in the current environment, use it, and note what isn't. **Offer the sweep; don't assume it.** Tell the consultant what you *could* pull and let them opt in — and never block on a connector that isn't there.

## Order of operations
1. **Local disk** (fastest, free)
2. **CRM / account system** (Salesforce) — the org-of-record
3. **Internal engagement memory** (EVO) — Caylent's prior-engagement knowledge
4. **Docs & playbooks** (Notion, Confluence, Google Drive) — persona libraries, prior POC writeups
5. **Call transcripts** (Gong, Zoom) — highest-fidelity pain points and stated goals
6. **Product analytics** (PostHog, Amplitude) — behavioral evidence, if the customer has shared access
7. **Team signal** (Slack) — real-time account-team questions, blockers, customer quotes

---

## 1. Local disk
Look for prior engagement folders (`.ai/engagements/<customer-slug>/`), meeting notes (`meeting-notes/`, search the customer name), and reference material (`context/`, search industry/competitor names).
```bash
find . -type d -iname "*<customer-slug>*"
grep -ril "<customer name>" meeting-notes/ context/ 2>/dev/null
```

## 2. CRM / account system (Salesforce)
Pull the account record, active opportunities, key contacts, recent cases/activities. Capture: account owner, industry, size, region; opportunity stage/ACV/close date/products; contact titles and roles; anything hinting at pain points. Authenticate first if the tool requires it. **Not connected →** note "no account record pulled" in the brief.

## 3. Internal engagement memory (EVO)
Find adjacent engagements, prior POC outcomes, and reusable Caylent IP. Search by **industry/vertical first** (broader signal), then by customer name and known competitors. Capture prior GenAI POC outcomes that informed pricing, scoping, or risk in similar deals — this is the fastest way to seed a credible Assess long list.

## 4. Docs & playbooks (Notion / Confluence / Google Drive)
Search, then fetch hits. Terms to try, in order: `<customer name>` · `GenAI POC <industry>` · `PXE align` / `PXE assess` / `PXE design` · `persona library <industry>` · `value charter template` · `use case scoring`. Surfacing a prior persona library or scored feature list is one of the highest-leverage moves in the whole sweep.

## 5. Call transcripts (Gong / Zoom)
Search recordings/transcripts by customer name, account-team members, and titles like "discovery", "kickoff", "working session". Look for AI-extracted topics (pain points, current process, data, automation) and **preserve speaker attribution** on direct quotes. Authenticate if needed.

## 6. Product analytics (PostHog / Amplitude)
If the customer has shared analytics access, pull behavioral evidence for pain points and baselines — where users drop off, feature adoption, funnel friction. This grounds Design-phase value measurement in real numbers rather than estimates. Often not available in early engagements — note it and move on.

## 7. Team signal (Slack)
Find the customer channel (`#<customer-slug>` or `#account-<customer-slug>`) and search adjacent channels (`#pxe-team`, `#genai-pocs`) for the customer name. Capture open questions from the account team, customer quotes shared in-channel, and links to artifacts.

---

## Evidence ledger
After the sweep, summarize in `00-engagement-brief.md`:

| Source | Status | Items pulled | Notes |
|---|---|---|---|
| Local disk | ✓ / empty / ✗ | | |
| CRM (Salesforce) | ✓ / empty / ✗ | | |
| Engagement memory (EVO) | ✓ / empty / ✗ | | |
| Docs (Notion/Confluence/Drive) | ✓ / empty / ✗ | | |
| Call transcripts (Gong/Zoom) | ✓ / empty / ✗ | | |
| Product analytics | ✓ / empty / ✗ | | |
| Slack | ✓ / empty / ✗ | | |

`✓` = found and used · `empty` = searched, no results · `✗` = not connected / unavailable. This ledger is what lets the consultant trust — or pressure-test — every claim downstream. If a whole engagement is `✗`/`empty`, say so plainly and mark the output hypothesis-driven.
