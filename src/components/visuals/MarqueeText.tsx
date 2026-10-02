import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";
import * as THREE from "three";

interface MarqueeTextProps extends React.ComponentProps<typeof Text> {
  speed?: number;
}

const tempBox = new THREE.Box3();

export const MarqueeText = ({ children, speed = 2, ...props }: MarqueeTextProps) => {
  const group = useRef<Group>(null);
  const [width, setWidth] = useState(0);

  useFrame((state, delta) => {
    if (group.current && width > 0) {
      const time = state.clock.getElapsedTime();
      const wave = Math.sin(time * 0.5) * 0.3 + 1;
      const currentSpeed = speed * wave;

      group.current.position.x -= delta * currentSpeed;
      if (group.current.position.x < -width) {
        group.current.position.x += width;
      }
    }
  });

  const onSync = (scene: THREE.Object3D) => {
    // Force compute bounding box to get accurate width
    tempBox.setFromObject(scene);
    const w = tempBox.max.x - tempBox.min.x;
    if (w > 0 && Math.abs(w - width) > 0.1) {
      setWidth(w);
    }
  };

  return (
    <group ref={group}>
      <Text anchorX="center" anchorY="middle" onSync={onSync} {...props}>
        {children}
      </Text>
      {width > 0 &&
        [-2, -1, 1, 2].map((i) => (
          <Text key={i} anchorX="center" anchorY="middle" position={[width * i, 0, 0]} {...props}>
            {children}
          </Text>
        ))}
    </group>
  );
};
