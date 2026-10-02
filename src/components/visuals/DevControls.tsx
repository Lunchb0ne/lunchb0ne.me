import { Leva, useControls } from "leva";
import { useEffect } from "react";
import { DEFAULT_POST_PROCESSING, DEFAULT_SCENE_CONTROLS, type SceneControls } from "@/components/visuals/config";
import { DEFAULT_DODECAHEDRON_CONTROLS, type DodecahedronControls } from "@/components/visuals/HeroContent";
import type { PostProcessingControls } from "@/components/visuals/PostProcessing";

export interface DevHomeControlsProps {
  onPostProcessingChange: (next: PostProcessingControls) => void;
  onSceneChange: (next: SceneControls) => void;
  onDodecahedronChange: (next: DodecahedronControls) => void;
}

// Dev-only tweak panel. Loaded lazily behind `import.meta.env.DEV` so leva never ships to production.
export const DevHomeControls = ({
  onPostProcessingChange,
  onSceneChange,
  onDodecahedronChange,
}: DevHomeControlsProps) => {
  const postProcessingControls = useControls("Post Processing", {
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

  const dodecahedronControls = useControls("Dodecahedron", {
    dragRotate: { value: DEFAULT_DODECAHEDRON_CONTROLS.dragRotate },
    inertia: { value: DEFAULT_DODECAHEDRON_CONTROLS.inertia, min: 0.75, max: 0.98, step: 0.01 },
  });

  useEffect(() => {
    onPostProcessingChange(postProcessingControls as PostProcessingControls);
  }, [postProcessingControls, onPostProcessingChange]);

  useEffect(() => {
    onSceneChange({ ...sceneControls, ...lightControls } as SceneControls);
  }, [sceneControls, lightControls, onSceneChange]);

  useEffect(() => {
    onDodecahedronChange(dodecahedronControls);
  }, [dodecahedronControls, onDodecahedronChange]);

  return <Leva titleBar={{ position: { x: -30, y: 620 } }} hidden={false} />;
};
