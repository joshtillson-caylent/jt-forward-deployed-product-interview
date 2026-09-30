#!/usr/bin/env node
// Builds the single-file Evo bundle: dist/evo/index.html (gitignored).
//
// Evo's CSP only allows scripts from https://app.evo.caylent.com/sdk/ plus inline scripts, so the
// site's separate site/*.js modules are blocked there (a blank page). This script:
//   1. regenerates site/content-index.js (scripts/build-site-index.mjs)
//   2. inlines site/styles.css                          -> <style>
//   3. inlines site/app.js and its import graph         -> one classic <script> (imports/exports stripped)
//   4. embeds every indexed document, plus the engagement profile and team files -> window.__WS_DOCS
//   5. embeds every deck in presentations/registry.md   -> window.__WS_DECKS (iframe srcdoc)
//   6. rewrites src="<relative>.png|jpg" into base64 data URIs, since Evo doesn't serve nested asset paths
//
// The source stays build-free for local use. This runs only before publishing (/publish runs it).
// Usage: node scripts/build-evo.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildIndex } from "./build-site-index.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "dist", "evo");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const index = await buildIndex();

// ---- JS: resolve app.js's import graph, emit modules in dependency order ----
const IMPORT_RE = /^import\s+[\s\S]*?\s+from\s+["']([^"']+)["'];?[ \t]*$/gm;
const ordered = [];
const seen = new Set();
function visit(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const src = read(file);
  for (const [, spec] of src.matchAll(IMPORT_RE)) visit(relative(ROOT, resolve(ROOT, dirname(file), spec)));
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

// ---- Docs + decks, embedded as JSON (< escaped so nothing can close the script tag) ----
const docPaths = new Set(Object.values(index.folders).flat().map((d) => d.path));
for (const p of ["context/engagement-profile.md", "context/engagement-team.md"]) if (existsSync(join(ROOT, p))) docPaths.add(p);
const docs = Object.fromEntries([...docPaths].sort().map((p) => [p, read(p)]));
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg" };
const IMG_SRC_RE = /src="([\w./-]+\.(?:png|jpe?g))"/g;
function inlineImages(text, baseDir) {
  return text.replace(IMG_SRC_RE, (match, relPath) => {
    const abs = join(ROOT, baseDir, relPath);
    if (!existsSync(abs)) throw new Error(`Referenced image not found: ${relPath} (resolved to ${abs})`);
    const ext = relPath.split(".").pop().toLowerCase();
    return `src="data:${MIME[ext]};base64,${readFileSync(abs).toString("base64")}"`;
  });
}
const decks = Object.fromEntries(index.decks.map((d) => [d.slug, inlineImages(read(d.path), dirname(d.path))]));

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
    `<script>window.__WS_DOCS = ${json(docs)};\nwindow.__WS_DECKS = ${json(decks)};</script>`,
    `<script>\n(() => {\n"use strict";\n${inlineImages(bundled, ".").replace(/<\/script/gi, "<\\/script")}\n})();\n</script>`,
  ].join("\n"),
);

if (/<script[^>]+src="(?!https:\/\/app\.evo\.caylent\.com\/sdk\/)/.test(html)) {
  throw new Error("Bundle still references an external script outside Evo's SDK path");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "index.html"), html);
console.log(
  `dist/evo/index.html  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB  ` +
    `(${ordered.length} modules, ${Object.keys(docs).length} docs, ${Object.keys(decks).length} decks)`,
);
