import { Instance } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as SI from "simple-icons";
import * as THREE from "three";
import { useSetCursorType } from "@/hooks/useCursor";
import { CONFIG } from "./config";
import { EmbossedLogo } from "./EmbossedLogo";

interface StickerProps {
  icon: SI.SimpleIcon;
  index: number;
  total: number;
}

export const Sticker = ({ icon, index, total }: StickerProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const hoveredRef = useRef(false);
  const setCursorType = useSetCursorType();

  // Memoize position calculation
  const { x, y, z } = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    return {
      x: Math.sin(angle) * CONFIG.ORBIT.RADIUS,
      z: Math.cos(angle) * CONFIG.ORBIT.RADIUS,
      y: index % 2 === 0 ? 1 : -1.5,
    };
  }, [index, total]);

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

    const t = state.clock.getElapsedTime();

    // Handle Floating Animation (Consolidated lil bit of float)
    const floatY = Math.sin(t * CONFIG.ORBIT.FLOAT_SPEED + index) * 0.05;
    meshRef.current.position.y = y + floatY;

    // Handle Scale
    const targetScale = hoveredRef.current ? CONFIG.ANIMATION.HOVER_SCALE : 1;
    tempVec.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(tempVec, CONFIG.ANIMATION.TRANSITION_SPEED);

    // Handle Rotation
    if (hoveredRef.current) {
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
      <group
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoveredRef.current = true;
          setCursorType("hover");
        }}
        onPointerOut={() => {
          hoveredRef.current = false;
          setCursorType("default");
        }}
      >
        <Instance rotation={[Math.PI / 2, 0, 0]} />
        <group position={[0, 0, CONFIG.LOGO.Z_OFFSET]}>
          <EmbossedLogo svgContent={icon.svg} />
        </group>
        <group position={[0, 0, -CONFIG.LOGO.Z_OFFSET]} rotation={[0, Math.PI, 0]}>
          <EmbossedLogo svgContent={icon.svg} />
        </group>
      </group>
    </group>
  );
};
