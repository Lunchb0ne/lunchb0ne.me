import type React from "react";
import { createContext, use, useEffect, useRef, useState } from "react";

type CursorType = "default" | "hover" | "hidden";

interface Position {
  x: number;
  y: number;
}

type TrailSubscriber = (pos: Position) => void;

const TRAIL_LERP_FACTOR = 0.18;
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .group, [data-interactive]';

// Mutated in place by the pointer listener / trail loop; never re-assigned, so no context needed.
export const cursorPosition: Position = { x: -100, y: -100 };
const trail: Position = { x: -100, y: -100 };
const subscribers = new Set<TrailSubscriber>();

const CursorTypeContext = createContext<CursorType>("default");
const CursorActionsContext = createContext<(type: CursorType) => void>(() => {});
const HasFinePointerContext = createContext<boolean>(false);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorTypeState] = useState<CursorType>("default");
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const cursorTypeRef = useRef<CursorType>("default");

  const setCursorType = (type: CursorType) => {
    cursorTypeRef.current = type;
    setCursorTypeState(type);
  };

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    setHasFinePointer(finePointerQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    finePointerQuery.addEventListener("change", handlePointerChange);

    let rafId = 0;
    const updateTrail = () => {
      // Simple interpolation for the trail
      trail.x += (cursorPosition.x - trail.x) * TRAIL_LERP_FACTOR;
      trail.y += (cursorPosition.y - trail.y) * TRAIL_LERP_FACTOR;

      for (const sub of subscribers) {
        sub(trail);
      }

      rafId = requestAnimationFrame(updateTrail);
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorPosition.x = e.clientX;
      cursorPosition.y = e.clientY;

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor?.tagName === "CANVAS") return;

      const nextCursorType: CursorType = elementUnderCursor?.closest(INTERACTIVE_SELECTOR) ? "hover" : "default";
      if (cursorTypeRef.current !== nextCursorType) {
        cursorTypeRef.current = nextCursorType;
        setCursorTypeState(nextCursorType);
      }
    };

    rafId = requestAnimationFrame(updateTrail);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      finePointerQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <HasFinePointerContext.Provider value={hasFinePointer}>
      <CursorActionsContext.Provider value={setCursorType}>
        <CursorTypeContext.Provider value={cursorType}>{children}</CursorTypeContext.Provider>
      </CursorActionsContext.Provider>
    </HasFinePointerContext.Provider>
  );
};

export const useCursorType = () => use(CursorTypeContext);
export const useSetCursorType = () => use(CursorActionsContext);
export const useHasFinePointer = () => use(HasFinePointerContext);

/**
 * Subscribe a callback to be called on every cursor trail animation frame.
 * The callback receives the current trail position and runs inside the single
 * shared rAF loop — no need for a separate animation frame.
 */
export const useTrailSubscribe = (callback: TrailSubscriber) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const subscriber: TrailSubscriber = (pos) => callbackRef.current(pos);
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);
};
