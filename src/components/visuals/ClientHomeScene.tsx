"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const loadHomeScene = () => import("@/components/visuals/HomeScene");

const HomeScene = lazy(async () => {
  const module = await loadHomeScene();
  return { default: module.HomeScene };
});

interface ClientHomeSceneProps {
  rootMargin?: string;
  threshold?: number;
}

export const ClientHomeScene = ({ rootMargin = "100px", threshold = 0 }: ClientHomeSceneProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloadTimeout = window.setTimeout(() => {
      void loadHomeScene();
    }, 200);

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRender(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(container);

    return () => {
      window.clearTimeout(preloadTimeout);
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {shouldRender ? (
        <Suspense fallback={null}>
          <HomeScene />
        </Suspense>
      ) : null}
    </div>
  );
};
