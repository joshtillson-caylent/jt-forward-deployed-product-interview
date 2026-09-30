#!/usr/bin/env bash
# preflight.sh — report whether a workspace is safe to commit, push, and publish.
#
# Usage: preflight.sh <repo-root>
#
# Prints `key: value` facts for the plan, then PASS / WARN / FAIL checks. Exits 1 on any FAIL.
# Read-only apart from `git fetch` (which only updates remote-tracking refs).

set -uo pipefail
ROOT="$(cd "${1:?usage: preflight.sh <repo-root>}" && pwd -P)"
cd "$ROOT" || exit 2

fails=0
pass() { printf 'PASS  %s\n' "$1"; }
warn() { printf 'WARN  %s\n' "$1"; }
fail() { printf 'FAIL  %s\n' "$1"; fails=$((fails + 1)); }

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "FAIL  not a git repository"; exit 1; }

# ---- facts -----------------------------------------------------------------------------
kind="other"
[[ -f context/engagement-profile.md ]] && kind="workspace"
[[ -d .claude/skills/initialize ]] && kind="template"
branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || echo DETACHED)"
remote="$(git remote get-url origin 2>/dev/null || echo none)"
has_head=1; git rev-parse --verify -q HEAD >/dev/null || has_head=0
changes="$(git status --porcelain --untracked-files=all | wc -l | tr -d ' ')"

ahead=0; behind=0; upstream="none"
if [[ "$remote" != none ]]; then
  git fetch --quiet origin 2>/dev/null || warn "git fetch failed (offline or no access); ahead/behind may be stale"
  if upstream="$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)"; then
    read -r behind ahead < <(git rev-list --left-right --count "$upstream...HEAD" 2>/dev/null || echo "0 0")
  else
    upstream="none"
    git rev-parse -q --verify "origin/$branch" >/dev/null && read -r behind ahead < <(git rev-list --left-right --count "origin/$branch...HEAD")
  fi
fi

slug=""; title=""
if [[ -f site/workspace.config.js ]]; then
  slug="$(sed -n 's/^export const EVO = { *slug: *"\([^"]*\)".*/\1/p' site/workspace.config.js | head -1)"
  title="$(sed -n 's/^ *title: *"\([^"]*\)".*/\1/p' site/workspace.config.js | head -1)"
fi
[[ -z "$title" && -f index.html ]] && title="$(sed -n 's:.*<title>\(.*\)</title>.*:\1:p' index.html | head -1)"

echo "root: $ROOT"
echo "kind: $kind"
echo "branch: $branch"
echo "remote: $remote"
echo "upstream: $upstream (ahead $ahead, behind $behind)"
echo "has_commits: $([[ $has_head -eq 1 ]] && echo yes || echo no)"
echo "uncommitted_paths: $changes"
echo "evo_slug: ${slug:-<unset>}"
echo "site_title: ${title:-<unset>}"
echo "last_commit: $(git log -1 --format='%h %s (%an, %ar)' 2>/dev/null || echo none)"
echo

# ---- checks ----------------------------------------------------------------------------
[[ "$branch" == DETACHED ]] && fail "detached HEAD: check out a branch first"
for s in rebase-merge rebase-apply MERGE_HEAD CHERRY_PICK_HEAD; do
  [[ -e "$(git rev-parse --git-path "$s")" ]] && fail "a $s operation is in progress: finish or abort it first"
done
conflicts="$(git diff --name-only --diff-filter=U 2>/dev/null)"
[[ -n "$conflicts" ]] && fail "unresolved merge conflicts: $(echo "$conflicts" | tr '\n' ' ')"
[[ $behind -gt 0 ]] && warn "branch is $behind commit(s) behind $upstream: pull --rebase before pushing"

# Files that would be committed: modified, staged, and untracked-but-not-ignored.
candidates="$( { git diff --name-only HEAD 2>/dev/null || git diff --name-only --cached; git ls-files --others --exclude-standard; } | sort -u)"

# Secrets in anything about to be committed.
SECRET_RE='AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{36,}|xox[abprs]-[A-Za-z0-9-]{10,}|sk-ant-[A-Za-z0-9_-]{20,}|aws_secret_access_key[[:space:]]*[=:]'
hits=""
while IFS= read -r f; do
  [[ -z "$f" || ! -f "$f" ]] && continue
  case "$f" in .env|*.env|.env.*|*.pem|*.p12|*.pfx|*id_rsa*) fail "credential-like file about to be committed: $f"; continue ;; esac
  if grep -EIq "$SECRET_RE" "$f" 2>/dev/null; then hits+="$f "; fi
done <<< "$candidates"
[[ -n "$hits" ]] && fail "possible secrets in: $hits(inspect with: grep -nE '<pattern>' <file>)" || pass "no secret patterns in pending changes"

# Client source documents stay local-only unless the profile says otherwise.
in_git="$(sed -n 's/^source_docs_in_git:[[:space:]]*//p' context/engagement-profile.md 2>/dev/null | head -1)"
tracked_src="$(git ls-files case-file/source 2>/dev/null; echo "$candidates" | grep '^case-file/source/' || true)"
if [[ "$in_git" != "true" && -n "$(echo "$tracked_src" | tr -d '[:space:]')" ]]; then
  fail "case-file/source/ files are tracked or about to be committed, but source_docs_in_git is '${in_git:-unset}'"
else
  pass "client source documents handled per profile (source_docs_in_git: ${in_git:-unset})"
fi

# Large files (GitHub rejects > 100 MB and warns > 50 MB).
while IFS= read -r f; do
  [[ -f "$f" ]] || continue
  size=$(wc -c < "$f" | tr -d ' ')
  [[ $size -gt 52428800 ]] && fail "$f is $((size / 1048576)) MB (GitHub limit territory)"
  [[ $size -gt 10485760 && $size -le 52428800 ]] && warn "$f is $((size / 1048576)) MB"
done <<< "$candidates"

# Evo build prerequisites.
if [[ -f scripts/build-evo.mjs ]]; then
  command -v node >/dev/null && pass "node available for the Evo build" || fail "node not installed: the Evo bundle can't be built"
else
  warn "no scripts/build-evo.mjs: nothing to publish to Evo"
fi

echo
echo "preflight: $fails fail"
[[ $fails -eq 0 ]]
