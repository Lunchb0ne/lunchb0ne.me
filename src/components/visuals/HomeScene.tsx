"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch, SMAA, ToneMapping } from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import { memo, Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import { HeroContent } from "./HeroContent";

const Lights = memo(() => (
  <Environment resolution={512}>
    <group rotation={[-Math.PI / 4, -0.3, 0]}>
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#a5f3fc" />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.1, 1]} color="#fcb69f" />
    </group>
  </Environment>
));
Lights.displayName = "Lights";

const CANVAS_GL_CONFIG = { antialias: false, alpha: true };
const CANVAS_PERFORMANCE_CONFIG = { min: 0.5 };
const BACKGROUND_COLOR = ["#050505"] as [string];
const GLITCH_DELAY = new THREE.Vector2(0, 0);
const GLITCH_DURATION = new THREE.Vector2(0.1, 0.3);

interface PostProcessingProps {
  bloomIntensity: number;
  bloomThreshold: number;
  bloomRadius: number;
  glitchStrength: number;
  glitchRatio: number;
  hoverGlitch: boolean;
}

const PostProcessing = memo(
  ({ bloomIntensity, bloomThreshold, bloomRadius, glitchStrength, glitchRatio, hoverGlitch }: PostProcessingProps) => {
    // Memoize Vector2 to avoid recreation on every render
    const glitchStrengthVec = useMemo(() => new THREE.Vector2(0.2, glitchStrength), [glitchStrength]);

    return (
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={bloomThreshold} mipmapBlur intensity={bloomIntensity} radius={bloomRadius} />
        <Glitch
          active={hoverGlitch}
          delay={GLITCH_DELAY}
          duration={GLITCH_DURATION}
          strength={glitchStrengthVec}
          ratio={glitchRatio}
        />
        <SMAA />
        <ToneMapping />
      </EffectComposer>
    );
  },
);
PostProcessing.displayName = "PostProcessing";

export const HomeScene = () => {
  const [hoverGlitch, setHoverGlitch] = useState(false);

  // Leva controls for debugging and tweaking
  const { bloomIntensity, bloomThreshold, bloomRadius, glitchStrength, glitchRatio } = useControls("Post Processing", {
    bloomIntensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    bloomThreshold: { value: 1.5, min: 0, max: 3, step: 0.1 },
    bloomRadius: { value: 0.6, min: 0, max: 1, step: 0.05 },
    glitchStrength: { value: 0.4, min: 0, max: 1, step: 0.1 },
    glitchRatio: { value: 0.85, min: 0, max: 1, step: 0.05 },
  });

  return (
    <>
      <Leva hidden={import.meta.env.PROD} />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={CANVAS_GL_CONFIG}
        performance={CANVAS_PERFORMANCE_CONFIG}
      >
        <color attach="background" args={BACKGROUND_COLOR} />
        <Suspense fallback={null}>
          <HeroContent onHover={setHoverGlitch} />
          <Lights />
          <PostProcessing
            bloomIntensity={bloomIntensity}
            bloomThreshold={bloomThreshold}
            bloomRadius={bloomRadius}
            glitchStrength={glitchStrength}
            glitchRatio={glitchRatio}
            hoverGlitch={hoverGlitch}
          />
        </Suspense>
      </Canvas>
    </>
  );
};
