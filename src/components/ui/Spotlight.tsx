import { useRef } from "react";
import { useTrailSubscribe } from "@/hooks/useCursor";

const SPOTLIGHT_STYLE = {
  background:
    "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
} as const;

export const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useTrailSubscribe((pos) => {
    const div = divRef.current;
    if (!div) return;
    div.style.setProperty("--spotlight-x", `${pos.x}px`);
    div.style.setProperty("--spotlight-y", `${pos.y}px`);
    div.style.opacity = pos.x < -50 || pos.y < -50 ? "0" : "1";
  });

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={SPOTLIGHT_STYLE}
    />
  );
};
