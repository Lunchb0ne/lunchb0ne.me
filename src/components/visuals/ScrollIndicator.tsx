"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const CONFIG = {
  TEXT: {
    SCROLL_INDICATOR: "Scroll",
  },
} as const;

export const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-12 inset-x-0 flex justify-center z-50 pointer-events-none">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">{CONFIG.TEXT.SCROLL_INDICATOR}</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </div>
  );
};
