import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  maxWidth?: "4xl" | "6xl";
}

export const Section = ({ children, className = "", id, delay = 0, maxWidth = "6xl" }: SectionProps) => {
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
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : delay,
            ease: "easeOut",
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
        hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
      }}
      className={cn("relative z-10 bg-surface px-8 py-32", className)}
    >
      <div className={cn(maxWidthClass, "mx-auto")}>{children}</div>
    </motion.section>
  );
};

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className = "" }: HeaderProps) => (
  <div className={cn("mb-16 flex items-baseline gap-4", className)}>
    <h2 className="font-light text-4xl text-white/90 tracking-tighter md:text-5xl">{children}</h2>
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

Section.Header = Header;
