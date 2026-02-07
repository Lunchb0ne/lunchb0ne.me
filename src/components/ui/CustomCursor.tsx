import { useEffect, useRef } from "react";
import { useCursorPosition, useCursorTrailPosition, useCursorType } from "@/hooks/useCursor";

const CURSOR_STYLES = {
  default: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
  hover: {
    width: 28,
    height: 28,
    borderRadius: "50%",
  },
  text: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  hidden: {
    width: 0,
    height: 0,
    borderRadius: "50%",
  },
} as const;

// Subtle spring-like easing with slight overshoot
const CURSOR_TRANSITION =
  "width 200ms cubic-bezier(0.34, 1.56, 0.64, 1), height 200ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease-out";

export const CustomCursor = () => {
  const cursorType = useCursorType();
  const positionRef = useCursorPosition();
  const trailPositionRef = useCursorTrailPosition();
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const style = CURSOR_STYLES[cursorType];
  const isHover = cursorType === "hover";

  useEffect(() => {
    if (cursorType === "hidden") {
      return undefined;
    }

    let frameId = 0;

    const update = () => {
      const trailEl = trailRef.current;
      const dotEl = dotRef.current;
      const trailPosition = trailPositionRef.current;
      const position = positionRef.current;

      if (trailEl) {
        trailEl.style.transform = `translate(${trailPosition.x - style.width / 2}px, ${trailPosition.y - style.height / 2}px)`;
      }

      if (dotEl) {
        dotEl.style.transform = `translate(${position.x - 2}px, ${position.y - 2}px)`;
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [cursorType, positionRef, trailPositionRef, style.height, style.width]);

  if (cursorType === "hidden") {
    return null;
  }

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-9999"
        style={{
          transform: "translate(-100px, -100px)",
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isHover
            ? "0 0 12px rgba(34, 211, 238, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.05)"
            : "inset 0 0 10px rgba(255, 255, 255, 0.05)",
          transition: CURSOR_TRANSITION,
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-9999"
        style={{
          transform: "translate(-100px, -100px)",
          width: 4,
          height: 4,
          borderRadius: "999px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 0 6px rgba(255, 255, 255, 0.6)",
        }}
      />
    </>
  );
};
