import { Environment, Lightformer } from "@react-three/drei";
import { memo } from "react";
import { CONFIG } from "./config";

interface LightsProps {
  keyIntensity?: number;
  glowIntensity?: number;
  warmIntensity?: number;
}

export const Lights = memo(({ keyIntensity = 4, glowIntensity = 2, warmIntensity = 2 }: LightsProps) => (
  <Environment resolution={512}>
    <group rotation={[-Math.PI / 4, -0.3, 0]}>
      <Lightformer intensity={keyIntensity} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <Lightformer
        intensity={glowIntensity}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
        color={CONFIG.COLORS.GLOW}
      />
      <Lightformer
        intensity={warmIntensity}
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.1, 1]}
        color="#fcb69f"
      />
    </group>
  </Environment>
));

Lights.displayName = "Lights";
