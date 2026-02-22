import type React from "react";
import { createContext, use, useCallback, useEffect, useRef, useState } from "react";

type CursorType = "default" | "hover" | "text" | "hidden";

interface Position {
  x: number;
  y: number;
}

type PositionRef = React.RefObject<Position>;
type TrailSubscriber = (pos: Position) => void;

const defaultPositionRef = { current: { x: -100, y: -100 } } as PositionRef;
const defaultSubscribersRef = {
  current: new Set<TrailSubscriber>(),
} as React.RefObject<Set<TrailSubscriber>>;

const CursorTypeContext = createContext<CursorType>("default");
const CursorActionsContext = createContext<(type: CursorType) => void>(() => {});
const CursorPositionContext = createContext<PositionRef>(defaultPositionRef);
const CursorTrailPositionContext = createContext<PositionRef>(defaultPositionRef);
const TrailSubscribersContext = createContext<React.RefObject<Set<TrailSubscriber>>>(defaultSubscribersRef);
const HasFinePointerContext = createContext<boolean>(false);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const latestPositionRef = useRef<Position>({ x: -100, y: -100 });
  const trailPositionRef = useRef<Position>({ x: -100, y: -100 });
  const subscribersRef = useRef<Set<TrailSubscriber>>(new Set());

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    setHasFinePointer(finePointerQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    finePointerQuery.addEventListener("change", handlePointerChange);

    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .group, [data-interactive]';

    const updateTrail = () => {
      const target = latestPositionRef.current;
      const current = trailPositionRef.current;
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Simple interpolation for the trail
      trailPositionRef.current = {
        x: current.x + dx * 0.18,
        y: current.y + dy * 0.18,
      };

      for (const sub of subscribersRef.current) {
        sub(trailPositionRef.current);
      }

      requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestPositionRef.current = { x: e.clientX, y: e.clientY };

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor?.tagName === "CANVAS") return;

      const isInteractive = elementUnderCursor?.closest(interactiveSelector);
      setCursorType(isInteractive ? "hover" : "default");
    };

    const trailId = requestAnimationFrame(updateTrail);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      finePointerQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(trailId);
    };
  }, []);

  return (
    <HasFinePointerContext.Provider value={hasFinePointer}>
      <CursorActionsContext.Provider value={setCursorType}>
        <CursorTypeContext.Provider value={cursorType}>
          <CursorPositionContext.Provider value={latestPositionRef}>
            <CursorTrailPositionContext.Provider value={trailPositionRef}>
              <TrailSubscribersContext.Provider value={subscribersRef}>{children}</TrailSubscribersContext.Provider>
            </CursorTrailPositionContext.Provider>
          </CursorPositionContext.Provider>
        </CursorTypeContext.Provider>
      </CursorActionsContext.Provider>
    </HasFinePointerContext.Provider>
  );
};

export const useCursorType = () => use(CursorTypeContext);
export const useSetCursorType = () => use(CursorActionsContext);
export const useCursorPosition = () => use(CursorPositionContext);
export const useCursorTrailPosition = () => use(CursorTrailPositionContext);
export const useHasFinePointer = () => use(HasFinePointerContext);

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
