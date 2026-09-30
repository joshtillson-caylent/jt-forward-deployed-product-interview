# Onboarding Checklist

Final review before reporting `/onboard-client` complete. Every item must be true, or be called out in the report.

## Sources

- [ ] The SOW was attached, or the user was prompted for it (Round 0), and the outcome is recorded: attached / found by sweep / proceeding in hypothesis mode
- [ ] The connector sweep was offered once, and every source has a row in the evidence ledger (`✓` / `empty` / `✗`)
- [ ] Every original is in `case-file/source/` (or linked, if it lives in a system of record) and registered in `source-index.md`
- [ ] Every source was read in full, including SOW exhibits and appendices

## Interview

- [ ] Rounds 1, 3, every applicable level round (P1 / P2 / P3), and R were asked. Rounds 2 and 4 were asked, or each skipped question appeared in the readback.
- [ ] First options were pre-filled from the documents, with their sources in the labels
- [ ] The user confirmed the readback before anything beyond the sources and SOW summary was written

## Evidence discipline

- [ ] Every fact in `case-file/` and `context/` cites a source document, a sweep result, or `[Source: intake <date>]`
- [ ] Everything inferred is in `discovery/`, labeled `hypothesis — validate`
- [ ] Cross-source conflicts are listed with both citations, and the SOW governs scope, deliverables, and dates
- [ ] No rate cards, rates, discounts, or opportunity amounts in Markdown (unless the user asked)
- [ ] None of the flagged sensitive data (PHI, MNPI, CUI, student records, customer PII) was copied into Markdown

## Workspace state

- [ ] `blocks.py list .` exits 0
- [ ] Profile frontmatter shows `status: onboarded`, with every field set (blank only where unknown, and listed under Unknowns)
- [ ] The profile's change log has an onboarding row that names its sources
- [ ] The deliverables tracker has one row per SOW deliverable, with the SOW's own IDs
- [ ] `discovery/align/pain-points.md` and `discovery-questions.md` exist. Questions are ranked and grouped by who answers.
- [ ] The engagement is placed on the P1–P3 ladder with a citation, and the overlays match `engagement-levels.md` (P1 `enablement/`; P2 `build/`; P3 `build/` + `service/`; spans get the union; `enablement/` added when a foundations gap is in scope). Files are seeded where the sources allowed.
- [ ] A foundations gap that the SOW doesn't cover is recorded under Risks in the profile
- [ ] CLAUDE.md is under ~200 lines, and its guardrails cover level, industry, and engagement-specific rules
- [ ] `.gitignore` and `source_docs_in_git` agree with the user's source-docs decision
- [ ] No leftover template tokens (`<Client>`, `<placeholder>`, bare `YYYY-MM-DD`) in written files
- [ ] If `/initialize`'s `verify.sh` is available, it reports 0 FAIL

## Site

- [ ] `site-identity` is filled: `status: "onboarded"`, client brand, home description, glance chips, about paragraphs
- [ ] Nothing sensitive in the site config (it's published to Evo): no MNPI, rates, or personal contact details
- [ ] `node --check` passes on `site/workspace.config.js`, `node scripts/build-site-index.mjs` ran (overlay sections show up), and `node scripts/build-evo.mjs` builds

## Handoff

- [ ] The report covers the level and overlays, files written, the evidence ledger, the top 5 open questions, and anything in hypothesis mode
- [ ] Next steps are concrete and in order for this engagement level
- [ ] `/publish` was offered. If it ran, its report (commit, push, Evo URL) is included. Nothing was committed or pushed outside it.
