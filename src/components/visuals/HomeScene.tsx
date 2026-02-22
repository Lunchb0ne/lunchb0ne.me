"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Leva, useControls } from "leva";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { BACKGROUND_COLOR, CANVAS_GL_CONFIG, CANVAS_PERFORMANCE_CONFIG, CONFIG, IS_MOBILE } from "./config";
import { Dodecahedron, HeroContent } from "./HeroContent";
import { Lights } from "./Lights";

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
  const prefersReducedMotion = useReducedMotion();
  const [sceneControls, setSceneControls] = useState<SceneControls>(DEFAULT_SCENE_CONTROLS);
  const [dpr, setDpr] = useState(IS_MOBILE ? 1 : 1.5);

  return (
    <>
      {import.meta.env.DEV && (
        <>
          <Leva titleBar={{ position: { x: -30, y: 620 } }} hidden={false} />
          <DevSceneControls onChange={setSceneControls} />
        </>
      )}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={{
          ...CANVAS_GL_CONFIG,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        performance={CANVAS_PERFORMANCE_CONFIG}
        frameloop="always"
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
      </Canvas>
    </>
  );
};
