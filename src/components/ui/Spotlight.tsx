import { useEffect, useRef } from "react";
import { useCursorTrailPosition } from "@/hooks/useCursor";

const SPOTLIGHT_STYLE = {
  background:
    "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
} as const;

export const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const trailPositionRef = useCursorTrailPosition();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    let frameId = 0;

    const update = () => {
      const { x, y } = trailPositionRef.current;
      div.style.setProperty("--spotlight-x", `${x}px`);
      div.style.setProperty("--spotlight-y", `${y}px`);
      div.style.opacity = x < -50 || y < -50 ? "0" : "1";
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [trailPositionRef]);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={SPOTLIGHT_STYLE}
    />
  );
};
