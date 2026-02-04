import { motion } from "framer-motion";
import { createContext, type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  maxWidth?: "4xl" | "6xl";
}

const SectionContext = createContext<{ delay: number } | null>(null);

export const Section = ({ children, className = "", id, delay = 0, maxWidth = "6xl" }: SectionProps) => {
  const maxWidthClass = maxWidth === "4xl" ? "max-w-4xl" : "max-w-6xl";

  return (
    <SectionContext.Provider value={{ delay }}>
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
              duration: 0.6,
              delay,
              ease: "easeOut",
              staggerChildren: 0.1,
            },
          },
          hidden: { opacity: 0, y: 20 },
        }}
        className={`relative z-10 bg-[#050505] px-8 py-32 ${className}`}
      >
        <div className={`${maxWidthClass} mx-auto`}>{children}</div>
      </motion.section>
    </SectionContext.Provider>
  );
};

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className = "" }: HeaderProps) => {
  return (
    <div className={`flex items-baseline gap-4 mb-16 ${className}`}>
      <h2 className="text-3xl font-light tracking-tight text-white/90">{children}</h2>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
};

Section.Header = Header;
