"use client";

import { useEffect, useRef, useState } from "react";
import { HomeScene } from "@/components/visuals/HomeScene";

export const ClientHomeScene = ({ rootMargin = "100px", threshold = 0 }: { rootMargin?: string; threshold?: number }) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {mounted && isVisible ? <HomeScene /> : null}
    </div>
  );
};
