"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const loadHomeScene = () => import("@/components/visuals/HomeScene");

const HomeScene = lazy<typeof import("@/components/visuals/HomeScene").HomeScene>(async () => {
  const { HomeScene } = await loadHomeScene();
  return { default: HomeScene };
});

export const ClientHomeScene = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    // Warm up the import
    void loadHomeScene();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {shouldRender && (
        <Suspense fallback={null}>
          <HomeScene />
        </Suspense>
      )}
    </div>
  );
};
