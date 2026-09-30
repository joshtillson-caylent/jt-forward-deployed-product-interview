# Connector Sweep for Onboarding

The general order and search recipe live in `.claude/skills/genai-poc-strategy/connector-playbook.md`. This file adds only what onboarding needs on top of it: finding the **source documents** and the **account context**. The sweep is offered, never assumed, and a missing connector never blocks progress. Record every source in the evidence ledger as `✓` found and used, `empty` (searched, nothing), or `✗` (not connected).

## When to offer it

- Always offer it once, after reading what the user attached.
- Offer it **first** when there's no SOW or proposal (intake Round 0, "Search EVO & Salesforce" / "Search Google Drive").
- Offer it only once. If the user declines, move on.

## Searches, in order

| # | Source | Goal | How |
|---|---|---|---|
| 1 | Local disk | A prior folder for this client, earlier notes | `find ~/Documents -maxdepth 3 -iname "*<client>*"` (ask before searching outside the repo). Search the repo too. |
| 2 | EVO: the SOW record | The signed SOW or order form | `gcm_metadata_search` for the raw record ("get the full <client> SOW"). Run `gcm_get_schema` first to find the SOW / contract schema and its account field. Use `gcm_fuzzy_search` on the account name when the spelling is uncertain. |
| 3 | EVO: account synthesis | Opportunity, contacts, prior Caylent work, offering fit | `gcm_chat` with one verbatim question: "Summarize Caylent's engagement with <client>: the opportunity and its stage, the SOW or proposal, named client contacts, the Caylent account team, and any prior engagements." It can run for minutes, so let it background and keep working. |
| 4 | Salesforce (through EVO) | The account and opportunity record | `salesforce_*` tools for exact fields: account industry and size, opportunity name, stage, close date, products, owner. If the result says `salesforce_not_connected`, offer `identity_connect(provider="salesforce")`. Never `WebFetch` a Salesforce URL. |
| 5 | Google Drive | SOW or proposal drafts, the pitch deck | Search the client name, plus "SOW", "statement of work", "proposal". Read hits with the Drive read tools. |
| 6 | Gong / Zoom | Pre-sales and discovery calls | Search by client name and account-team names, and preserve speaker attribution |
| 7 | Slack | Account-channel signal | `#opp-<client>`, `#<client>`, `#account-<client>`. Pull open questions, promised items, and links. |

Anything the sweep finds that's a document (SOW, proposal, deck) gets the same treatment as an attachment: a copy or verbatim export into `case-file/source/`, registered in `source-index.md`, and extracted per `source-artifacts.md`.

## What not to record

- Opportunity amounts, rates, and discounts, unless the user asks for them
- Personal contact details beyond work email and title
- Anything from a Slack DM or private channel the user didn't point you to
