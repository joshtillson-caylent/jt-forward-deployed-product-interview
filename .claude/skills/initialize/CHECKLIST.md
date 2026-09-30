# Initialize Checklist

Final review before reporting `/initialize` complete. `verify.sh` covers the mechanical checks. This list covers the judgment calls it can't make. Every item must be true, or be called out in the report.

## Target

- [ ] The target is not the template repo or inside it
- [ ] Mode was identified correctly (fresh / repair / non-empty) and the user was asked about any collision before anything was moved aside
- [ ] No pre-existing file was overwritten or deleted without an explicit yes

## Scaffold

- [ ] `scaffold.sh` ran to completion (its summary line printed) with zero `MISSING` lines
- [ ] `verify.sh` reports 0 FAIL
- [ ] Every WARN was either resolved with the user (skill resync) or reported as a template-maintenance item
- [ ] No file was hand-written or hand-edited in the target. Anything wrong was fixed in the template and re-scaffolded.

## Client-agnostic

- [ ] No client name, industry, person, or engagement fact appears anywhere in the target (`grep -ri` for anything the user mentioned during the run)
- [ ] The "Not onboarded yet" banners are intact in `CLAUDE.md`, `README.md`, and `context/engagement-profile.md`
- [ ] `context/engagement-profile.md` frontmatter shows `status: initialized` and records the template commit

## Site

- [ ] `site/content-index.js` was generated (`node scripts/build-site-index.mjs`), and `verify.sh` shows the site modules parse and the Evo bundle builds
- [ ] `site/workspace.config.js` still has the `// onboard-client:default` identity block (the home page shows the "isn't fitted to a client yet" notice)

## Kanon

- [ ] `.kanon` exists and matches the template
- [ ] `kanon install` ran only after an explicit yes that named the global `~/.claude/settings.json` side effect
- [ ] If installed: `kanon list` shows the source, `.packages/` is ignored, and `.kanon.lock` is tracked
- [ ] If not installed: the reason (declined / CLI missing / catalog unreachable) is in the report

## Publish

- [ ] The publish choice came from an explicit answer (`Commit, GitHub, and Evo` / `Commit and Evo` / `Commit only` / `Leave uncommitted`)
- [ ] The flow followed the target's `.claude/skills/publish/SKILL.md`: preflight passed, commit message `Initialize engagement workspace from template @ <sha>` with **no AI attribution trailer**, nothing force-pushed
- [ ] If GitHub: the repo is **private**, under the owner the user chose, with `origin` set and `main` pushed
- [ ] If Evo: the app is published, the upload succeeded, access matches the user's answer (never company-wide by default), and the slug and URL are recorded in `site/workspace.config.js` and the profile frontmatter
- [ ] If the target isn't a git repo (e.g. nested inside another work tree), the report says why

## Handoff

- [ ] The report gives the target path, mode, what was created and skipped, Kanon status, verify result, and the publish result (commit, repo URL, Evo URL and access)
- [ ] The next step is explicit: open Claude Code in the new repo and run `/onboard-client` with the SOW or proposal attached
- [ ] Any client facts the user mentioned during the run were repeated back for them to bring into `/onboard-client`
