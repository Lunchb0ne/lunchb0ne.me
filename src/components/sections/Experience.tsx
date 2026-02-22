import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { EXPERIENCE_ITEMS, SECTION_TITLES } from "@/content";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const Experience = () => (
  <>
    <Section.Header>{SECTION_TITLES.experience}</Section.Header>

    <motion.div className="space-y-12" variants={containerVariants}>
      {EXPERIENCE_ITEMS.map((exp) => (
        <motion.div
          key={`${exp.company}-${exp.role}`}
          variants={itemVariants}
          className="group relative border-white/10 border-l pl-8 transition-colors duration-500 hover:border-cyan-500/50"
        >
          <div className="absolute top-2 -left-1.25 h-2.5 w-2.5 rounded-full border border-white/30 bg-surface transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

          <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
            <h3 className="flex items-center gap-3 font-bold text-white text-xl transition-colors group-hover:text-cyan-400">
              {exp.role}
            </h3>
            <span className="font-mono text-white/40 text-xs">{exp.period}</span>
          </div>

          <div className="mb-4 font-mono text-cyan-200/60 text-sm uppercase tracking-wider">{exp.company}</div>

          <ul className="mb-6 space-y-2">
            {exp.description.map((item) => (
              <li key={item} className="flex max-w-3xl items-start gap-3 text-sm text-white/60 leading-relaxed">
                <span className="mt-1.5 font-mono text-[10px] text-cyan-500/50">&gt;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <Tag key={t} className="group-hover:border-white/10">
                {t}
              </Tag>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </>
);
