#!/usr/bin/env node
// Builds the single-file Evo bundle: dist/evo/index.html.
//
// Evo's CSP only allows scripts from https://app.evo.caylent.com/sdk/ plus inline scripts, so the
// workspace's separate site/*.js modules are blocked there (a blank page). This script inlines
// everything Evo needs into one file:
//   - site/styles.css                  -> <style>
//   - site/app.js and its imports      -> one inline classic <script> (imports/exports stripped)
//   - case-file/, discovery/, deliverables/ markdown -> window.__MERIDIAN_DOCS
//   - presentations/kickoff-deck/index.html          -> window.__MERIDIAN_DECK (iframe srcdoc)
//
// The source stays build-free for local use; this runs only before publishing.
// Usage: node scripts/build-evo.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "dist", "evo");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---- JS: resolve app.js's import graph, emit modules in dependency order ----
const IMPORT_RE = /^import\s+[\s\S]*?\s+from\s+["']([^"']+)["'];?[ \t]*$/gm;
const ordered = [];
const seen = new Set();
function visit(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const src = read(file);
  for (const [, spec] of src.matchAll(IMPORT_RE)) {
    visit(relative(ROOT, resolve(ROOT, dirname(file), spec)));
  }
  ordered.push({ file, src });
}
visit("site/app.js");

const declared = new Map();
const bundled = ordered
  .map(({ file, src }) => {
    const body = src.replace(IMPORT_RE, "").replace(/^export\s+(?=(async\s+)?function|const|let|class)/gm, "");
    for (const [, name] of body.matchAll(/^(?:async\s+)?(?:function|const|let|class)\s+([A-Za-z_$][\w$]*)/gm)) {
      if (declared.has(name)) throw new Error(`Top-level name "${name}" is declared in both ${declared.get(name)} and ${file}`);
      declared.set(name, file);
    }
    return `// ---- ${file} ----\n${body.trim()}\n`;
  })
  .join("\n");

// ---- Docs + deck, embedded as JSON (< escaped so nothing can close the script tag) ----
function markdownFiles(dir) {
  return readdirSync(join(ROOT, dir)).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(join(ROOT, p)).isDirectory()) return markdownFiles(p);
    return name.endsWith(".md") && name !== "README.md" ? [p] : [];
  });
}
const docs = Object.fromEntries(
  ["case-file", "discovery", "deliverables"].flatMap(markdownFiles).map((p) => [p, read(p)]),
);
const deck = read("presentations/kickoff-deck/index.html");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

// ---- Assemble ----
let html = read("index.html");
const replaceOnce = (needle, replacement) => {
  if (!html.includes(needle)) throw new Error(`index.html is missing: ${needle}`);
  html = html.replace(needle, () => replacement);
};
replaceOnce('<link rel="stylesheet" href="site/styles.css">', `<style>\n${read("site/styles.css")}\n</style>`);
replaceOnce(
  '<script type="module" src="site/app.js"></script>',
  [
    `<script>window.__MERIDIAN_DOCS = ${json(docs)};\nwindow.__MERIDIAN_DECK = ${json(deck)};</script>`,
    `<script>\n(() => {\n"use strict";\n${bundled.replace(/<\/script/gi, "<\\/script")}\n})();\n</script>`,
  ].join("\n"),
);

if (/<script[^>]+src="(?!https:\/\/app\.evo\.caylent\.com\/sdk\/)/.test(html)) {
  throw new Error("Bundle still references an external script outside Evo's SDK path");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "index.html"), html);
console.log(
  `dist/evo/index.html  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB  ` +
    `(${ordered.length} modules, ${Object.keys(docs).length} docs, deck embedded)`,
);
