import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { type ComponentType, lazy, Suspense, useState } from "react";
import {
  BACKGROUND_COLOR,
  CANVAS_GL_CONFIG,
  CANVAS_PERFORMANCE_CONFIG,
  DEFAULT_POST_PROCESSING,
  DEFAULT_SCENE_CONTROLS,
  IS_MOBILE,
  MAX_DPR,
  type SceneControls,
} from "./config";
import type { DevHomeControlsProps } from "./DevControls";
import { DEFAULT_DODECAHEDRON_CONTROLS, Dodecahedron, type DodecahedronControls, HeroContent } from "./HeroContent";
import { Lights } from "./Lights";
import { PostProcessing, type PostProcessingControls } from "./PostProcessing";

// `import.meta.env.DEV` is statically false in production builds, so the dynamic import
// is dead-code-eliminated and leva is never bundled.
const DevControls: ComponentType<DevHomeControlsProps> = import.meta.env.DEV
  ? lazy(() => import("./DevControls").then((m) => ({ default: m.DevHomeControls })))
  : () => null;

export const HomeScene = ({ paused = false }: { paused?: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  const [controls, setControls] = useState<PostProcessingControls>(DEFAULT_POST_PROCESSING);
  const [sceneControls, setSceneControls] = useState<SceneControls>(DEFAULT_SCENE_CONTROLS);
  const [dodecahedronControls, setDodecahedronControls] = useState<DodecahedronControls>(DEFAULT_DODECAHEDRON_CONTROLS);
  const [dpr, setDpr] = useState(MAX_DPR);

  const bloomLimit = prefersReducedMotion ? 0.25 : IS_MOBILE ? 0.3 : 2;
  const effectiveBloomIntensity = Math.min(bloomLimit, controls.bloomIntensity);
  const effectiveBloomRadius = Math.min(bloomLimit, controls.bloomRadius);

  return (
    <>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <DevControls
            onPostProcessingChange={setControls}
            onSceneChange={setSceneControls}
            onDodecahedronChange={setDodecahedronControls}
          />
        </Suspense>
      )}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={CANVAS_GL_CONFIG}
        performance={CANVAS_PERFORMANCE_CONFIG}
        frameloop={paused ? "never" : prefersReducedMotion ? "demand" : "always"}
      >
        <PerformanceMonitor onChange={({ factor }) => setDpr(IS_MOBILE ? 1 : (MAX_DPR * (2 + factor)) / 3)} />
        <color attach="background" args={BACKGROUND_COLOR} />
        <Dodecahedron
          prism={{
            color: sceneControls.prismColor,
            transmission: sceneControls.prismTransmission,
            ior: sceneControls.prismIor,
            thickness: sceneControls.prismThickness,
          }}
          controls={dodecahedronControls}
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
