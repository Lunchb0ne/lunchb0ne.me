import type { Icon } from "@phosphor-icons/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { PROJECTS_CONTENT, SECTION_TITLES } from "@/content";
import { cn } from "@/utils/cn";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ProjectData = {
  title: string;
  category: string;
  role?: string;
  impact?: string;
  stats?: string;
  description: string;
  tech: readonly string[];
  icon: Icon;
  link?: string;
  highlight?: boolean;
};

function MaybeLink({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn("block h-full", className)}>
        {children}
      </a>
    );
  }
  return <div className={cn("h-full", className)}>{children}</div>;
}

function FeaturedCard({ project, isExternal }: { project: ProjectData; isExternal?: boolean }) {
  const Icon = project.icon;
  return (
    <MaybeLink href={isExternal ? project.link : undefined} className="md:row-span-2">
      <motion.div
        variants={itemVariants}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5 p-8 shadow-[0_0_30px_rgba(34,211,238,0.04)] transition-colors hover:border-cyan-500/30 md:p-10"
      >
        <div>
          <div className="mb-8 flex items-start justify-between">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3.5 text-cyan-400 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <Icon className="h-7 w-7" />
            </div>
            {isExternal && (
              <ArrowUpRightIcon className="h-5 w-5 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60" />
            )}
          </div>
          <div className="mb-1.5 font-mono text-white/35 text-xs uppercase tracking-widest">{project.category}</div>
          <h3 className="mb-3 font-bold text-2xl text-white tracking-tight transition-colors group-hover:text-cyan-100 md:text-3xl">
            {project.title}
          </h3>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <span className="text-cyan-400/80">{project.impact ?? project.stats}</span>
          </div>
          <p className="mb-6 max-w-[55ch] font-light text-sm text-white/55 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <Tag key={tag} className="group-hover:border-white/10">
              {tag}
            </Tag>
          ))}
        </div>
      </motion.div>
    </MaybeLink>
  );
}

function CompactCard({ project, isExternal }: { project: ProjectData; isExternal?: boolean }) {
  const Icon = project.icon;
  return (
    <MaybeLink href={isExternal ? project.link : undefined}>
      <motion.div
        variants={itemVariants}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/4"
      >
        <div>
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-lg border border-white/5 bg-white/5 p-2.5 text-white/50 transition-colors duration-300 group-hover:text-cyan-400">
              <Icon className="h-5 w-5" />
            </div>
            {isExternal && (
              <ArrowUpRightIcon className="h-4 w-4 text-white/15 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/50" />
            )}
          </div>
          <h4 className="mb-1.5 font-bold text-white transition-colors group-hover:text-cyan-100">{project.title}</h4>
          <div className="mb-2 font-mono text-xs">
            {project.impact ? (
              <span className="text-cyan-400/60">{project.impact}</span>
            ) : (
              <span className="text-green-400/60">{project.stats}</span>
            )}
          </div>
          <p className="text-sm text-white/45 leading-relaxed">{project.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tag) => (
            <Tag key={tag} className="group-hover:border-white/10">
              {tag}
            </Tag>
          ))}
        </div>
      </motion.div>
    </MaybeLink>
  );
}

function BentoGrid({ projects, isExternal }: { projects: readonly ProjectData[]; isExternal?: boolean }) {
  const featured = projects.find((p) => p.highlight) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <motion.div
      className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr] md:grid-rows-[1fr_1fr]"
      variants={containerVariants}
    >
      <FeaturedCard project={featured} isExternal={isExternal} />
      {rest.map((project) => (
        <CompactCard key={project.title} project={project} isExternal={isExternal} />
      ))}
    </motion.div>
  );
}

export const Projects = () => {
  const SystemsIcon = PROJECTS_CONTENT.systemsHeader.icon;
  const OpenSourceIcon = PROJECTS_CONTENT.openSourceHeader.icon;

  return (
    <>
      <Section.Header>{SECTION_TITLES.projects}</Section.Header>

      <div className="space-y-20">
        <div>
          <h3
            className={cn(
              "mb-8 flex items-center gap-2 font-bold text-sm uppercase tracking-widest",
              PROJECTS_CONTENT.systemsHeader.className,
            )}
          >
            <SystemsIcon className="h-4 w-4" /> {PROJECTS_CONTENT.systemsHeader.title}
          </h3>
          <BentoGrid projects={PROJECTS_CONTENT.systems} />
        </div>

        <div>
          <h3
            className={cn(
              "mb-8 flex items-center gap-2 font-bold text-sm uppercase tracking-widest",
              PROJECTS_CONTENT.openSourceHeader.className,
            )}
          >
            <OpenSourceIcon className="h-4 w-4" /> {PROJECTS_CONTENT.openSourceHeader.title}
          </h3>
          <BentoGrid projects={PROJECTS_CONTENT.openSource} isExternal />
        </div>
      </div>
    </>
  );
};
