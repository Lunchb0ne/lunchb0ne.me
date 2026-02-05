import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type * as SI from "simple-icons";
import * as THREE from "three";
import { useCursor } from "@/hooks/useCursor";
import { COIN_MATERIALS, CONFIG, coinGeometry } from "./config";
import { EmbossedLogo } from "./EmbossedLogo";

interface StickerProps {
  icon: SI.SimpleIcon;
  index: number;
  total: number;
  materialType?: keyof typeof COIN_MATERIALS;
}

export const Sticker = ({ icon, index, total, materialType = "chrome" }: StickerProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { setCursorType } = useCursor();

  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * CONFIG.ORBIT.RADIUS;
  const z = Math.cos(angle) * CONFIG.ORBIT.RADIUS;
  const y = index % 2 === 0 ? 1 : -1.5;

  const { baseQuaternion, targetQuaternion, tiltQuaternion, tempEuler, tempVec } = useMemo(() => {
    const pos = new THREE.Vector3(x, y, z);
    const m = new THREE.Matrix4();
    m.lookAt(pos, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));

    return {
      baseQuaternion: new THREE.Quaternion().setFromRotationMatrix(m),
      targetQuaternion: new THREE.Quaternion(),
      tiltQuaternion: new THREE.Quaternion(),
      tempEuler: new THREE.Euler(),
      tempVec: new THREE.Vector3(),
    };
  }, [x, y, z]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Handle Scale
    const targetScale = hovered ? CONFIG.ANIMATION.HOVER_SCALE : 1;
    tempVec.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(tempVec, CONFIG.ANIMATION.TRANSITION_SPEED);

    // Handle Rotation
    if (hovered) {
      const mouseX = state.pointer.x * CONFIG.ANIMATION.TILT_INTENSITY;
      const mouseY = state.pointer.y * CONFIG.ANIMATION.TILT_INTENSITY;
      tempEuler.set(-mouseY * 0.5, mouseX * 0.5, 0);
      tiltQuaternion.setFromEuler(tempEuler);
      targetQuaternion.copy(baseQuaternion).multiply(tiltQuaternion);
    } else {
      targetQuaternion.copy(baseQuaternion);
    }

    meshRef.current.quaternion.slerp(targetQuaternion, CONFIG.ANIMATION.TRANSITION_SPEED);
  });

  return (
    <group position={[x, y, z]}>
      <Float
        speed={CONFIG.ORBIT.FLOAT_SPEED}
        rotationIntensity={CONFIG.ORBIT.FLOAT_INTENSITY}
        floatIntensity={CONFIG.ORBIT.FLOAT_INTENSITY}
      >
        <group
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            setCursorType("hover");
          }}
          onPointerOut={() => {
            setHover(false);
            setCursorType("default");
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]} geometry={coinGeometry} material={COIN_MATERIALS[materialType]} />
          <group position={[0, 0, CONFIG.LOGO.Z_OFFSET]}>
            <EmbossedLogo svgContent={icon.svg} />
          </group>
          <group position={[0, 0, -CONFIG.LOGO.Z_OFFSET]} rotation={[0, Math.PI, 0]}>
            <EmbossedLogo svgContent={icon.svg} />
          </group>
        </group>
      </Float>
    </group>
  );
};
