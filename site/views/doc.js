import { esc } from "../util.js";
import { ICONS } from "../icons.js";

const SECTION_LABELS = {
  "case-file": "Case File",
  discovery: "Discovery",
  research: "Research",
  deliverables: "Deliverables",
};

// Markdown source comes from window.__MERIDIAN_DOCS when the Evo bundle embeds it
// (scripts/build-evo.mjs); otherwise it's fetched from the repo, e.g. under a local server.
async function loadMarkdown(path) {
  const embedded = window.__MERIDIAN_DOCS?.[path];
  if (typeof embedded === "string") return embedded;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

export function renderDoc(mount, path) {
  const section = path.split("/")[0];
  const label = SECTION_LABELS[section] || "Home";
  const back = SECTION_LABELS[section] ? `#/${section}` : "#/home";

  mount.innerHTML = `
    <a class="doc-back" href="${back}">${ICONS["arrow-left"]}<span>${esc(label)}</span></a>
    <article class="doc-body"><p class="doc-status">Loading…</p></article>
  `;
  const body = mount.querySelector(".doc-body");

  loadMarkdown(path)
    .then((md) => {
      body.innerHTML = markdownToHtml(md);
    })
    .catch((err) => {
      body.innerHTML = `
        <div class="empty-state">
          <h3>This document didn't load</h3>
          <p>${esc(path)} (${esc(err.message)}). Opening the workspace from a local file blocks
          document loading; serve the repo over HTTP or use the published Evo app.</p>
        </div>`;
    });
}

// Small Markdown renderer covering what this repo's docs use: headings, paragraphs, bullet and
// numbered lists, tables, rules, bold, italics, inline code, and links. Input is escaped first.
function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s(])(https?:\/\/[^\s)<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
}

function tableHtml(rows) {
  const cells = (row) => row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const [head, , ...body] = rows;
  return `<div class="doc-table"><table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>
    <tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

export function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let para = [];
  let list = null; // { tag, items }

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
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

    if (!line.trim()) {
      flushPara();
      flushList();
    } else if (heading) {
      flushPara();
      flushList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || "")) {
      flushPara();
      flushList();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      i--;
      out.push(tableHtml(rows));
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
      list.items.push(inline(text));
    } else if (list && /^\s{2,}\S/.test(line)) {
      list.items[list.items.length - 1] += " " + inline(line.trim());
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return out.join("\n");
}
