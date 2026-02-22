"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  BACKGROUND_COLOR,
  CANVAS_GL_CONFIG,
  CANVAS_PERFORMANCE_CONFIG,
  CONFIG,
  DEFAULT_POST_PROCESSING,
  IS_MOBILE,
} from "./config";
import { Dodecahedron, HeroContent } from "./HeroContent";
import { Lights } from "./Lights";
import { DevPostProcessingControls, PostProcessing, type PostProcessingControls } from "./PostProcessing";

const DEFAULT_SCENE_CONTROLS = {
  prismColor: CONFIG.COLORS.PRISM,
  prismTransmission: CONFIG.PRISM.TRANSMISSION,
  prismIor: CONFIG.PRISM.IOR,
  prismThickness: CONFIG.PRISM.THICKNESS,
  keyLightIntensity: 4,
  glowLightIntensity: 2,
  warmLightIntensity: 2,
} as const;

type SceneControls = typeof DEFAULT_SCENE_CONTROLS;

const DevSceneControls = ({ onChange }: { onChange: (next: SceneControls) => void }) => {
  const controls = useControls("Scene", {
    prismColor: { value: DEFAULT_SCENE_CONTROLS.prismColor },
    prismTransmission: { value: DEFAULT_SCENE_CONTROLS.prismTransmission, min: 0, max: 1, step: 0.01 },
    prismIor: { value: DEFAULT_SCENE_CONTROLS.prismIor, min: 1, max: 2.5, step: 0.01 },
    prismThickness: { value: DEFAULT_SCENE_CONTROLS.prismThickness, min: 0.5, max: 5, step: 0.1 },
  });

  const lightControls = useControls("Lights", {
    keyLightIntensity: { value: DEFAULT_SCENE_CONTROLS.keyLightIntensity, min: 0, max: 10, step: 0.1 },
    glowLightIntensity: { value: DEFAULT_SCENE_CONTROLS.glowLightIntensity, min: 0, max: 10, step: 0.1 },
    warmLightIntensity: { value: DEFAULT_SCENE_CONTROLS.warmLightIntensity, min: 0, max: 10, step: 0.1 },
  });

  useEffect(() => {
    onChange({
      ...controls,
      ...lightControls,
    } as SceneControls);
  }, [controls, lightControls, onChange]);

  return null;
};

export const HomeScene = () => {
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [controls, setControls] = useState<PostProcessingControls>(DEFAULT_POST_PROCESSING);
  const [sceneControls, setSceneControls] = useState<SceneControls>(DEFAULT_SCENE_CONTROLS);
  const [dpr, setDpr] = useState(IS_MOBILE ? 1 : 1.5);

  const bloomLimit = prefersReducedMotion ? 0.25 : IS_MOBILE ? 0.3 : 2;
  const effectiveBloomIntensity = Math.min(bloomLimit, controls.bloomIntensity);
  const effectiveBloomRadius = Math.min(bloomLimit, controls.bloomRadius);
  const enableGlitch = !prefersReducedMotion && !IS_MOBILE;

  // Scaling factor for expensive materials based on performance (1.0 = full, 0.5 = low)
  const [quality, setQuality] = useState(1);

  return (
    <>
      {import.meta.env.DEV && (
        <>
          <Leva titleBar={{ position: { x: -30, y: 620 } }} hidden={false} />
          <DevPostProcessingControls onChange={setControls} />
          <DevSceneControls onChange={setSceneControls} />
        </>
      )}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={CANVAS_GL_CONFIG}
        performance={CANVAS_PERFORMANCE_CONFIG}
        frameloop="always"
      >
        <PerformanceMonitor
          onIncline={() => setQuality(1)}
          onDecline={() => setQuality(0.5)}
          onChange={({ factor }) => setDpr(IS_MOBILE ? 1 : 1 + 0.5 * factor)}
        />
        <color attach="background" args={BACKGROUND_COLOR} />
        <Dodecahedron
          onHover={setHoverGlitch}
          prism={{
            color: sceneControls.prismColor,
            transmission: sceneControls.prismTransmission,
            ior: sceneControls.prismIor,
            thickness: sceneControls.prismThickness,
            // Scale expensive material properties
            samples: Math.round(CONFIG.PRISM.SAMPLES * quality),
            resolution: Math.round(CONFIG.PRISM.RESOLUTION * quality),
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
            glitchStrength={controls.glitchStrength}
            glitchRatio={controls.glitchRatio}
            hoverGlitch={hoverGlitch}
            enableGlitch={enableGlitch}
            lutEnabled={!IS_MOBILE && controls.lutEnabled}
            lutBlend={controls.lutBlend}
          />
        </Suspense>
      </Canvas>
    </>
  );
};
