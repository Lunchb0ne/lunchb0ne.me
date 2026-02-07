import { useEffect, useRef } from "react";

const SPOTLIGHT_STYLE = {
  background:
    "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
} as const;

export const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestPointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestPointRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const div = divRef.current;
        if (!div) return;

        const { x, y } = latestPointRef.current;
        div.style.setProperty("--spotlight-x", `${x}px`);
        div.style.setProperty("--spotlight-y", `${y}px`);
        div.style.opacity = "1";
      });
    };

    const handleMouseLeave = () => {
      if (divRef.current) {
        divRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={SPOTLIGHT_STYLE}
    />
  );
};
