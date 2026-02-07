import { useEffect, useRef } from "react";
import { useCursorTrailPosition } from "@/hooks/useCursor";

const SPOTLIGHT_STYLE = {
  background:
    "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
} as const;

export const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const trailPosition = useCursorTrailPosition();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const { x, y } = trailPosition;
    div.style.setProperty("--spotlight-x", `${x}px`);
    div.style.setProperty("--spotlight-y", `${y}px`);
    div.style.opacity = x < -50 || y < -50 ? "0" : "1";
  }, [trailPosition]);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={SPOTLIGHT_STYLE}
    />
  );
};
