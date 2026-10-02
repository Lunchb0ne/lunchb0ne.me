import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { CONFIG, HERO_TAGLINE_INTERVAL_MS, TAGLINES } from "@/components/visuals/config";

// Plain DOM so it's in the prerendered HTML and paints before the 3D scene loads.
// 79.6% matches where it sat when it was rendered inside the 3D scene.
// TextMorph never wraps, so the size scales with the viewport to keep each tagline on one line.
export const HeroTagline = () => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % TAGLINES.length), HERO_TAGLINE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[79.6%] z-10 flex -translate-y-1/2 justify-center px-[5vw]">
      <div
        className="flex min-h-[3em] max-w-150 items-center justify-center text-balance text-center font-['JetBrains_Mono',monospace] font-bold text-[clamp(0.75rem,3.4vw,1rem)] leading-[1.4] tracking-wider opacity-90 sm:tracking-widest"
        style={{ color: CONFIG.COLORS.GLOW, textShadow: `0 0 15px ${CONFIG.COLORS.GLOW}33` }}
      >
        <TextMorph duration={600}>{TAGLINES[index]}</TextMorph>
      </div>
    </div>
  );
};
