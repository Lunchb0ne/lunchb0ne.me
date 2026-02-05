import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Cpu, Database, GitFork, HardDrive, Layout, Network, Server } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/utils/cn";

const CONFIG = {
  SYSTEMS: [
    {
      title: "Multi-AZ DB Clusters",
      category: "Principal Engineering",
      role: "Architect",
      impact: "Zero data loss failover",
      description:
        "Architected failover detection using a fork of orchestrator/patroni. Implemented Raft consensus for high availability in RDS Three AZ clusters.",
      tech: ["Go", "Raft", "Distributed Systems", "Provenance"],
      icon: <Network className="w-6 h-6" />,
      highlight: true,
    },
    {
      title: "Dedicated Log Volume",
      category: "Database Internals",
      role: "Lead Engineer",
      impact: "15% latency reduction",
      description:
        "Decoupled WAL I/O from data page I/O by offloading to dedicated EBS volumes. Reduced latency jitter significantly for I/O-intensive workloads.",
      tech: ["C++", "Storage Engine", "AWS EBS", "Aurora"],
      icon: <HardDrive className="w-6 h-6" />,
    },
    {
      title: "Control Plane Orchestration",
      category: "Cloud Infrastructure",
      role: "Core Developer",
      impact: "99.99% availability",
      description:
        "End-to-end orchestration for database placement, setup, and self-healing. Managed Data Plane components including SystemRPM and HostManager.",
      tech: ["Java", "Workflow Engines", "HostManager"],
      icon: <Server className="w-6 h-6" />,
    },
  ],
  OPEN_SOURCE: [
    {
      title: "Roo Code",
      category: "AI / Developer Tools",
      stats: "22k+ Stars",
      description:
        "Core contributor to the autonomous coding agent. Implemented AWS Bedrock authentication and various agent skills. Enabling a full dev team in VS Code.",
      tech: ["TypeScript", "LLM", "VS Code API"],
      icon: <Bot className="w-6 h-6" />,
      link: "https://github.com/RooCodeInc/Roo-Code",
      highlight: true,
    },
    {
      title: "Cmder",
      category: "Dev Environment",
      stats: "26k+ Stars",
      description:
        "Maintainer of the portable console emulator for Windows. Improving the terminal experience for millions of developers with better shell integration.",
      tech: ["C++", "PowerShell", "Shell"],
      icon: <Layout className="w-6 h-6" />,
      link: "https://github.com/cmderdev/cmder",
    },
    {
      title: "sql-stress",
      category: "Database Tooling",
      stats: "Performance Tool",
      description:
        "Built a drift-corrected database stress testing tool with a real-time TUI dashboard for identifying performance bottlenecks in PostgreSQL/MySQL.",
      tech: ["Python", "Rich TUI", "PostgreSQL"],
      icon: <Database className="w-6 h-6" />,
      link: "https://github.com/Lunchb0ne/sql-stress",
    },
  ],
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Projects = () => {
  return (
    <>
      <Section.Header>Engineering & Open Source</Section.Header>

      <div className="space-y-20">
        {/* System Architecture Section */}
        <div>
          <h3 className="text-sm font-bold tracking-widest text-cyan-400/60 mb-8 uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4" /> System Architecture & AWS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONFIG.SYSTEMS.map((project) => (
              <ProjectCard key={`sys-${project.title}`} project={project} />
            ))}
          </div>
        </div>

        {/* Open Source Section */}
        <div>
          <h3 className="text-sm font-bold tracking-widest text-green-400/60 mb-8 uppercase flex items-center gap-2">
            <GitFork className="w-4 h-4" /> Open Source Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONFIG.OPEN_SOURCE.map((project) => (
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
    icon: React.ReactNode;
    link?: string;
    highlight?: boolean;
  };
  isExternal?: boolean;
}) {
  const CardContent = (
    <motion.article
      variants={itemVariants}
      className={cn(
        "relative p-8 border transition-all duration-500 rounded-2xl flex flex-col justify-between h-105 overflow-hidden group",
        project.highlight
          ? "bg-white/5 border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
          : "bg-white/2 border-white/10 hover:border-white/20",
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-500 border",
              project.highlight
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                : "bg-white/5 text-white/60 border-white/5 group-hover:text-cyan-400",
            )}
          >
            {project.icon}
          </div>
          {isExternal ? (
            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-all duration-300" />
          ) : (
            <div className="w-5 h-5" />
          )}
        </div>

        <div className="text-xs font-mono text-white/40 mb-3 uppercase tracking-widest relative z-10">{project.category}</div>
        <h3 className="text-2xl font-bold mb-3 text-white transition-colors relative z-10 group-hover:text-cyan-100">
          {project.title}
        </h3>

        <div className="text-xs font-bold mb-4 font-mono relative z-10 flex items-center gap-2">
          {project.impact ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span className="text-cyan-400/80">{project.impact}</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-green-400/80">{project.stats}</span>
            </>
          )}
        </div>

        <p className="text-white/60 text-sm leading-relaxed relative z-10 mb-6 font-light">{project.description}</p>
      </div>

      {/* Tech Tags */}
      <div className="relative z-10 flex gap-2 flex-wrap content-end">
        {project.tech.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5 transition-colors group-hover:border-white/10"
          >
            {tag}
          </span>
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
