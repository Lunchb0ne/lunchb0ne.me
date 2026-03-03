"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const loadHomeScene = () => import("@/components/visuals/HomeScene");

const HomeScene = lazy<typeof import("@/components/visuals/HomeScene").HomeScene>(async () => {
  const { HomeScene } = await loadHomeScene();
  return { default: HomeScene };
});

export const ClientHomeScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    setShouldRender(true);
    void loadHomeScene();

    // Trigger fade-in after a short delay to allow canvas to boot
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Initialise based on current document visibility (e.g. page opened in a background tab)
    setIsPaused(document.hidden);

    const el = containerRef.current;
    if (!el) return () => clearTimeout(timer);

    // Pause rendering when the hero section scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        setIsPaused(!entry.isIntersecting || document.hidden);
      },
      { threshold: 0 },
    );
    observer.observe(el);

    // Pause rendering when the browser tab is hidden
    const handleVisibilityChange = () => {
      setIsPaused(!isIntersectingRef.current || document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-surface transition-opacity duration-1000 ease-out",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {shouldRender && (
        <Suspense fallback={null}>
          <HomeScene paused={isPaused} />
        </Suspense>
      )}
    </div>
  );
};
