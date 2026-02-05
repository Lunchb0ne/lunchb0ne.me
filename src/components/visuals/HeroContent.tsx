import { Float, Html, MeshTransmissionMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { TextMorph } from "torph/react";
import { useCursor } from "@/hooks/useCursor";
import { ALL_TECH_ICONS, COIN_MATERIAL_KEYS, type COIN_MATERIALS, CONFIG, ICON_COUNT, TAGLINES } from "./config";
import { Sticker } from "./Sticker";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Pick a random material key
function randomMaterial(): keyof typeof COIN_MATERIALS {
  return COIN_MATERIAL_KEYS[Math.floor(Math.random() * COIN_MATERIAL_KEYS.length)];
}

const PrismMaterial = memo(() => (
  <MeshTransmissionMaterial
    backside={true}
    samples={CONFIG.PRISM.SAMPLES}
    resolution={CONFIG.PRISM.RESOLUTION}
    transmission={CONFIG.PRISM.TRANSMISSION}
    roughness={CONFIG.PRISM.ROUGHNESS}
    ior={CONFIG.PRISM.IOR}
    thickness={CONFIG.PRISM.THICKNESS}
    chromaticAberration={CONFIG.PRISM.CHROMATIC_ABERRATION}
    anisotropy={CONFIG.PRISM.ANISOTROPY}
    color={CONFIG.COLORS.PRISM}
  />
));

const TAGLINE_CONTAINER_STYLE = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: "16px",
  lineHeight: "1.4",
  color: CONFIG.COLORS.GLOW,
  letterSpacing: "0.1em",
  fontWeight: "700",
  textShadow: `0 0 15px ${CONFIG.COLORS.GLOW}33`,
  pointerEvents: "none" as const,
  opacity: 0.9,
  textAlign: "center" as const,
  textWrap: "balance" as const,
  width: "90vw",
  maxWidth: "600px",
  display: "flex",
  justifyContent: "center",
  minHeight: "3em",
};

interface MarqueeTextProps extends React.ComponentProps<typeof Text> {
  speed?: number;
}

const MarqueeText = ({ children, speed = 2, ...props }: MarqueeTextProps) => {
  const group = useRef<Group>(null);
  const [width, setWidth] = useState(0);
  const gap = 0; // Gap handled by text content

  useFrame((state, delta) => {
    if (group.current && width > 0) {
      // Non-linear ease (sine wave speed variation)
      const time = state.clock.getElapsedTime();
      const wave = Math.sin(time * 0.5) * 0.3 + 1; // fluctuated between 0.7 and 1.3
      const currentSpeed = speed * wave;

      // Move left
      group.current.position.x -= delta * currentSpeed;
      // Reset position when the first text has fully moved out
      const totalWidth = width + gap;
      if (group.current.position.x < -totalWidth) {
        group.current.position.x += totalWidth;
      }
    }
  });

  // Calculate width from the first text instance
  const onSync = (scene: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(scene);
    const w = box.max.x - box.min.x;
    if (w > 0 && Math.abs(w - width) > 0.1) {
      setWidth(w);
    }
  };

  return (
    <group ref={group}>
      <Text anchorX="center" anchorY="middle" onSync={onSync} {...props}>
        {children}
      </Text>
      <Text anchorX="center" anchorY="middle" position={[width + gap, 0, 0]} {...props}>
        {children}
      </Text>
    </group>
  );
};

export const HeroContent = ({ onHover }: { onHover: (hover: boolean) => void }) => {
  const meshRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const { setCursorType } = useCursor();
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Random icon selection on mount (client-side only)
  const [selectedIcons] = useState(() =>
    shuffleArray(ALL_TECH_ICONS)
      .slice(0, ICON_COUNT)
      .map((icon) => ({ ...icon, material: randomMaterial() })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const targetFontSize = 3.5;
  const taglineOffset = -2.6;

  return (
    <group>
      <group position={[0, 0, -2]}>
        <MarqueeText
          speed={0.8}
          fontSize={targetFontSize}
          letterSpacing={0.05}
          color="white"
          textAlign="center"
          fontWeight={800}
          fillOpacity={0}
          strokeWidth={"1%"}
          strokeColor="white"
        >
          ABHISHEK·ARYAN·
        </MarqueeText>

        <Html center position={[0, taglineOffset, 0]} className="pointer-events-none">
          <div style={TAGLINE_CONTAINER_STYLE}>
            <TextMorph duration={600}>{TAGLINES[taglineIndex]}</TextMorph>
          </div>
        </Html>
      </group>

      <Float speed={5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setCursorType("hover");
            onHover(true);
          }}
          onPointerOut={() => {
            setCursorType("default");
            onHover(false);
          }}
        >
          <dodecahedronGeometry args={[1.4, 0]} />
          <PrismMaterial />
        </mesh>
      </Float>

      <group ref={orbitRef}>
        {selectedIcons.map((tech, i) => (
          <Sticker key={tech.slug} icon={tech.icon} index={i} total={selectedIcons.length} materialType={tech.material} />
        ))}
      </group>

      <Sparkles count={50} scale={8} size={2} speed={0.2} opacity={0.3} color="white" />
    </group>
  );
};
