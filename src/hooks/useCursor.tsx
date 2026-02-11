import type React from "react";
import { createContext, use, useCallback, useEffect, useRef, useState } from "react";

type CursorType = "default" | "hover" | "text" | "hidden";

interface Position {
  x: number;
  y: number;
}

type PositionRef = React.MutableRefObject<Position>;
type TrailSubscriber = (pos: Position) => void;

const defaultPositionRef = { current: { x: -100, y: -100 } } as PositionRef;
const defaultSubscribersRef = {
  current: new Set<TrailSubscriber>(),
} as React.MutableRefObject<Set<TrailSubscriber>>;

const CursorTypeContext = createContext<CursorType>("default");
const CursorActionsContext = createContext<(type: CursorType) => void>(() => {});
const CursorPositionContext = createContext<PositionRef>(defaultPositionRef);
const CursorTrailPositionContext = createContext<PositionRef>(defaultPositionRef);
const TrailSubscribersContext = createContext<React.MutableRefObject<Set<TrailSubscriber>>>(defaultSubscribersRef);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const rafRef = useRef<number | null>(null);
  const trailRafRef = useRef<number | null>(null);
  const latestPositionRef = useRef<Position>({ x: -100, y: -100 });
  const trailPositionRef = useRef<Position>({ x: -100, y: -100 });
  const subscribersRef = useRef<Set<TrailSubscriber>>(new Set());
  const isIdleRef = useRef(true);

  useEffect(() => {
    // Standard interactive elements + .group (Tailwind hover pattern) + [data-interactive] for explicit marking
    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .group, [data-interactive]';

    const startTrailLoop = () => {
      if (trailRafRef.current !== null) return; // already running
      isIdleRef.current = false;

      const updateTrail = () => {
        const target = latestPositionRef.current;
        const current = trailPositionRef.current;
        const dx = target.x - current.x;
        const dy = target.y - current.y;

        // If close enough, snap and go idle
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          trailPositionRef.current = { x: target.x, y: target.y };
          // Notify subscribers one last time with the final position
          for (const sub of subscribersRef.current) {
            sub(trailPositionRef.current);
          }
          trailRafRef.current = null;
          isIdleRef.current = true;
          return;
        }

        trailPositionRef.current = {
          x: current.x + dx * 0.18,
          y: current.y + dy * 0.18,
        };

        // Notify all subscribers inline
        for (const sub of subscribersRef.current) {
          sub(trailPositionRef.current);
        }

        trailRafRef.current = window.requestAnimationFrame(updateTrail);
      };

      trailRafRef.current = window.requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestPositionRef.current = { x: e.clientX, y: e.clientY };

      // Wake up the trail loop if idle
      if (isIdleRef.current) {
        startTrailLoop();
      }

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

    // Start the trail loop initially to handle any early subscribers
    startTrailLoop();

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
          <CursorTrailPositionContext.Provider value={trailPositionRef}>
            <TrailSubscribersContext.Provider value={subscribersRef}>{children}</TrailSubscribersContext.Provider>
          </CursorTrailPositionContext.Provider>
        </CursorPositionContext.Provider>
      </CursorTypeContext.Provider>
    </CursorActionsContext.Provider>
  );
};

export const useCursorType = () => use(CursorTypeContext);
export const useSetCursorType = () => use(CursorActionsContext);
export const useCursorPosition = () => use(CursorPositionContext);
export const useCursorTrailPosition = () => use(CursorTrailPositionContext);

/**
 * Subscribe a callback to be called on every cursor trail animation frame.
 * The callback receives the current trail position and runs inside the single
 * shared rAF loop — no need for a separate animation frame.
 */
export const useTrailSubscribe = (callback: TrailSubscriber) => {
  const subscribersRef = use(TrailSubscribersContext);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // Stable subscriber that always calls the latest callback
  const stableSubscriber = useCallback((pos: Position) => {
    callbackRef.current(pos);
  }, []);

  useEffect(() => {
    const subs = subscribersRef.current;
    subs.add(stableSubscriber);
    return () => {
      subs.delete(stableSubscriber);
    };
  }, [subscribersRef, stableSubscriber]);
};

export const useCursor = () => ({
  cursorType: useCursorType(),
  setCursorType: useSetCursorType(),
  position: useCursorPosition(),
  trailPosition: useCursorTrailPosition(),
});
