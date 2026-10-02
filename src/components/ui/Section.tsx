import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { SECTION_IDS, SECTION_TITLES } from "@/content";
import { cn } from "@/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  maxWidth?: "4xl" | "6xl";
}

export const Section = ({ children, className, id, maxWidth = "6xl" }: SectionProps) => {
  const maxWidthClass = maxWidth === "4xl" ? "max-w-4xl" : "max-w-6xl";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: prefersReducedMotion ? 0 : 0.8,
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
        hidden: {
          opacity: prefersReducedMotion ? 1 : 0,
          y: prefersReducedMotion ? 0 : 40,
        },
      }}
      className={cn("relative z-10 bg-surface px-8 py-32", className)}
    >
      <div className={cn(maxWidthClass, "mx-auto")}>{children}</div>
    </motion.section>
  );
};

const Header = ({ id }: { id: keyof typeof SECTION_TITLES }) => (
  <div className="mb-16 flex items-baseline gap-4">
    <span className="font-mono text-cyan-400/60 text-sm tabular-nums">
      {String(SECTION_IDS.indexOf(id) + 1).padStart(2, "0")}
    </span>
    <h2 className="font-light text-4xl text-white/90 tracking-tighter md:text-5xl">{SECTION_TITLES[id]}</h2>
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

Section.Header = Header;
