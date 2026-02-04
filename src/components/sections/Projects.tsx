import { motion } from "framer-motion";
import { ArrowUpRight, Box, Cpu, Zap } from "lucide-react";
import { Section } from "@/components/ui/Section";

const CONFIG = {
  PROJECTS: [
    {
      title: "OnCall Assistant & SOP Buddy",
      category: "AI / Infrastructure",
      impact: "40% reduction in response time",
      description:
        "Generative AI-powered diagnostic tool for AWS operators to proactively investigate Blue/Green Deployment operational issues. Built using AWS Bedrock and CDK.",
      tech: ["Python", "TypeScript", "AWS Bedrock", "CDK"],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Dedicated Log Volume",
      category: "Database Performance",
      impact: "15% reduction in latency jitter",
      description:
        "Owned end-to-end development for Multi-AZ DB Instances. Improved P99 performance for I/O-intensive production workloads in RDS Aurora.",
      tech: ["Java", "Distributed Systems", "Storage Internals"],
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: "OnFlix Streaming Platform",
      category: "Full Stack",
      impact: "Sub-second metadata tracking",
      description:
        "Architected a full-stack video streaming SPA with real-time metadata tracking using Nuxt.js and Firebase. Delivered a seamless user experience.",
      tech: ["Nuxt.js", "Vue.js", "Firebase", "Vuex"],
      icon: <Box className="w-6 h-6" />,
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
      <Section.Header>System Architecture</Section.Header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONFIG.PROJECTS.map((project) => (
          <motion.article
            key={project.title}
            variants={itemVariants}
            className="relative p-8 border border-white/10 bg-white/2 transition-all duration-500 rounded-2xl flex flex-col justify-between h-[420px] overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl text-cyan-400 transition-all duration-500 border border-white/5">
                  {project.icon}
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 transition-all duration-300" />
              </div>

              <div className="text-xs font-mono text-cyan-400/60 mb-3 uppercase tracking-widest relative z-10">
                {project.category}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white transition-colors relative z-10">{project.title}</h3>
              <div className="text-xs font-bold text-green-400/80 mb-4 font-mono relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                {project.impact}
              </div>
              <p className="text-white/60 text-sm leading-relaxed relative z-10 mb-6 font-light">{project.description}</p>
            </div>

            {/* Tech Tags */}
            <div className="relative z-10 flex gap-2 flex-wrap content-end">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};
