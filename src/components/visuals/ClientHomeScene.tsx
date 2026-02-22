"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const loadHomeScene = () => import("@/components/visuals/HomeScene");

const HomeScene = lazy<typeof import("@/components/visuals/HomeScene").HomeScene>(async () => {
  const { HomeScene } = await loadHomeScene();
  return { default: HomeScene };
});

export const ClientHomeScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    void loadHomeScene();

    // Trigger fade-in after a short delay to allow canvas to boot
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-surface transition-opacity duration-1000 ease-out",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {shouldRender && (
        <Suspense fallback={null}>
          <HomeScene />
        </Suspense>
      )}
    </div>
  );
};
