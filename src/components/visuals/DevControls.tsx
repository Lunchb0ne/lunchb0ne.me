"use client";

import { Leva, useControls } from "leva";
import { useEffect } from "react";
import { DEFAULT_POST_PROCESSING, DEFAULT_SCENE_CONTROLS } from "./config";

type PostProcessingControls = typeof DEFAULT_POST_PROCESSING;
type SceneControls = typeof DEFAULT_SCENE_CONTROLS;

export interface DevHomeControlsProps {
  onPostProcessingChange: (next: PostProcessingControls) => void;
  onSceneChange: (next: SceneControls) => void;
}

export const DevHomeControls = ({ onPostProcessingChange, onSceneChange }: DevHomeControlsProps) => {
  const ppControls = useControls("Post Processing", {
    bloomIntensity: { value: DEFAULT_POST_PROCESSING.bloomIntensity, min: 0, max: 2, step: 0.1 },
    bloomThreshold: { value: DEFAULT_POST_PROCESSING.bloomThreshold, min: 0, max: 3, step: 0.1 },
    bloomRadius: { value: DEFAULT_POST_PROCESSING.bloomRadius, min: 0, max: 1, step: 0.05 },
    lutEnabled: { value: DEFAULT_POST_PROCESSING.lutEnabled },
    lutBlend: { value: DEFAULT_POST_PROCESSING.lutBlend, min: 0, max: 1, step: 0.05 },
  });

  const sceneControls = useControls("Scene", {
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
    onPostProcessingChange(ppControls as PostProcessingControls);
  }, [ppControls, onPostProcessingChange]);

  useEffect(() => {
    onSceneChange({ ...sceneControls, ...lightControls } as SceneControls);
  }, [sceneControls, lightControls, onSceneChange]);

  return <Leva titleBar={{ position: { x: -30, y: 620 } }} hidden={false} />;
};
