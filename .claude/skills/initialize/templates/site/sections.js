import { SECTIONS } from "./workspace.config.js";
import { CONTENT_INDEX } from "./content-index.js";

// Sections shown in the sidebar: every non-optional section, plus optional ones (the engagement-level
// overlays) once their folder exists.
export function visibleSections() {
  return SECTIONS.filter((s) => !s.optional || (s.folder && CONTENT_INDEX.folders[s.folder]));
}

export function docsFor(section) {
  return (section.folder && CONTENT_INDEX.folders[section.folder]) || [];
}

export function sectionForFolder(folder) {
  return SECTIONS.find((s) => s.folder === folder) || null;
}
