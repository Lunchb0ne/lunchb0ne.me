"use client";

import { motion } from "framer-motion";
import ArrowDown from "lucide-react/dist/esm/icons/arrow-down";

const CONFIG = {
  TEXT: {
    SCROLL_INDICATOR: "Scroll",
  },
} as const;

export const ScrollIndicator = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-12 z-50 flex justify-center">
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      className="flex flex-col items-center gap-2 text-white/30"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{CONFIG.TEXT.SCROLL_INDICATOR}</span>
      <ArrowDown className="h-4 w-4" />
    </motion.div>
  </div>
);
