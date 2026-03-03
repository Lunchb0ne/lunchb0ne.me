"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { type ComponentType, Suspense, lazy, useState } from "react";
import {
  BACKGROUND_COLOR,
  CANVAS_GL_CONFIG,
  CANVAS_PERFORMANCE_CONFIG,
  DEFAULT_POST_PROCESSING,
  DEFAULT_SCENE_CONTROLS,
  IS_MOBILE,
} from "./config";
import type { DevHomeControlsProps } from "./DevControls";
import { Dodecahedron, HeroContent } from "./HeroContent";
import { Lights } from "./Lights";
import { PostProcessing, type PostProcessingControls } from "./PostProcessing";

type SceneControls = typeof DEFAULT_SCENE_CONTROLS;

// In production (import.meta.env.DEV === false), Vite/Rollup dead-code-eliminates
// the dynamic import so DevControls is never bundled into the production output.
const LazyDevControls: ComponentType<DevHomeControlsProps> = import.meta.env.DEV
  ? lazy(() => import("./DevControls").then((m) => ({ default: m.DevHomeControls })))
  : () => null;

export const HomeScene = ({ paused = false }: { paused?: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  const [controls, setControls] = useState<PostProcessingControls>(DEFAULT_POST_PROCESSING);
  const [sceneControls, setSceneControls] = useState<SceneControls>(DEFAULT_SCENE_CONTROLS);
  const [dpr, setDpr] = useState(IS_MOBILE ? 1 : 1.5);

  const bloomLimit = prefersReducedMotion ? 0.25 : IS_MOBILE ? 0.3 : 2;
  const effectiveBloomIntensity = Math.min(bloomLimit, controls.bloomIntensity);
  const effectiveBloomRadius = Math.min(bloomLimit, controls.bloomRadius);

  return (
    <>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <LazyDevControls onPostProcessingChange={setControls} onSceneChange={setSceneControls} />
        </Suspense>
      )}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={CANVAS_GL_CONFIG}
        performance={CANVAS_PERFORMANCE_CONFIG}
        frameloop={paused ? "never" : "always"}
      >
        <PerformanceMonitor onChange={({ factor }) => setDpr(IS_MOBILE ? 1 : 1 + 0.5 * factor)} />
        <color attach="background" args={BACKGROUND_COLOR} />
        <Dodecahedron
          prism={{
            color: sceneControls.prismColor,
            transmission: sceneControls.prismTransmission,
            ior: sceneControls.prismIor,
            thickness: sceneControls.prismThickness,
          }}
        />
        <Lights
          keyIntensity={sceneControls.keyLightIntensity}
          glowIntensity={sceneControls.glowLightIntensity}
          warmIntensity={sceneControls.warmLightIntensity}
        />
        <HeroContent sparklesEnabled={!prefersReducedMotion && !IS_MOBILE} />
        <Suspense fallback={null}>
          <PostProcessing
            bloomIntensity={effectiveBloomIntensity}
            bloomThreshold={controls.bloomThreshold}
            bloomRadius={effectiveBloomRadius}
            lutEnabled={!IS_MOBILE && controls.lutEnabled}
            lutBlend={controls.lutBlend}
          />
        </Suspense>
      </Canvas>
    </>
  );
};
