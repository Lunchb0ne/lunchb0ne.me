import { useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch, LUT, SMAA, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction, LUTCubeLoader } from "postprocessing";
import type { ComponentProps, ComponentType } from "react";
import { memo, useEffect, useMemo } from "react";
import * as THREE from "three";
import { DEFAULT_POST_PROCESSING, GLITCH_DELAY, GLITCH_DURATION } from "./config";

export interface PostProcessingProps {
  bloomIntensity: number;
  bloomThreshold: number;
  bloomRadius: number;
  glitchStrength: number;
  glitchRatio: number;
  hoverGlitch: boolean;
  enableGlitch: boolean;
  lutEnabled: boolean;
  lutBlend: number;
}

export type PostProcessingControls = typeof DEFAULT_POST_PROCESSING;

const LUT_URL = "/DwlG-F-6800-STD.cube";
// Preload for faster initialization
useLoader.preload(LUTCubeLoader, LUT_URL);

const LutEffect = LUT as unknown as ComponentType<ComponentProps<typeof LUT> & { opacity?: number }>;

const LutPass = ({ blend }: { blend: number }) => {
  const lutTexture = useLoader(LUTCubeLoader, LUT_URL);
  return <LutEffect lut={lutTexture} blendFunction={BlendFunction.NORMAL} opacity={blend} />;
};

export const PostProcessing = memo(
  ({
    bloomIntensity,
    bloomThreshold,
    bloomRadius,
    glitchStrength,
    glitchRatio,
    hoverGlitch,
    enableGlitch,
    lutEnabled,
    lutBlend,
  }: PostProcessingProps) => {
    const glitchStrengthVec = useMemo(
      () => (enableGlitch ? new THREE.Vector2(0.2, glitchStrength) : new THREE.Vector2(0, 0)),
      [enableGlitch, glitchStrength],
    );

    return (
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={bloomThreshold} mipmapBlur intensity={bloomIntensity} radius={bloomRadius} />
        <Glitch
          active={enableGlitch && hoverGlitch}
          delay={GLITCH_DELAY}
          duration={GLITCH_DURATION}
          strength={glitchStrengthVec}
          ratio={glitchRatio}
        />
        {lutEnabled && <LutPass blend={lutBlend} />}
        <SMAA />
        <ToneMapping />
      </EffectComposer>
    );
  },
);

PostProcessing.displayName = "PostProcessing";

export const DevPostProcessingControls = ({ onChange }: { onChange: (next: PostProcessingControls) => void }) => {
  const controls = useControls("Post Processing", {
    bloomIntensity: { value: DEFAULT_POST_PROCESSING.bloomIntensity, min: 0, max: 2, step: 0.1 },
    bloomThreshold: { value: DEFAULT_POST_PROCESSING.bloomThreshold, min: 0, max: 3, step: 0.1 },
    bloomRadius: { value: DEFAULT_POST_PROCESSING.bloomRadius, min: 0, max: 1, step: 0.05 },
    glitchStrength: { value: DEFAULT_POST_PROCESSING.glitchStrength, min: 0, max: 1, step: 0.1 },
    glitchRatio: { value: DEFAULT_POST_PROCESSING.glitchRatio, min: 0, max: 1, step: 0.05 },
    lutEnabled: { value: DEFAULT_POST_PROCESSING.lutEnabled },
    lutBlend: { value: DEFAULT_POST_PROCESSING.lutBlend, min: 0, max: 1, step: 0.05 },
  });

  useEffect(() => {
    onChange(controls as PostProcessingControls);
  }, [controls, onChange]);

  return null;
};
