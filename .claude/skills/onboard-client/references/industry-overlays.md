# Industry Overlays

How the client's industry changes the workspace: which data classes to ask about, which regimes usually shape what Claude can touch, which guardrail lines go in CLAUDE.md, and where to look for use-case hypotheses.

**These are prompts for the intake conversation, not compliance advice.** A regime listed here is *commonly relevant* to the industry. Whether it applies to this client, and how, is the client's compliance team's call. In the workspace, write "client confirmed X applies" or "X is `hypothesis — validate`", never "X applies" on this file's say-so.

## How to apply

1. Pick the row that matches the intake answer. For a conglomerate or holding company, use the row for the business unit in scope.
2. Use its **data classes** as the options for intake Round 3 `Data`, and its **systems** to tailor Round 3 `Systems`.
3. Add its **guardrail lines** to CLAUDE.md's `claude-guardrails` block, after the engagement-level lines. Phrase each one as a working rule for Claude in this repo.
4. Use its **use-case areas** only to seed `discovery/align/pain-points.md` and the P1 use-case backlog, and label every one `hypothesis — validate`.
5. Put the client's own terms of art in the glossary in `context/engagement-team.md` as they come up in the documents. Don't pre-fill a generic industry glossary.

## Overlays

### Financial services (banking, asset / investment management, insurance, PE-backed financial firms)
- **Data classes:** PII / customer financial data · material non-public information (MNPI) · trading and portfolio data · board and investor materials
- **Commonly relevant:** SEC / FINRA recordkeeping and communications rules · SOX controls over financial reporting · GLBA privacy · PCI DSS (card data) · state insurance regulation · model-risk management expectations (SR 11-7 style) at banks
- **Guardrails:** keep MNPI and deal names out of example prompts and repo content unless the client approves · anything touching financial reporting needs a human-review step and an audit trail · note whether client communications drafted with Claude fall under recordkeeping rules
- **Systems:** ERP / GL (NetSuite, SAP, Oracle), FP&A tools (Adaptive, Anaplan, Excel models), CRM, data warehouse, Microsoft 365
- **Use-case areas:** variance commentary, close-process narrative, board and investor reporting, policy and procedure Q&A, KYC / onboarding document review, claims intake (insurance)

### Healthcare & life sciences
- **Data classes:** PHI · clinical trial data · patient-reported data · proprietary research
- **Commonly relevant:** HIPAA (a BAA is needed before any PHI touches a vendor system) · GxP and 21 CFR Part 11 (validated systems, electronic records) in life sciences · state health-privacy laws
- **Guardrails:** no PHI in this repo or in prompts unless a BAA and client approval are confirmed and recorded · anything in a regulated (GxP) process is a validation question, so flag it in discovery · clinical or medical content always gets expert human review
- **Systems:** EHR (Epic, Cerner), CTMS / EDC, document management (Veeva), Microsoft 365
- **Use-case areas:** prior-authorization packets, clinical documentation summaries, regulatory submission drafting, medical-information responses, SOP Q&A

### Public sector & government
- **Data classes:** CUI · CJI · citizen PII · procurement-sensitive data
- **Commonly relevant:** FedRAMP authorization levels · FISMA / NIST 800-53 · CJIS (law enforcement) · ITAR / EAR (defense) · state procurement and records-retention rules
- **Guardrails:** confirm which Claude surfaces are authorized for the data level before designing anything · no CUI in this repo · anything that affects the public needs a human decision-maker on record
- **Systems:** case management, ERP (Workday, Oracle), Microsoft 365 GCC, records systems
- **Use-case areas:** constituent correspondence drafting, policy and regulation Q&A, grant and procurement document review, case summarization

### Retail, CPG & e-commerce
- **Data classes:** consumer PII · payment data · pricing and promotion plans · supplier contracts
- **Commonly relevant:** PCI DSS · CCPA / CPRA and state privacy laws · GDPR for EU customers · FTC rules on advertising claims
- **Guardrails:** no customer-level data in example prompts · marketing copy that makes product claims gets legal review
- **Systems:** e-commerce platform (Shopify, Salesforce Commerce), ERP, PIM, CRM / CDP, Google Workspace or Microsoft 365
- **Use-case areas:** product content at scale, customer service triage, merchandising analysis narrative, supplier and contract review

### Manufacturing, industrial & energy
- **Data classes:** IP and trade secrets · export-controlled technical data · OT / plant data · safety records
- **Commonly relevant:** ITAR / EAR export controls · NERC CIP (utilities) · OSHA recordkeeping · customer contract confidentiality
- **Guardrails:** confirm export-control status before technical drawings or specs touch any AI system · operational (OT) systems are read-only for any agentic workflow unless the client explicitly signs off
- **Systems:** ERP (SAP, Oracle), MES, PLM, CMMS / EAM, procurement platforms
- **Use-case areas:** maintenance and work-order summarization, supplier and purchasing workflows, quality and non-conformance reports, planning and scheduling narrative, recruiting and program management (a common P2 starting point)

### Technology, SaaS & media
- **Data classes:** customer data processed under DPAs · source code · unreleased product plans · licensed content and talent contracts (media)
- **Commonly relevant:** SOC 2 commitments to their own customers · GDPR / CCPA as a processor · content rights and licensing terms (media)
- **Guardrails:** check the client's DPAs and customer commitments before customer data touches any workflow · no source code or unreleased roadmap in this repo unless the client asks for it
- **Systems:** GitHub / GitLab, Jira / Linear, Salesforce / HubSpot, Zendesk, Slack, Google Workspace
- **Use-case areas:** support deflection and triage, sales research and proposal drafting, engineering enablement (Claude Code), content operations

### Education
- **Data classes:** student records · minors' data · research data
- **Commonly relevant:** FERPA · COPPA (under-13) · state student-privacy laws · IRB requirements for research
- **Guardrails:** no student-identifiable data in this repo or prompts · academic-integrity policy shapes any student-facing use
- **Systems:** SIS, LMS (Canvas, Blackboard), Google Workspace for Education or Microsoft 365
- **Use-case areas:** course material drafting, advising and admissions correspondence, grant writing, administrative policy Q&A

### Anything else
Use the SOW and the intake answers directly. Ask the Round 3 data and review-gate questions with neutral options, write the guardrail lines from the answers, and add a new overlay here once a second engagement in that industry comes along.
