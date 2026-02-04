import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type * as SI from "simple-icons";
import * as THREE from "three";
import { useCursor } from "@/hooks/useCursor";
import { CONFIG, coinGeometry, coinMaterial } from "./config";
import { EmbossedLogo } from "./EmbossedLogo";

export const Sticker = ({ icon, index, total }: { icon: SI.SimpleIcon; index: number; total: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { setCursorType } = useCursor();

  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * CONFIG.ORBIT.RADIUS;
  const z = Math.cos(angle) * CONFIG.ORBIT.RADIUS;
  const y = Number(index % 2 === 0 ? 1 : -1.5);

  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const lookAtQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tiltQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const currentRotBackup = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const targetScale = hovered ? CONFIG.ANIMATION.HOVER_SCALE : 1;
    tempVec.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(tempVec, CONFIG.ANIMATION.TRANSITION_SPEED);

    currentRotBackup.copy(meshRef.current.quaternion);
    meshRef.current.lookAt(0, 0, 0);
    lookAtQuaternion.copy(meshRef.current.quaternion);
    meshRef.current.quaternion.copy(currentRotBackup);

    if (hovered) {
      const mouseX = state.pointer.x * CONFIG.ANIMATION.TILT_INTENSITY;
      const mouseY = state.pointer.y * CONFIG.ANIMATION.TILT_INTENSITY;
      tempEuler.set(-mouseY * 0.5, mouseX * 0.5, 0);
      tiltQuaternion.setFromEuler(tempEuler);
      targetQuaternion.copy(lookAtQuaternion).multiply(tiltQuaternion);
    } else {
      targetQuaternion.copy(lookAtQuaternion);
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
          <mesh rotation={[Math.PI / 2, 0, 0]} geometry={coinGeometry} material={coinMaterial} />
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
