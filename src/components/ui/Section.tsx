import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const Section = ({ children, className = "", id, delay = 0 }: SectionProps) => {
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
            duration: 0.6,
            delay,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
        },
        hidden: { opacity: 0, y: 20 },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
