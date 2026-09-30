#!/usr/bin/env python3
"""Read and fill the onboard-client marker blocks that /initialize lays down in a workspace:
  Markdown:   <!-- onboard-client:begin KEY --> ... <!-- onboard-client:end KEY -->
  JavaScript: // onboard-client:begin KEY        ... // onboard-client:end KEY   (site/workspace.config.js)

Usage:
  blocks.py list <repo-root>                      # every block, with filled / UNFILLED status
  blocks.py show <file> <key>                     # print a block's current content
  blocks.py fill <file> <key> <content-file|->    # replace a block's content (markers are kept)

A block counts as UNFILLED while it still holds /initialize's default content (marked with the
`<!-- onboard-client:default -->` sentinel, or one of the banner phrases in UNFILLED_HINTS), or is
empty where emptiness isn't allowed. Filling a block replaces its whole body, sentinel included.
Exit status of `list` is 1 if any required block is unfilled, so it doubles as a check.
"""
import pathlib
import re
import sys

BLOCK_RE = re.compile(
    r"(^[ \t]*(?:<!--|//) onboard-client:begin (?P<key>[a-z0-9-]+)(?: -->)?[ \t]*\n)"
    r"(?P<body>.*?)"
    r"(^[ \t]*(?:<!--|//) onboard-client:end (?P=key)(?: -->)?)",
    re.S | re.M,
)
UNFILLED_HINTS = ("onboard-client:default", "Not onboarded yet", "_Filled by `/onboard-client`", "_Empty until `/onboard-client`")
# Blocks that may legitimately stay empty (only used when an engagement-type overlay adds content).
MAY_BE_EMPTY = {"claude-directories", "readme-layout-extras"}
SKIP_DIRS = {".git", ".claude", ".packages", "node_modules", "dist"}


def iter_md(root: pathlib.Path):
    """Markdown files plus the site config: every file that can carry marker blocks."""
    files = sorted(root.rglob("*.md")) + sorted(root.glob("site/*.js"))
    for p in files:
        if not any(part in SKIP_DIRS for part in p.relative_to(root).parts):
            yield p


def status(key: str, body: str) -> str:
    if any(h in body for h in UNFILLED_HINTS):
        return "UNFILLED"
    if not body.strip():
        return "empty (ok)" if key in MAY_BE_EMPTY else "UNFILLED"
    return "filled"


def cmd_list(root: str) -> int:
    root_p = pathlib.Path(root).resolve()
    bad = 0
    for p in iter_md(root_p):
        for m in BLOCK_RE.finditer(p.read_text()):
            s = status(m["key"], m["body"])
            bad += s == "UNFILLED"
            print(f"{s:<11} {p.relative_to(root_p)} :: {m['key']}")
    return 1 if bad else 0


def find(text: str, key: str):
    for m in BLOCK_RE.finditer(text):
        if m["key"] == key:
            return m
    return None


def cmd_show(file: str, key: str) -> int:
    m = find(pathlib.Path(file).read_text(), key)
    if not m:
        print(f"no block '{key}' in {file}", file=sys.stderr)
        return 2
    sys.stdout.write(m["body"])
    return 0


def cmd_fill(file: str, key: str, src: str) -> int:
    path = pathlib.Path(file)
    text = path.read_text()
    m = find(text, key)
    if not m:
        print(f"no block '{key}' in {file}", file=sys.stderr)
        return 2
    body = sys.stdin.read() if src == "-" else pathlib.Path(src).read_text()
    if body and not body.endswith("\n"):
        body += "\n"
    path.write_text(text[: m.start("body")] + body + text[m.end("body") :])
    print(f"filled {file} :: {key} ({len(body.splitlines())} lines)")
    return 0


def main(argv):
    if len(argv) >= 2 and argv[1] == "list" and len(argv) == 3:
        return cmd_list(argv[2])
    if len(argv) == 4 and argv[1] == "show":
        return cmd_show(argv[2], argv[3])
    if len(argv) == 5 and argv[1] == "fill":
        return cmd_fill(argv[2], argv[3], argv[4])
    print(__doc__, file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv))
