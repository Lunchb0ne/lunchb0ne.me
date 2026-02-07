import { motion } from "framer-motion";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import type { ComponentType, SVGProps } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PROJECTS_CONTENT, SECTION_TITLES } from "@/content";
import { cn } from "@/utils/cn";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Projects = () => {
  const SystemsIcon = PROJECTS_CONTENT.systemsHeader.icon;
  const OpenSourceIcon = PROJECTS_CONTENT.openSourceHeader.icon;

  return (
    <>
      <Section.Header>{SECTION_TITLES.projects}</Section.Header>

      <div className="space-y-20">
        {/* System Architecture Section */}
        <div>
          <h3
            className={cn(
              "mb-8 flex items-center gap-2 font-bold text-sm uppercase tracking-widest",
              PROJECTS_CONTENT.systemsHeader.className,
            )}
          >
            <SystemsIcon className="h-4 w-4" /> {PROJECTS_CONTENT.systemsHeader.title}
          </h3>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {PROJECTS_CONTENT.systems.map((project) => (
              <ProjectCard key={`sys-${project.title}`} project={project} />
            ))}
          </div>
        </div>

        {/* Open Source Section */}
        <div>
          <h3
            className={cn(
              "mb-8 flex items-center gap-2 font-bold text-sm uppercase tracking-widest",
              PROJECTS_CONTENT.openSourceHeader.className,
            )}
          >
            <OpenSourceIcon className="h-4 w-4" /> {PROJECTS_CONTENT.openSourceHeader.title}
          </h3>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {PROJECTS_CONTENT.openSource.map((project) => (
              <ProjectCard key={`oss-${project.title}`} project={project} isExternal />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function ProjectCard({
  project,
  isExternal,
}: {
  project: {
    title: string;
    category: string;
    role?: string;
    impact?: string;
    stats?: string;
    description: string;
    tech: readonly string[];
    icon: LucideIcon;
    link?: string;
    highlight?: boolean;
  };
  isExternal?: boolean;
}) {
  const Icon = project.icon;
  const CardContent = (
    <motion.article
      variants={itemVariants}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-8 transition-all duration-500",
        project.highlight
          ? "border-cyan-500/20 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
          : "border-white/10 bg-white/2 hover:border-white/20",
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div>
        <div className="relative z-10 mb-6 flex items-start justify-between">
          <div
            className={cn(
              "rounded-xl border p-3 transition-all duration-500",
              project.highlight
                ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                : "border-white/5 bg-white/5 text-white/60 group-hover:text-cyan-400",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          {isExternal ? (
            <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-300 group-hover:text-white/60" />
          ) : (
            <div className="h-5 w-5" />
          )}
        </div>

        <div className="relative z-10 mb-3 font-mono text-white/40 text-xs uppercase tracking-widest">{project.category}</div>
        <h3 className="relative z-10 mb-3 font-bold text-2xl text-white transition-colors group-hover:text-cyan-100">
          {project.title}
        </h3>

        <div className="relative z-10 mb-4 flex items-center gap-2 font-bold font-mono text-xs">
          {project.impact ? (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span className="text-cyan-400/80">{project.impact}</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-green-400/80">{project.stats}</span>
            </>
          )}
        </div>

        <p className="relative z-10 mb-6 font-light text-sm text-white/60 leading-relaxed">{project.description}</p>
      </div>

      {/* Tech Tags */}
      <div className="relative z-10 flex flex-wrap content-end gap-2">
        {project.tech.map((tag: string) => (
          <Tag key={tag} className="group-hover:border-white/10">
            {tag}
          </Tag>
        ))}
      </div>
    </motion.article>
  );

  if (isExternal && project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
