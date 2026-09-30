#!/usr/bin/env bash
# scaffold.sh — lay down a client-agnostic engagement workspace.
#
# Usage: scaffold.sh [--dry-run] [--force-skills[=a,b]] <target-dir>
#
#   --dry-run            Print what would happen; write nothing.
#   --force-skills       Replace every skill folder that already exists in the target with the
#                        template's copy. Without it, existing skill folders are left alone.
#   --force-skills=a,b   Replace only the named skills (keeps local edits to the others).
#
# Sources (all resolved from this script's physical location, so it works through a
# ~/.claude/skills symlink):
#   templates/              -> engagement-agnostic structure docs, rendered with {{PLACEHOLDERS}}
#   manifests/skills.txt    -> skill folders copied from the template repo's .claude/skills/
#   manifests/shared-files.txt -> generic toolkit files copied verbatim from the template repo root
#
# Never overwrites an existing file. Re-running is safe: it only fills in what's missing.

set -euo pipefail

DRY_RUN=0
FORCE_SKILLS=0
FORCE_LIST=""
TARGET=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    --force-skills) FORCE_SKILLS=1 ;;
    --force-skills=*) FORCE_SKILLS=1; FORCE_LIST=",${1#--force-skills=}," ;;
    -h|--help) sed -n '2,18p' "$0"; exit 0 ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *) TARGET="$1" ;;
  esac
  shift
done

[[ -n "$TARGET" ]] || { echo "usage: scaffold.sh [--dry-run] [--force-skills] <target-dir>" >&2; exit 2; }

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
TEMPLATE_ROOT="$(cd "$SKILL_DIR/../../.." && pwd -P)"
TEMPLATES="$SKILL_DIR/templates"

[[ -d "$TEMPLATE_ROOT/.claude/skills" ]] || { echo "error: template repo not found at $TEMPLATE_ROOT" >&2; exit 1; }

# Resolve the target's physical path (create it first unless this is a dry run).
if [[ -d "$TARGET" ]]; then
  TARGET="$(cd "$TARGET" && pwd -P)"
elif [[ $DRY_RUN -eq 1 ]]; then
  parent="$(cd "$(dirname "$TARGET")" 2>/dev/null && pwd -P)" || { echo "error: parent of $TARGET does not exist" >&2; exit 1; }
  TARGET="$parent/$(basename "$TARGET")"
else
  mkdir -p "$TARGET"
  TARGET="$(cd "$TARGET" && pwd -P)"
fi

# Guard: never scaffold into the template repo or anywhere inside it.
case "$TARGET/" in
  "$TEMPLATE_ROOT/"*)
    echo "error: $TARGET is the template repo (or inside it). Pass a separate target directory." >&2
    exit 3 ;;
esac

# ---- placeholder values ---------------------------------------------------------------
template_commit="$(git -C "$TEMPLATE_ROOT" rev-parse --short HEAD 2>/dev/null || echo unknown)"
if [[ -n "$(git -C "$TEMPLATE_ROOT" status --porcelain 2>/dev/null)" ]]; then
  template_commit="${template_commit}+dirty"
fi
template_repo="$(git -C "$TEMPLATE_ROOT" remote get-url origin 2>/dev/null || echo "$TEMPLATE_ROOT")"
template_repo="${template_repo%.git}"

export TPL_REPO_NAME="$(basename "$TARGET")"
export TPL_DATE="$(date +%Y-%m-%d)"
export TPL_TEMPLATE_COMMIT="$template_commit"
export TPL_TEMPLATE_REPO="$template_repo"
export TPL_CONSULTANT_NAME="$(git config user.name 2>/dev/null || echo 'Consultant')"
export TPL_CONSULTANT_EMAIL="$(git config user.email 2>/dev/null || echo 'unknown')"

render() {  # render <src> <dest>: substitute {{KEY}} with $TPL_KEY; unknown keys are left as-is
  perl -pe 's/\{\{([A-Z_]+)\}\}/exists $ENV{"TPL_$1"} ? $ENV{"TPL_$1"} : "{{$1}}"/ge' "$1" > "$2"
}

created=0; skipped=0; missing=0
say() { printf '%-8s %s\n' "$1" "$2"; }
verb() { [[ $DRY_RUN -eq 1 ]] && echo "WOULD-$1" || echo "$1"; }

# ---- 1. templates ---------------------------------------------------------------------
# Path components named dot-<x> become .<x>, and a trailing .tmpl is dropped. Both keep template
# files (dotfiles, CLAUDE.md) from acting on the template repo itself.
while IFS= read -r -d '' src; do
  rel="${src#"$TEMPLATES"/}"
  dest_rel="$(printf '%s' "$rel" | sed -E 's#(^|/)dot-#\1.#g; s#\.tmpl$##')"
  dest="$TARGET/$dest_rel"
  if [[ -e "$dest" ]]; then
    say SKIP "$dest_rel (exists)"; skipped=$((skipped + 1)); continue
  fi
  say "$(verb CREATE)" "$dest_rel"; created=$((created + 1))
  if [[ $DRY_RUN -eq 0 ]]; then
    mkdir -p "$(dirname "$dest")"
    case "$src" in
      *.png|*.jpg|*.jpeg|*.gif|*.ico|*.pdf|*.woff|*.woff2) cp "$src" "$dest" ;;  # binary: no rendering
      *) render "$src" "$dest" ;;
    esac
  fi
done < <(find "$TEMPLATES" -type f ! -name '.DS_Store' -print0 | sort -z)

# ---- 2. shared toolkit files ----------------------------------------------------------
while IFS= read -r rel; do
  [[ -z "$rel" || "$rel" == \#* ]] && continue
  src="$TEMPLATE_ROOT/$rel"; dest="$TARGET/$rel"
  if [[ ! -f "$src" ]]; then say MISSING "$rel (not in template repo)"; missing=$((missing + 1)); continue; fi
  if [[ -e "$dest" ]]; then say SKIP "$rel (exists)"; skipped=$((skipped + 1)); continue; fi
  say "$(verb COPY)" "$rel"; created=$((created + 1))
  if [[ $DRY_RUN -eq 0 ]]; then mkdir -p "$(dirname "$dest")"; cp "$src" "$dest"; fi
done < "$SKILL_DIR/manifests/shared-files.txt"

# ---- 3. skills library ----------------------------------------------------------------
while IFS= read -r name; do
  name="${name%%#*}"; name="$(echo "$name" | tr -d '[:space:]')"
  [[ -z "$name" ]] && continue
  src="$TEMPLATE_ROOT/.claude/skills/$name"; dest="$TARGET/.claude/skills/$name"
  if [[ ! -f "$src/SKILL.md" ]]; then say MISSING "skill $name (not in template repo)"; missing=$((missing + 1)); continue; fi
  force_this=$FORCE_SKILLS
  [[ -n "$FORCE_LIST" && "$FORCE_LIST" != *",$name,"* ]] && force_this=0
  if [[ -d "$dest" && $force_this -eq 0 ]]; then
    say SKIP "skill $name (exists; --force-skills to replace)"; skipped=$((skipped + 1)); continue
  fi
  action="$( [[ -d "$dest" ]] && echo REPLACE || echo SKILL )"
  say "$(verb "$action")" ".claude/skills/$name"; created=$((created + 1))
  if [[ $DRY_RUN -eq 0 ]]; then
    rm -rf "$dest"; mkdir -p "$(dirname "$dest")"
    cp -R "$src" "$dest"
    find "$dest" -name '.DS_Store' -delete
  fi
done < "$SKILL_DIR/manifests/skills.txt"

# ---- 4. git ---------------------------------------------------------------------------
if [[ ! -d "$TARGET/.git" ]]; then
  if git -C "$TARGET" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    say WARN "target is inside another git work tree ($(git -C "$TARGET" rev-parse --show-toplevel)); not running git init"
  else
    say "$(verb GIT)" "git init -b main"
    [[ $DRY_RUN -eq 0 ]] && git -C "$TARGET" init -q -b main
  fi
fi

echo
echo "target:          $TARGET"
echo "template repo:   $TEMPLATE_ROOT ($TPL_TEMPLATE_COMMIT)"
echo "created/copied:  $created    skipped (already present): $skipped"
[[ $DRY_RUN -eq 1 ]] && echo "(dry run — nothing written)"
if [[ $missing -gt 0 ]]; then
  echo "error: $missing source item(s) missing from the template repo (see MISSING lines)" >&2
  exit 1
fi
exit 0
