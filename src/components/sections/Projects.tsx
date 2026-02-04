import { motion } from "framer-motion";
import { ArrowUpRight, Box, Cpu, Zap } from "lucide-react";
import { useCursor } from "@/hooks/useCursor";

const PROJECTS = [
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
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Projects = () => {
  const { setCursorType } = useCursor();

  return (
    <div className="bg-[#050505] px-8 py-32 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16">
          <h2 className="text-3xl font-light tracking-tight text-white/90">System Architecture</h2>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className="group relative p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-500 rounded-2xl flex flex-col justify-between h-[420px] overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Gradient Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top highlight border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-950/30 transition-all duration-500 border border-white/5 group-hover:border-cyan-500/20">
                    {project.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <div className="text-xs font-mono text-cyan-400/60 mb-3 uppercase tracking-widest relative z-10">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-100 transition-colors relative z-10">
                  {project.title}
                </h3>
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
                    className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-200/60 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
