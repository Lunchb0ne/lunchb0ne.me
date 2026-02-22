import { useRef } from "react";
import { useCursorPosition, useCursorType, useHasFinePointer, useTrailSubscribe } from "@/hooks/useCursor";

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
  const hasFinePointer = useHasFinePointer();
  const positionRef = useCursorPosition();
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef(CURSOR_STYLES[cursorType]);
  styleRef.current = CURSOR_STYLES[cursorType];

  // Synchronized updates for both trail and dot via shared subscriber
  useTrailSubscribe((pos) => {
    const trailEl = trailRef.current;
    const dotEl = dotRef.current;
    const style = styleRef.current;

    if (trailEl) {
      trailEl.style.transform = `translate(${pos.x - style.width / 2}px, ${pos.y - style.height / 2}px)`;
    }

    if (dotEl) {
      const rawPos = positionRef.current;
      dotEl.style.transform = `translate(${rawPos.x - 2}px, ${rawPos.y - 2}px)`;
    }
  });

  if (!hasFinePointer || cursorType === "hidden") {
    return null;
  }

  const style = CURSOR_STYLES[cursorType];
  const isHover = cursorType === "hover";

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
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: isHover ? "0 0 15px rgba(34, 211, 238, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.02)" : "none",
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
