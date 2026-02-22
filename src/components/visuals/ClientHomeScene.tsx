"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const loadHomeScene = () => import("@/components/visuals/HomeScene");

const HomeScene = lazy<typeof import("@/components/visuals/HomeScene").HomeScene>(async () => {
  const module = await loadHomeScene();
  return { default: module.HomeScene };
});

interface ClientHomeSceneProps {
  rootMargin?: string;
  threshold?: number;
}

export const ClientHomeScene = ({ rootMargin = "100px", threshold = 0 }: ClientHomeSceneProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void loadHomeScene();

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldRender(true);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const frameloop = isVisible ? "always" : ("never" as const);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {shouldRender ? (
        <Suspense fallback={null}>
          <HomeScene frameloop={frameloop} />
        </Suspense>
      ) : null}
    </div>
  );
};
