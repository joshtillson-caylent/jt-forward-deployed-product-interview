---
name: initialize
description: Scaffold a new, client-agnostic Caylent engagement workspace repo. Lays down the standard folder tree, README, CLAUDE.md (including the team collaboration rules), .gitignore, the .kanon manifest (and runs Kanon install on consent), context stubs, the config-driven site dashboard, and the full engagement skill library copied from the template repo. It then verifies the result and, through /publish, commits, creates the private GitHub repo, and publishes the dashboard to Evo as a Caylent App. Takes no client input; run /onboard-client afterwards to fit the workspace to a client. Use when starting a new engagement repo, or to repair or upgrade an existing workspace's scaffold. Do NOT use to add client context (that is onboard-client), and never inside the template repo itself.
argument-hint: "[target-directory]"
---

# Initialize an Engagement Workspace

Stand up a new engagement repo in the standard Caylent forward-deployed shape, identical every time and specific to no client. This is step one of two:

1. **`/initialize`** (this skill): the repo is ready to work in, still client-agnostic, and already live on GitHub and Evo if the user wants it.
2. **`/onboard-client`**: SOW and proposal intake, the intake interview, and tailoring the repo and its dashboard to the engagement.

**`/publish`** (commit → push → Evo) is the shared last step of both, and it's what the team runs from then on.

`/initialize` needs no input data. If the user volunteers client facts while it runs, don't write them anywhere. Hold them and pass them to `/onboard-client` (see Phase 5).

## Where things come from

This skill lives in the **template repo**, the example engagement workspace, and is linked into `~/.claude/skills/` so it runs from any directory. Everything resolves from the skill's real path:

- Template repo root: `${CLAUDE_SKILL_DIR}/../../..`
- Scaffold script: `${CLAUDE_SKILL_DIR}/scripts/scaffold.sh` (deterministic, non-destructive, supports `--dry-run`)
- Verify script: `${CLAUDE_SKILL_DIR}/scripts/verify.sh`
- Publish flow: the target's own `.claude/skills/publish/SKILL.md`, copied in by the scaffold. Read it and follow it in Phase 5, rather than invoking it by name: a session started in an empty directory doesn't discover skills created mid-session until `/reload-skills`.
- What gets created, and from where: [`MANIFEST.md`](MANIFEST.md)
- Final review: [`CHECKLIST.md`](CHECKLIST.md)

**All scaffold files come from the script.** Don't hand-write or "improve" scaffold files in the target. Every workspace must match the template. If a template is wrong, fix it in the template repo (see "Maintaining the template") and re-run.

## Inputs

- **Target directory** (optional): `$ARGUMENTS`. If empty, use the current working directory.

## Workflow

### Phase 1: Resolve the target and preflight

1. Resolve the target to an absolute path.
2. **Template-repo guard.** If the target is the template repo or anything inside it, stop. `scaffold.sh` refuses with exit code 3. Ask for a separate target path, and suggest a sibling of the template repo such as `~/Documents/GitHub/<engagement-name>`. Running `/initialize` from a session opened in the template repo is fine as long as it gets a target path.
3. **Classify the target:**
   - **Fresh:** it doesn't exist or is empty (a lone `.git` counts as empty). Proceed without asking. Invoking the skill is the request.
   - **Existing workspace:** `context/engagement-profile.md` exists. Switch to **repair mode**, which fills in only what's missing. Read the profile's `status` and report it. An onboarded workspace stays onboarded, because the script never touches filled files.
   - **Non-empty, not a workspace:** run `scaffold.sh --dry-run <target>` and read the `SKIP` lines. These are paths the scaffold wants that already exist.
     - Trivial stubs, like a GitHub-generated `README.md` with only a title or a default `.gitignore`: ask whether to replace them with the template version. If yes, move each stub aside (`mv README.md README.md.orig`), scaffold, then delete the `.orig` files once the user confirms.
     - Anything substantive, like an existing codebase or an unrelated project: stop and ask. Don't layer an engagement workspace onto an unrelated repo.
4. Run `scaffold.sh --dry-run <target>` and keep the summary for the report. `MISSING` lines mean the template repo itself is broken, so stop and report them. Don't paper over them.

### Phase 2: Scaffold

1. Run `bash "${CLAUDE_SKILL_DIR}/scripts/scaffold.sh" "<target>"`. Don't pipe its output through `head` or `tail`: a closed pipe kills the script partway through. Capture the full output instead.
2. The script:
   - renders every file under `templates/` into the target (substituting `{{REPO_NAME}}`, `{{DATE}}`, `{{TEMPLATE_REPO}}`, `{{TEMPLATE_COMMIT}}`, `{{CONSULTANT_NAME}}`, `{{CONSULTANT_EMAIL}}`),
   - copies the generic toolkit files in `manifests/shared-files.txt` from the template repo root,
   - copies every skill in `manifests/skills.txt` from the template repo's `.claude/skills/`,
   - runs `git init -b main` if the target isn't already a git repo (it warns and skips if the target sits inside another repo's work tree).
3. Generate the site's document index: `(cd "<target>" && node scripts/build-site-index.mjs)`. If `node` is missing, say so: the site still opens, but the index and the Evo bundle need Node.
4. It never overwrites an existing file. Existing skill folders are skipped unless `--force-skills` is passed. Only pass that flag in repair mode, after showing the user the drift (Phase 4) and getting a yes. It replaces local edits. Prefer `--force-skills=<name>,<name>` to resync only the skills the user approved.

### Phase 3: Kanon

The workspace ships a `.kanon` manifest for Caylent's `product-skills` package. Installing it has effects outside the repo, so it always needs consent.

1. `command -v kanon`. If it's missing, tell the user it installs with `pipx install kanon-cli`. Don't install it yourself unless asked. Skip to Phase 4 with Kanon marked "manifest written, CLI not installed".
2. Confirm the catalog entry resolves. Read `KANON_SOURCE_product_skills_PATH` and `_REF` from the target's `.kanon`, then run:
   `gh api "repos/caylent/caylent-private-kanon/contents/<PATH>?ref=<REF>" --jq .path`
   If this fails (auth or 404), report it and skip the install. Don't edit `.kanon` to point somewhere else without asking.
3. Ask for consent (combined with the publish question; see "Asking"). State the side effects plainly: `kanon install` clones the package into `.packages/` (gitignored), links a marketplace into `~/.claude-marketplaces/`, and registers it in the global `~/.claude/settings.json`. The package is an older cut of skills that already exist locally, and the workspace's `.claude/skills/` stays the source of truth.
4. On yes: run `kanon install` from the target directory, then `kanon list` to confirm the source shows as installed. Make sure `.packages/` stays ignored and `.kanon.lock` stays tracked. Tell the user to restart Claude Code, or run `/reload-plugins`, to pick up the marketplace.
5. On no: leave `.kanon` in place and note "run `kanon install` in the repo when ready" in the handoff.

### Phase 4: Verify

1. Run `bash "${CLAUDE_SKILL_DIR}/scripts/verify.sh" "<target>"`.
2. **FAIL** means the scaffold is incomplete. Re-run `scaffold.sh` (it's idempotent) and verify again. Never fix a FAIL by hand-writing the missing file.
3. **WARN** means a human decision is needed:
   - *Skill differs from template:* in repair mode, show `diff -rq` for each drifted skill and ask whether to resync with `--force-skills`, which overwrites local edits. In fresh mode, drift is impossible, so treat it as a bug and investigate.
   - *Template skill not in manifest:* tell the user. It's a template-maintenance item, not something to fix in the target.
   - *Help modal doesn't list a shipped skill:* update `templates/site/help.js` in the template repo. The target's copy is fixed on the next scaffold.
4. `verify.sh` also parses every site module and builds the Evo bundle. For a visual check, serve the target (`python3 -m http.server` from it) and open `http://localhost:8000`. The home page should show the "isn't fitted to a client yet" notice.
5. Walk [`CHECKLIST.md`](CHECKLIST.md) for the judgment checks the script can't make.

### Phase 5: Publish and hand off

Publishing makes the workspace real for the team: a private GitHub repo to collaborate in, and an Evo app they can open. The app shows the "not onboarded yet" notice until `/onboard-client` runs.

1. **Run the publish flow** if the user chose it (see "Asking"). Read `<target>/.claude/skills/publish/SKILL.md` and follow it against `<target>`, with:
   - commit message `Initialize engagement workspace from template @ <template-commit>`
   - the GitHub owner and Evo access answers already collected, so its plan confirmation is the one already given. Don't ask twice.
   - Evo slug: the target's directory name, lowercased and hyphenated, unless the user named one

   The publish flow owns the details: preflight, no AI attribution trailer, `gh repo create --private`, `caylent_apps_publish`, the S3 upload, access grants, and recording the slug and URL in `site/workspace.config.js` and the profile frontmatter.
2. If the user chose **Commit only**, do Phase 2 of the publish flow (commit) and stop. If they chose **Leave uncommitted**, skip this phase.
3. **Report**, briefly:
   - target path and mode (fresh / repair)
   - what was created: counts by area (templates, shared files, skills), plus anything skipped and why
   - Kanon status: installed / manifest only / CLI missing / catalog unreachable
   - verify result (pass count; any WARN and what you decided)
   - the publish flow's report: commit, GitHub repo URL, Evo app URL and who can see it, or what was skipped
4. **Next step.** Tell the user to open Claude Code *in the new repo* (`cd <target> && claude`), because project skills are discovered from the session's working directory, and run `/onboard-client` with the SOW, proposal, and any client context attached. It customizes the dashboard and republishes through `/publish`. If they shared client facts during this run, repeat them back so they can include them in that step.

## Asking

Use the `AskUserQuestion` tool. In the normal fresh-mode path, there are at most **two calls**. The first asks `Kanon` and `Publish`. The second, only if the `Publish` answer includes GitHub or Evo, asks whichever of `GitHub repo` and `Evo access` apply:

| Header | Options |
|---|---|
| `Kanon` | `Install now` (say in the description that it registers a marketplace in the global `~/.claude/settings.json`) · `Skip for now` |
| `Publish` | `Commit, GitHub, and Evo` (the full publish flow) · `Commit and Evo` (no GitHub yet) · `Commit only` · `Leave uncommitted` |
| `GitHub repo` | `Private, under <gh user>` · `Private, under caylent org` (get the user from `gh api user --jq .login`) |
| `Evo access` | `Just me` · `Specific people` · `My department` · `Everyone at Caylent` (never pre-select company-wide) |

Collision and drift questions (Phases 1 and 4) come up only when those situations do. Never ask for client information in this skill.

## Guardrails

- **Client-agnostic.** No client names, facts, or guesses in any file. The "Not onboarded yet" banners stay until `/onboard-client` replaces them.
- **Non-destructive.** Never overwrite, delete, or `--force-skills` without an explicit yes. Move stubs aside rather than deleting them.
- **Never scaffold into the template repo.**
- **Deterministic.** Files come from `scaffold.sh`, so two workspaces initialized from the same template commit are identical apart from rendered placeholders.
- **No external side effects without consent:** `kanon install`, and everything in the publish flow (`gh repo create`, `git push`, the Evo app and its access). All of it goes through the publish skill's rules: never force-push, never publish past a preflight FAIL.

## Maintaining the template

Everything a new workspace gets is controlled from this skill folder and the template repo:

| To change... | Edit |
|---|---|
| Which skills ship | Add or remove the name in `manifests/skills.txt`. The skill folder itself lives in the template repo's `.claude/skills/`. |
| A scaffold doc (README, CLAUDE.md, section READMEs, context stubs, dotfiles) | `templates/`. Path components named `dot-<x>` become `.<x>`, and a trailing `.tmpl` is dropped (`CLAUDE.md.tmpl`, so the template's CLAUDE.md never loads as memory in the template repo). |
| Generic toolkit files (role context, quality rules) | the file in the template repo root, listed in `manifests/shared-files.txt` |
| The site dashboard | `templates/site/` (engine, `workspace.config.js` defaults), `templates/scripts/` (index and Evo builders), `templates/index.html`. Keep `templates/site/help.js`'s skill list in step with `manifests/skills.txt` (verify warns). |
| What `/onboard-client` fills in | the marker blocks in `templates/`. The contract between the two skills is in `.claude/skills/onboard-client/references/marker-contract.md`, so keep both sides in sync. |

Commit template changes in the template repo. Workspaces record the template commit they came from (`context/engagement-profile.md` frontmatter), so a later repair run can tell what changed.

## Installation

The skill's source of truth is the template repo. To make `/initialize` available from any directory, link it into your personal skills:

```bash
ln -s "<template-repo>/.claude/skills/initialize" ~/.claude/skills/initialize
```

Claude Code follows the symlink, and `${CLAUDE_SKILL_DIR}` resolves to the real path, so the template repo is always found. `/onboard-client` doesn't need this, because `/initialize` copies it into every workspace.
