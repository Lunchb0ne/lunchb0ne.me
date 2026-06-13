// Single source of truth for page sections: order, anchor id, nav label, and
// section header title. Nav, headers, and active-link tracking all derive from
// this list so a copy change only happens in one place.
export const SECTIONS = [
  { id: "about", navLabel: "About", title: "About" },
  { id: "experience", navLabel: "Exp.", title: "Experience" },
  { id: "projects", navLabel: "Built", title: "Things I've Built" },
  { id: "skills", navLabel: "Toolbox", title: "Toolbox" },
  { id: "contact", navLabel: "Contact", title: null },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

// Stable, module-level array of ids for scroll/observer tracking.
export const SECTION_IDS = SECTIONS.map((s) => s.id);

// Back-compat map used by section components: { about: "About", ... }.
// Sections with a null title (e.g. contact) render no header and are excluded.
type TitledSection = Extract<(typeof SECTIONS)[number], { title: string }>;
export const SECTION_TITLES = Object.fromEntries(
  SECTIONS.filter((s): s is TitledSection => s.title !== null).map((s) => [s.id, s.title]),
) as Record<TitledSection["id"], string>;
