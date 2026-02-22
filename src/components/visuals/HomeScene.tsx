"use client";

import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense, useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  BACKGROUND_COLOR,
  CANVAS_GL_CONFIG,
  CANVAS_PERFORMANCE_CONFIG,
  CONFIG,
  DEFAULT_POST_PROCESSING,
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

export const HomeScene = ({ frameloop = "always" }: { frameloop?: "always" | "demand" | "never" }) => {
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [controls, setControls] = useState<PostProcessingControls>(DEFAULT_POST_PROCESSING);
  const [sceneControls, setSceneControls] = useState<SceneControls>(DEFAULT_SCENE_CONTROLS);
  const handleControlsChange = useCallback((next: PostProcessingControls) => setControls(next), []);
  const handleSceneControlsChange = useCallback((next: SceneControls) => setSceneControls(next), []);
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false,
  );

  const effectiveBloomIntensity = prefersReducedMotion
    ? Math.min(0.25, controls.bloomIntensity)
    : isMobile
      ? Math.min(0.3, controls.bloomIntensity)
      : controls.bloomIntensity;

  const effectiveBloomRadius = prefersReducedMotion
    ? Math.min(0.2, controls.bloomRadius)
    : isMobile
      ? Math.min(0.3, controls.bloomRadius)
      : controls.bloomRadius;
  const enableGlitch = !prefersReducedMotion && !isMobile;

  return (
    <>
      {import.meta.env.DEV ? (
        <>
          <Leva
            titleBar={{
              position: {
                x: -30,
                y: 620,
              },
            }}
            hidden={false}
          />
          <DevPostProcessingControls onChange={handleControlsChange} />
          <DevSceneControls onChange={handleSceneControlsChange} />
        </>
      ) : null}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={CANVAS_GL_CONFIG}
        performance={CANVAS_PERFORMANCE_CONFIG}
        frameloop={frameloop}
      >
        <color attach="background" args={BACKGROUND_COLOR} />
        {/* Synchronous scene — renders immediately, no async resources */}
        <Dodecahedron
          onHover={setHoverGlitch}
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
        <HeroContent sparklesEnabled={!prefersReducedMotion && !isMobile} />
        <Suspense fallback={null}>
          <PostProcessing
            bloomIntensity={effectiveBloomIntensity}
            bloomThreshold={controls.bloomThreshold}
            bloomRadius={effectiveBloomRadius}
            glitchStrength={controls.glitchStrength}
            glitchRatio={controls.glitchRatio}
            hoverGlitch={hoverGlitch}
            enableGlitch={enableGlitch}
            lutEnabled={!isMobile && controls.lutEnabled}
            lutBlend={controls.lutBlend}
          />
        </Suspense>
      </Canvas>
    </>
  );
};
