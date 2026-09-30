---
name: publish
description: Ship the engagement workspace. Commits the pending changes, pulls and pushes to GitHub (creating the private repo on first publish), then rebuilds the site dashboard and publishes it to Evo as a Caylent App, all after one confirmation of the plan. Runs a preflight first (git state, secret scan, client source documents, build prerequisites) and stops on anything unsafe. Use when the user wants to commit and push their work, share the latest workspace, or publish or update the Evo app. /initialize and /onboard-client hand off to it. Do NOT use to publish anything other than this workspace's own site.
argument-hint: "[workspace path] [commit message]"
---

# Publish the Workspace

Three outward-facing steps, always in this order, so the published app always matches what's on GitHub:

1. **Commit** the pending work (no AI attribution trailer)
2. **Push** it (pull and rebase first, never force)
3. **Publish** the site to Evo (`caylent_apps_publish` plus an S3 upload)

Invoking `/publish` is the go-ahead to run this flow. It isn't a blank check, though. Show the plan once and get one confirmation before the first outward-facing step. Workspace CLAUDE.md files say "don't publish without explicit go-ahead", and that confirmation is the go-ahead.

## Inputs

`$ARGUMENTS` may carry a workspace path (default: the current repo root) and a commit message (default: drafted from the diff). `/initialize` and `/onboard-client` call this flow with a target path and their own commit message.

## Workflow

### Phase 0: Preflight

1. Resolve the workspace root (`git -C <path> rev-parse --show-toplevel`). With no git repo, stop: the workspace should have come from `/initialize`.
2. Run `bash "${CLAUDE_SKILL_DIR}/scripts/preflight.sh" "<root>"`. It prints the facts the plan needs (kind, branch, remote, ahead/behind, Evo slug, title) and then checks.
3. **Any FAIL stops the run.** Report it, and fix it with the user if it's quick. For example, unstage and ignore a leaked `.env` file, or move a client original back under the ignored `case-file/source/`. Don't work around a secret-scan hit. Show the file and line, and let the user decide.
4. `kind: template` is the template repo (the example engagement). Publishing it works the same way, but its site has no `workspace.config.js`. Take its slug from `site/README.md` and its title from `index.html`.

### Phase 1: Plan and one confirmation

Build the plan from preflight and `git status`:

- **Commit:** the changed paths, grouped by top-level folder, and a drafted message in the repo's own style (read `git log -5 --format=%s`): an imperative summary of 72 characters or fewer, plus an optional short body saying *why*. Skip this step if there's nothing to commit.
- **Push:** `origin/<branch>`, noting any pull and rebase needed first. With no remote, say that a GitHub repo will be created (Phase 3).
- **Evo:** the slug (`EVO.slug` in `site/workspace.config.js`; on a first publish, propose the repo name lowercased and hyphenated), the title (`IDENTITY.title`), and a one-sentence description (from `IDENTITY.home.description`).

Ask with `AskUserQuestion`, and batch every question into one call:

| Header | When | Options |
|---|---|---|
| `Publish` | always | `Commit, push, publish` · `Commit and push only` · `Edit commit message` · `Cancel`. On a clean tree that's already pushed, offer `Publish to Evo` · `Cancel`. |
| `GitHub repo` | no remote | `Private, under <gh user>` · `Private, under caylent org` · `Skip GitHub for now` (Evo still publishes, from the local commit) |
| `Evo access` | first publish only | `Just me` · `Specific people` (ask for emails) · `My department` · `Everyone at Caylent` |

Never mark `Everyone at Caylent` as recommended, and never grant access outside Caylent. On `Edit commit message`, take the new message and continue without asking again.

**Branch rule:** Evo publishes from `main` only. On any other branch, the plan is commit → push the branch → offer `gh pr create --fill`, and Evo is skipped. Publish from a branch only if the user explicitly asks for it (a preview), and note it in the report.

### Phase 2: Commit

1. If this is the first Evo publish, write the slug and the expected URL (`https://app.evo.caylent.com/apps/<slug>`) into `EVO` in `site/workspace.config.js` and into `evo_slug` / `evo_url` in the `context/engagement-profile.md` frontmatter (add the keys if they're missing). They go into this commit, so the next person sees where the app lives.
2. If the site exists, run `node scripts/build-site-index.mjs`, so `site/content-index.js` in the commit matches the documents.
3. `git add -A`, then `git status --short` and check that the staged list matches the plan. If anything extra appears, unstage it and ask.
4. `git commit -m "<summary>" [-m "<body>"]`. **No `Co-Authored-By` or other AI trailer:** workspace CLAUDE.md files override the default. Don't use `--no-verify`. If a hook fails, fix the cause, and create a new commit rather than amending.

### Phase 3: Push

- **Remote exists:** if preflight showed the branch behind, run `git pull --rebase`. On conflicts, run `git rebase --abort` to restore the pre-pull state, list the conflicting files, and stop. Conflicts are the user's call. Then `git push -u origin <branch>`. If the push is rejected, pull with rebase once more and retry once. **Never `--force` or `--force-with-lease`**, and never push to a branch other than the current one.
- **No remote, and the user chose a GitHub owner:** `gh auth status` first, then `gh repo create <owner>/<repo-name> --private --source . --remote origin --push`. If the name is taken, propose `<repo-name>-engagement` and confirm.
- **Non-main branch:** push, then offer `gh pr create --fill --base main` and return its URL.

### Phase 4: Publish to Evo

1. `node scripts/build-evo.mjs`. It rebuilds the index and writes `dist/evo/index.html`. A build error stops the run, because the commit and push already happened and a broken app is worse than a stale one.
2. `caylent_apps_publish` with `slug`, `title`, `description`, and `files: [{ "filename": "index.html", "content_type": "text/html" }]`.
   - **403** means the slug belongs to someone else. Propose `<slug>-<your initials>`, confirm it, update `EVO.slug`, and retry. Commit the slug change with the next publish, or as a small follow-up commit (`Record Evo app slug`) if the user wants it pushed now.
3. Upload: `curl -sS -f -X PUT -H "Content-Type: text/html" --upload-file dist/evo/index.html "<upload url>"`. Quote the URL, because presigned URLs contain `&`. A non-zero exit means the app is published but empty or stale, so retry once and report if it fails again.
4. **First publish only:** grant access with `caylent_apps_members` (`action: "add"`, role `viewer`), using `email` for specific people, `department` for a department, and `email: "everyone"` only if that was chosen. Don't change membership on later publishes unless asked.
5. Verify: `caylent_apps_list` shows the slug as published. If the returned `app_url` differs from the URL recorded in Phase 2, update both files and tell the user they need a follow-up commit.

### Phase 5: Report

In a few lines:
- the commit (`<sha> <summary>`), or "nothing to commit"
- the push (`origin/<branch>`), the new repo URL, or the PR URL
- the Evo app URL and who can see it
- anything skipped or failed, and the exact state it left behind (for example, "committed and pushed; Evo upload failed, re-run `/publish` to retry the publish only")

## Guardrails

- **Order is fixed:** commit → push → publish. The app never shows work that isn't on GitHub, except for an explicit branch preview.
- **Stop at the first failure** and say exactly what did and didn't happen. Never leave the user guessing whether something went out.
- **Never force-push**, rewrite pushed history, skip hooks, or amend a commit that's already pushed.
- **Nothing sensitive leaves the machine:** a preflight FAIL is a hard stop. Client source documents stay local unless the profile says `source_docs_in_git: true`.
- **Access is deliberate:** set only on the first publish, from an explicit answer, and never outside Caylent.
- **Only this workspace's site.** Don't publish other HTML through this skill.
