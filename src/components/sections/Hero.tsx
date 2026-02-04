"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeScene } from "@/components/visuals/HomeScene";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[100vh] bg-[#050505]">
      {/* Combined Scene */}
      <div className="absolute inset-0 z-0">{mounted && <HomeScene />}</div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Initialize System</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
};
