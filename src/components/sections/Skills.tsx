import { Section } from "@/components/ui/Section";

const CONFIG = {
  SKILLS: {
    Languages: ["Java", "Go", "TypeScript", "Python", "Ruby", "SQL"],
    Infrastructure: ["AWS CDK", "Kubernetes", "Docker", "Terraform", "Serverless"],
    "Web & UI": ["React", "Next.js", "TailwindCSS", "Three.js", "Framer Motion"],
    "Databases & Tools": ["PostgreSQL", "MySQL", "Redis", "Kafka", "Git"],
  },
} as const;

export const Skills = () => {
  return (
    <>
      <Section.Header>Technical Arsenal</Section.Header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(CONFIG.SKILLS).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-sm font-mono text-cyan-400/80 uppercase tracking-widest">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-cyan-500/30 hover:text-white transition-all duration-300 cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
