import { sectionForFolder } from "../sections.js";
import { esc } from "../util.js";
import { ICONS } from "../icons.js";

// Markdown source comes from window.__WS_DOCS when the Evo bundle embeds it (scripts/build-evo.mjs);
// otherwise it's fetched from the repo, e.g. under a local `python3 -m http.server`.
async function loadMarkdown(path) {
  const embedded = window.__WS_DOCS?.[path];
  if (typeof embedded === "string") return embedded;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

export function renderDoc(mount, path) {
  const section = sectionForFolder(path.split("/")[0]);
  const back = section ? `#/${section.id}` : "#/home";

  mount.innerHTML = `
    <a class="doc-back" href="${back}">${ICONS["arrow-left"]}<span>${esc(section ? section.label : "Home")}</span></a>
    <article class="doc-body"><p class="doc-status">Loading…</p></article>
  `;
  const body = mount.querySelector(".doc-body");

  loadMarkdown(path)
    .then((md) => {
      body.innerHTML = markdownToHtml(md, path);
    })
    .catch((err) => {
      body.innerHTML = `
        <div class="empty-state">
          <h3>This document didn't load</h3>
          <p>${esc(path)} (${esc(err.message)}). Opening the workspace straight from disk blocks
          document loading. Serve the repo over HTTP (python3 -m http.server) or use the published Evo app.</p>
        </div>`;
    });
}

// Resolves a relative link in a doc to an in-app route: other Markdown files open in this reader.
function linkHref(target, docPath) {
  if (/^(https?:|mailto:|#)/.test(target)) return { href: target, external: /^https?:/.test(target) };
  const parts = docPath.split("/").slice(0, -1);
  for (const seg of target.split("#")[0].split("/")) {
    if (seg === "..") parts.pop();
    else if (seg && seg !== ".") parts.push(seg);
  }
  const resolved = parts.join("/");
  return resolved.endsWith(".md") ? { href: `#/doc/${resolved}` } : { href: resolved };
}

// Small Markdown renderer covering what engagement docs use: headings, paragraphs, bullet and
// numbered lists, tables, fenced code, rules, bold, italics, inline code, and links. Frontmatter
// and HTML comments (the onboard-client markers) are dropped. Input is escaped first.
function inline(text, docPath) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/(^|[\s(])_([^_\s][^_]*)_(?=[\s).,;:]|$)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, target) => {
      const { href, external } = linkHref(target.replace(/&amp;/g, "&"), docPath);
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
    })
    .replace(/(^|[\s(])(https?:\/\/[^\s)<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
}

function tableHtml(rows, docPath) {
  const cells = (row) => row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const [head, , ...body] = rows;
  return `<div class="doc-table"><table><thead><tr>${cells(head).map((c) => `<th>${inline(c, docPath)}</th>`).join("")}</tr></thead>
    <tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c, docPath)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

export function markdownToHtml(md, docPath = "") {
  const lines = md
    .replace(/\r\n/g, "\n")
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/<!--[\s\S]*?-->\n?/g, "")
    .split("\n");
  const out = [];
  let para = [];
  let list = null; // { tag, items }

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "), docPath)}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join("")}</${list.tag}>`);
    list = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);

    if (/^\s*```/.test(line)) {
      flushPara();
      flushList();
      const code = [];
      while (++i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i]);
      out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
    } else if (!line.trim()) {
      flushPara();
      flushList();
    } else if (heading) {
      flushPara();
      flushList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2], docPath)}</h${level}>`);
    } else if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || "")) {
      flushPara();
      flushList();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      i--;
      out.push(tableHtml(rows, docPath));
    } else if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      flushPara();
      flushList();
      out.push("<hr>");
    } else if (bullet || numbered) {
      flushPara();
      const tag = bullet ? "ul" : "ol";
      if (list && list.tag !== tag) flushList();
      if (!list) list = { tag, items: [] };
      const text = (bullet || numbered)[1].replace(/^\[ \]\s*/, "☐ ").replace(/^\[x\]\s*/i, "☑ ");
      list.items.push(inline(text, docPath));
    } else if (list && /^\s{2,}\S/.test(line)) {
      list.items[list.items.length - 1] += " " + inline(line.trim(), docPath);
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return out.join("\n");
}
