"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch, SMAA, ToneMapping } from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import { Suspense, useState } from "react";
import * as THREE from "three";
import { HeroContent } from "./HeroContent";

const Lights = () => (
  <Environment resolution={512}>
    <group rotation={[-Math.PI / 4, -0.3, 0]}>
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#a5f3fc" />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.1, 1]} color="#fcb69f" />
    </group>
  </Environment>
);

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
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <color attach="background" args={["#050505"]} />
        <Suspense fallback={null}>
          <HeroContent onHover={setHoverGlitch} />
          <Lights />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={bloomThreshold} mipmapBlur intensity={bloomIntensity} radius={bloomRadius} />
            <Glitch
              active={hoverGlitch}
              delay={new THREE.Vector2(0, 0)}
              duration={new THREE.Vector2(0.1, 0.3)}
              strength={new THREE.Vector2(0.2, glitchStrength)}
              ratio={glitchRatio}
            />
            <SMAA />
            <ToneMapping />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
};
