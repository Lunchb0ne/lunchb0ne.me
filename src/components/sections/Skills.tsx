import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { SECTION_TITLES, SKILLS_CONTENT } from "@/content";

export const Skills = () => (
  <>
    <Section.Header>{SECTION_TITLES.skills}</Section.Header>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(SKILLS_CONTENT).map(([category, items]) => (
        <div key={category} className="space-y-6">
          <h3 className="font-mono text-cyan-400/80 text-sm uppercase tracking-widest">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Tag
                key={item}
                className="border-white/10 px-3 py-1.5 text-sm text-white/70 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10 hover:text-white"
              >
                {item}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);
