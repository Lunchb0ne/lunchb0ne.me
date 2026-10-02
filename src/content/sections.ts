// Single source of truth for page sections: order, anchor id, nav label and header title.
// Navigation, section headers and active-link tracking all derive from this list.
export const SECTIONS = [
  { id: "about", navLabel: "About", title: "About" },
  { id: "experience", navLabel: "Experience", title: "Experience" },
  { id: "projects", navLabel: "Work", title: "Selected Work" },
  { id: "skills", navLabel: "Toolbox", title: "Toolbox" },
  { id: "contact", navLabel: "Contact", title: null },
] as const;

type Section = (typeof SECTIONS)[number];
type TitledSection = Extract<Section, { title: string }>;

export type SectionId = Section["id"];

export const SECTION_IDS: readonly SectionId[] = SECTIONS.map((section) => section.id);

export const SECTION_TITLES = Object.fromEntries(
  SECTIONS.filter((section): section is TitledSection => section.title !== null).map((section) => [
    section.id,
    section.title,
  ]),
) as { [S in TitledSection as S["id"]]: S["title"] };
