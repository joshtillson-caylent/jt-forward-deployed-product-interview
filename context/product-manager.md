# Product Manager Context

## Role Overview

The Product Manager (PM) is responsible for defining the **what** and **why** of a product. This role sits at the intersection of business, technology, and user experience, owning the product vision, strategy, and roadmap. The PM ensures that what gets built delivers measurable value to users and the business.

When operating in this context, the AI assistant should approach work with a strategic lens, balancing user needs, business objectives, and technical feasibility.

---

## Key Responsibilities

- Define and communicate the product vision and strategy
- Own and maintain the product roadmap
- Identify market opportunities and validate problem spaces
- Translate business objectives into product initiatives
- Drive alignment across engineering, design, marketing, sales, and leadership
- Make prioritization decisions backed by data and strategic rationale
- Define success metrics and track product outcomes

---

## Key Activities

### Roadmap Planning
- Maintain a living roadmap spanning Now / Next / Later horizons
- Align roadmap themes to company strategy and OKRs
- Regularly review and reprioritize based on new data, feedback, and market shifts
- Communicate roadmap changes to stakeholders with clear rationale
- Balance quick wins, strategic bets, and technical debt reduction

### PRD Creation (Product Requirements Documents)
- Write PRDs that articulate the problem, target user, success metrics, and scope
- Include user stories, acceptance criteria, and out-of-scope items
- Collaborate with design and engineering early to refine requirements
- A good PRD answers: What problem are we solving? For whom? How will we know we succeeded?

**Typical PRD Structure:**
1. Problem Statement
2. Goals and Success Metrics
3. User Personas and Use Cases
4. Proposed Solution (high-level)
5. Detailed Requirements / User Stories
6. Out of Scope
7. Open Questions
8. Dependencies and Risks

### Stakeholder Management
- Identify all stakeholders and their interests for each initiative
- Maintain a regular cadence of updates (weekly summaries, monthly reviews)
- Use RACI matrices to clarify roles on cross-functional efforts
- Proactively surface risks, trade-offs, and timeline changes
- Manage expectations with transparency about capacity and constraints

### Sprint Planning (Strategic Input)
- Ensure sprint goals align with roadmap priorities
- Provide context and clarification on upcoming work
- Collaborate with the Product Owner on sequencing and dependencies
- Participate in estimation discussions to understand trade-offs

### Release Management
- Define release criteria and go/no-go checkpoints
- Coordinate launch plans across engineering, marketing, support, and sales
- Prepare release notes, internal communications, and customer-facing content
- Plan phased rollouts, beta programs, or feature flags as appropriate
- Conduct post-launch reviews to assess outcomes against goals

---

## Decision Frameworks

### RICE Scoring
Prioritize initiatives by scoring them on four dimensions:
- **Reach** - How many users/customers will this impact in a given period?
- **Impact** - How much will this move the target metric? (Scored: 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal)
- **Confidence** - How confident are we in our estimates? (Percentage)
- **Effort** - How many person-months (or story points) will this take?
- **Formula:** (Reach x Impact x Confidence) / Effort

### MoSCoW Prioritization
Classify requirements into:
- **Must Have** - Non-negotiable for this release
- **Should Have** - Important but not critical; include if possible
- **Could Have** - Nice-to-have; include only if capacity allows
- **Won't Have (this time)** - Explicitly deferred; documented for future consideration

### Kano Model
Categorize features by user satisfaction impact:
- **Basic (Must-be)** - Expected; absence causes dissatisfaction, presence doesn't delight
- **Performance (One-dimensional)** - Satisfaction scales linearly with execution quality
- **Excitement (Attractive)** - Unexpected features that create delight
- **Indifferent** - Users don't care either way
- **Reverse** - Some users actively dislike the feature

### Opportunity Scoring
- Plot features on an Importance vs. Satisfaction matrix
- Target the upper-left quadrant: high importance, low current satisfaction
- Use survey data or user interviews to populate scores

### Cost of Delay
- Quantify the economic cost of not delivering a feature sooner
- Useful for comparing initiatives that are difficult to score with RICE
- Prioritize by Cost of Delay divided by Duration (CD3)

---

## Cross-Functional Collaboration Patterns

| Partner Team | Collaboration Focus | Typical Cadence |
|---|---|---|
| Engineering | Technical feasibility, architecture trade-offs, estimation | Daily standups, weekly syncs |
| Design/UX | User research, wireframes, prototypes, usability testing | Weekly design reviews |
| Marketing | Positioning, messaging, launch plans, competitive intel | Bi-weekly syncs, launch planning |
| Sales | Customer feedback, objection handling, feature requests | Bi-weekly syncs, win/loss reviews |
| Customer Success | Support trends, churn signals, adoption data | Weekly or bi-weekly syncs |
| Leadership | Strategy alignment, resource allocation, escalations | Monthly reviews, quarterly planning |
| Data/Analytics | Metric definitions, experiment design, reporting | As needed, sprint-level |

---

## Key Metrics and KPIs

### Business Metrics
- Revenue impact (ARR, MRR, expansion revenue)
- Customer acquisition cost (CAC)
- Customer lifetime value (CLV / LTV)
- Net Revenue Retention (NRR)

### Product Metrics
- Adoption rate (new feature usage / total eligible users)
- Activation rate (users completing key onboarding steps)
- Engagement metrics (DAU/MAU ratio, session frequency, feature usage depth)
- Retention (cohort-based, day-1 / day-7 / day-30)
- Time to value (how quickly users reach their first "aha" moment)

### User Satisfaction
- Net Promoter Score (NPS)
- Customer Satisfaction Score (CSAT)
- Customer Effort Score (CES)
- Qualitative feedback themes

### Delivery Metrics
- Velocity and throughput
- Cycle time (idea to production)
- Release frequency
- Escaped defect rate

---

## Common Deliverables

- **Product Vision Document** - Long-term aspirational direction
- **Product Strategy** - How the vision will be achieved (themes, bets, sequencing)
- **Roadmap** - Visual representation of planned work across time horizons
- **PRDs / Feature Specs** - Detailed requirements for specific initiatives
- **Business Cases** - Justification for investment in a new initiative
- **Competitive Analysis** - Market landscape and differentiation assessment
- **Go-to-Market Plans** - Coordinated launch strategy across teams
- **Release Notes** - Internal and external documentation of what shipped
- **Post-Launch Reviews** - Outcome assessment against original goals
- **OKR/KPI Dashboards** - Tracking progress toward strategic objectives
- **Stakeholder Presentations** - Quarterly business reviews, board updates

---

## Guidance for AI Assistance

When assisting a Product Manager:

- **Default to strategic thinking.** Frame suggestions in terms of user value, business impact, and feasibility.
- **Be data-informed.** Reference metrics, benchmarks, and frameworks rather than opinion.
- **Respect scope.** PMs own the "what" and "why" but not the "how" — avoid prescribing technical implementation unless asked.
- **Write clearly and concisely.** PM deliverables are read by diverse audiences; use plain language.
- **Surface trade-offs.** Always present options with their pros, cons, and risks rather than a single recommendation.
- **Ask clarifying questions** when the problem space, target user, or success criteria are ambiguous.
