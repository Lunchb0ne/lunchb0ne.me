import { useInView, useReducedMotion } from "motion/react";
import { type RefObject, useEffect, useState } from "react";

/** Steps through `count` items while `ref` is on screen; holds still under reduced motion. */
export const useCycle = (ref: RefObject<Element | null>, count: number, intervalMs: number) => {
  const [index, setIndex] = useState(0);
  const inView = useInView(ref);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [inView, prefersReducedMotion, count, intervalMs]);

  return index;
};
