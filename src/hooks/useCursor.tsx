import type React from "react";
import { createContext, use, useEffect, useRef, useState } from "react";

type CursorType = "default" | "hover" | "text" | "hidden";

interface Position {
  x: number;
  y: number;
}

type PositionRef = React.MutableRefObject<Position>;

const defaultPositionRef = { current: { x: -100, y: -100 } } as PositionRef;

const CursorTypeContext = createContext<CursorType>("default");
const CursorActionsContext = createContext<(type: CursorType) => void>(() => {});
const CursorPositionContext = createContext<PositionRef>(defaultPositionRef);
const CursorTrailPositionContext = createContext<PositionRef>(defaultPositionRef);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const rafRef = useRef<number | null>(null);
  const trailRafRef = useRef<number | null>(null);
  const latestPositionRef = useRef<Position>({ x: -100, y: -100 });
  const trailPositionRef = useRef<Position>({ x: -100, y: -100 });

  useEffect(() => {
    // Standard interactive elements + .group (Tailwind hover pattern) + [data-interactive] for explicit marking
    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .group, [data-interactive]';

    const handleMouseMove = (e: MouseEvent) => {
      latestPositionRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          const { x, y } = latestPositionRef.current;

          // Use elementFromPoint to detect elements regardless of pointer-events inheritance
          const elementUnderCursor = document.elementFromPoint(x, y) as HTMLElement | null;

          // Skip automatic detection for canvas elements - let Three.js handle cursor via onPointerOver/Out
          if (elementUnderCursor?.tagName === "CANVAS") {
            return;
          }

          const isInteractive = elementUnderCursor?.closest(interactiveSelector);
          const nextType: CursorType = isInteractive ? "hover" : "default";

          setCursorType((prev) => (prev === nextType ? prev : nextType));
        });
      }
    };

    const updateTrail = () => {
      const target = latestPositionRef.current;
      const current = trailPositionRef.current;
      const next = {
        x: current.x + (target.x - current.x) * 0.18,
        y: current.y + (target.y - current.y) * 0.18,
      };

      trailPositionRef.current = next;
      trailRafRef.current = window.requestAnimationFrame(updateTrail);
    };

    trailRafRef.current = window.requestAnimationFrame(updateTrail);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (trailRafRef.current !== null) {
        window.cancelAnimationFrame(trailRafRef.current);
        trailRafRef.current = null;
      }
    };
  }, []);

  return (
    <CursorActionsContext.Provider value={setCursorType}>
      <CursorTypeContext.Provider value={cursorType}>
        <CursorPositionContext.Provider value={latestPositionRef}>
          <CursorTrailPositionContext.Provider value={trailPositionRef}>{children}</CursorTrailPositionContext.Provider>
        </CursorPositionContext.Provider>
      </CursorTypeContext.Provider>
    </CursorActionsContext.Provider>
  );
};

export const useCursorType = () => use(CursorTypeContext);
export const useSetCursorType = () => use(CursorActionsContext);
export const useCursorPosition = () => use(CursorPositionContext);
export const useCursorTrailPosition = () => use(CursorTrailPositionContext);

export const useCursor = () => ({
  cursorType: useCursorType(),
  setCursorType: useSetCursorType(),
  position: useCursorPosition(),
  trailPosition: useCursorTrailPosition(),
});
