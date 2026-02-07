import { Bloom, EffectComposer, Glitch, SMAA, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
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
}

export type PostProcessingControls = typeof DEFAULT_POST_PROCESSING;

export const PostProcessing = memo(
  ({
    bloomIntensity,
    bloomThreshold,
    bloomRadius,
    glitchStrength,
    glitchRatio,
    hoverGlitch,
    enableGlitch,
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
  });

  useEffect(() => {
    onChange(controls as PostProcessingControls);
  }, [controls, onChange]);

  return null;
};
