import { motion } from "framer-motion";
import { Layers, Server } from "lucide-react";

const CONFIG = {
  EXPERIENCE: [
    {
      role: "Software Development Engineer II",
      company: "AWS (Aurora Control Plane)",
      period: "Sep 2022 — Present",
      description: [
        "Designed and implemented critical components for RDS Blue/Green Deployments, reducing database upgrade downtime from hours to under a minute.",
        "Owned end-to-end development of Dedicated Log Volume feature for Multi-AZ DB instances, reducing write latency jitter by 15%.",
        "Led Cellularization initiative for Blue/Green Deployments service, restructuring deployment architecture for fault tolerance.",
        "Architected and delivered Region Build Automation for 6 AWS regions, reducing initial service build time from 30+ days to 7 days.",
      ],
      tech: ["Java", "Go", "Distributed Systems", "CDK"],
      icon: <Server className="w-5 h-5 text-cyan-400" />,
    },
    {
      role: "Full Stack Development Intern",
      company: "UXCrafters",
      period: "May 2021 — July 2021",
      description: [
        "Developed and deployed a Full-stack E-Commerce platform using Next.js, Strapi CMS, and AWS services.",
        "Delivered project 2 weeks ahead of schedule with payment processing and inventory management.",
      ],
      tech: ["Next.js", "Strapi", "AWS", "Stripe"],
      icon: <Layers className="w-5 h-5 text-pink-400" />,
    },
  ],
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const Experience = () => {
  return (
    <div className="relative z-10 bg-[#050505] px-8 py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16">
          <h2 className="text-3xl font-light tracking-tight text-white/90">Engineering Log</h2>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-12">
          {CONFIG.EXPERIENCE.map((exp) => (
            <motion.div
              key={exp.role}
              variants={itemVariants}
              className="group relative pl-8 border-l border-white/10 hover:border-cyan-500/50 transition-colors duration-500"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#050505] border border-white/30 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-3">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-white/40">{exp.period}</span>
              </div>

              <div className="text-sm font-mono text-cyan-200/60 mb-4 uppercase tracking-wider">{exp.company}</div>

              <ul className="space-y-2 mb-6">
                {exp.description.map((item) => (
                  <li key={item} className="text-white/60 text-sm leading-relaxed max-w-3xl flex items-start gap-3">
                    <span className="text-cyan-500/50 mt-1.5 font-mono text-[10px]">&gt;</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 flex-wrap">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-white/40 border border-white/5 group-hover:border-white/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
