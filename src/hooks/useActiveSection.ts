import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view via IntersectionObserver and
 * returns its id. Pass the ordered list of section ids to watch.
 */
export const useActiveSection = (ids: readonly string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // Bias the "active" band toward the upper-middle of the viewport.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};
