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

  useEffect(() => {
    setShouldRender(true);
    void loadHomeScene();

    // Trigger fade-in after a short delay to allow canvas to boot
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stop rendering frames while the hero is scrolled out of view or the tab is hidden.
  // The canvas stays mounted, so resuming has no re-init cost.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isIntersecting = true;
    const update = () => setIsPaused(!isIntersecting || document.hidden);

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      update();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
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
