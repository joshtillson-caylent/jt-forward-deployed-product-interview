#!/usr/bin/env bash
# verify.sh — check that a workspace matches what /initialize is supposed to produce.
#
# Usage: verify.sh <target-dir>
#
# Prints PASS / WARN / FAIL lines and exits 1 if any FAIL. WARN items (skill drift, template
# skills not in the manifest) need a human decision, not a fix.

set -uo pipefail

TARGET="${1:?usage: verify.sh <target-dir>}"
TARGET="$(cd "$TARGET" && pwd -P)"
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
TEMPLATE_ROOT="$(cd "$SKILL_DIR/../../.." && pwd -P)"
TEMPLATES="$SKILL_DIR/templates"

fails=0; warns=0
pass() { printf 'PASS  %s\n' "$1"; }
warn() { printf 'WARN  %s\n' "$1"; warns=$((warns + 1)); }
fail() { printf 'FAIL  %s\n' "$1"; fails=$((fails + 1)); }

# 1. Every template file and shared file exists in the target.
missing=0
while IFS= read -r -d '' src; do
  rel="${src#"$TEMPLATES"/}"
  dest_rel="$(printf '%s' "$rel" | sed -E 's#(^|/)dot-#\1.#g; s#\.tmpl$##')"
  [[ -f "$TARGET/$dest_rel" ]] || { fail "missing $dest_rel"; missing=$((missing + 1)); }
done < <(find "$TEMPLATES" -type f ! -name '.DS_Store' -print0)
while IFS= read -r rel; do
  [[ -z "$rel" || "$rel" == \#* ]] && continue
  [[ -f "$TARGET/$rel" ]] || { fail "missing $rel"; missing=$((missing + 1)); }
done < "$SKILL_DIR/manifests/shared-files.txt"
[[ $missing -eq 0 ]] && pass "all template and shared files present"

# 2. No unrendered {{PLACEHOLDERS}} left in scaffolded Markdown / dotfiles.
left="$(grep -rlE '\{\{[A-Z_]+\}\}' "$TARGET" --include='*.md' --include='.gitignore' --include='.kanon' \
  --exclude-dir=.git --exclude-dir=.claude --exclude-dir=.packages 2>/dev/null || true)"
if [[ -n "$left" ]]; then
  while IFS= read -r f; do fail "unrendered placeholder in ${f#"$TARGET"/}"; done <<< "$left"
else
  pass "no unrendered placeholders"
fi

# 3. onboard-client marker blocks are balanced in every file that uses them.
bad=0
while IFS= read -r f; do
  b=$(grep -c 'onboard-client:begin' "$f"); e=$(grep -c 'onboard-client:end' "$f")
  [[ "$b" -eq "$e" ]] || { fail "unbalanced onboard-client markers in ${f#"$TARGET"/} ($b begin / $e end)"; bad=1; }
done < <(grep -rl 'onboard-client:begin' "$TARGET" --include='*.md' --include='*.js' --exclude-dir=.git --exclude-dir=.claude --exclude-dir=dist --exclude-dir=node_modules 2>/dev/null)
[[ $bad -eq 0 ]] && pass "onboard-client marker blocks balanced"

# 4. Engagement profile has a recognized status.
status="$(sed -n 's/^status:[[:space:]]*//p' "$TARGET/context/engagement-profile.md" 2>/dev/null | head -1)"
case "$status" in
  initialized|onboarded) pass "engagement profile status: $status" ;;
  *) fail "engagement profile status is '${status:-missing}' (expected initialized|onboarded)" ;;
esac

# 5. Skills: every manifest skill present; report drift against the template.
while IFS= read -r name; do
  name="${name%%#*}"; name="$(echo "$name" | tr -d '[:space:]')"
  [[ -z "$name" ]] && continue
  dest="$TARGET/.claude/skills/$name"
  if [[ ! -f "$dest/SKILL.md" ]]; then fail "skill $name missing"; continue; fi
  if diff -rq -x '.DS_Store' "$TEMPLATE_ROOT/.claude/skills/$name" "$dest" >/dev/null 2>&1; then
    pass "skill $name matches template"
  else
    warn "skill $name differs from template (resync: scaffold.sh --force-skills=$name <target>, or keep the local edit)"
  fi
done < "$SKILL_DIR/manifests/skills.txt"

for d in "$TEMPLATE_ROOT"/.claude/skills/*/; do
  n="$(basename "$d")"
  [[ "$n" == "initialize" ]] && continue
  grep -qxE "[[:space:]]*$n[[:space:]]*(#.*)?" "$SKILL_DIR/manifests/skills.txt" || \
    warn "template skill '$n' is not in manifests/skills.txt (won't ship to new workspaces)"
done

# 6. .gitignore carries the required patterns.
for p in '.claude/settings.local.json' '.packages/' '.DS_Store'; do
  grep -qxF "$p" "$TARGET/.gitignore" 2>/dev/null || fail ".gitignore missing '$p'"
done
grep -qxF '.packages/' "$TARGET/.gitignore" 2>/dev/null && pass ".gitignore has required patterns"

# 7. .kanon is KEY=VALUE only.
if [[ -f "$TARGET/.kanon" ]]; then
  if grep -vE '^[[:space:]]*($|#|[A-Za-z_][A-Za-z0-9_]*=.*)' "$TARGET/.kanon" >/dev/null; then
    fail ".kanon has lines that aren't KEY=VALUE"
  else
    pass ".kanon is well-formed"
  fi
fi

# 8. CLAUDE.md stays under ~200 lines (Anthropic's guidance for memory files).
lines=$(wc -l < "$TARGET/CLAUDE.md" 2>/dev/null | tr -d " " || echo 0)
if [[ $lines -gt 200 ]]; then warn "CLAUDE.md is $lines lines (keep under ~200)"; else pass "CLAUDE.md is $lines lines"; fi

# 9. Site: every module parses, the help modal lists every shipped skill, and the Evo bundle builds.
if [[ -d "$TARGET/site" ]]; then
  if command -v node >/dev/null; then
    bad=0
    while IFS= read -r f; do
      node --check --input-type=module < "$f" 2>/dev/null || { fail "site module doesn't parse: ${f#"$TARGET"/}"; bad=1; }
    done < <(find "$TARGET/site" -name '*.js' -type f)
    [[ $bad -eq 0 ]] && pass "site modules parse"
    if (cd "$TARGET" && node scripts/build-evo.mjs >/dev/null 2>&1); then pass "Evo bundle builds (dist/evo/index.html)"; else fail "node scripts/build-evo.mjs failed"; fi
  else
    warn "node not installed: skipped site checks"
  fi
  while IFS= read -r name; do
    name="${name%%#*}"; name="$(echo "$name" | tr -d '[:space:]')"
    [[ -z "$name" ]] && continue
    grep -q "cmd: \"/$name\"" "$TARGET/site/help.js" 2>/dev/null || warn "site/help.js doesn't list shipped skill /$name (update templates/site/help.js)"
  done < "$SKILL_DIR/manifests/skills.txt"
fi

# 10. Git repo.
[[ -d "$TARGET/.git" ]] && pass "git repository initialized" || warn "no .git directory in target"

echo
echo "verify: $fails fail, $warns warn"
[[ $fails -eq 0 ]]
