"use client";

import { useEffect, useRef, useState } from "react";
import { HomeScene } from "@/components/visuals/HomeScene";

interface ClientHomeSceneProps {
  rootMargin?: string;
  threshold?: number;
}

export const ClientHomeScene = ({ rootMargin = "100px", threshold = 0 }: ClientHomeSceneProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRender(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {shouldRender ? <HomeScene /> : null}
    </div>
  );
};
