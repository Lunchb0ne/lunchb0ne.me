import { Float, Html, MeshTransmissionMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import type { Group } from "three";
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
PrismMaterial.displayName = "PrismMaterial";

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

// Reuse Box3 instance to avoid GC pressure in onSync
const tempBox = new THREE.Box3();

const MarqueeText = ({ children, speed = 2, ...props }: MarqueeTextProps) => {
  const group = useRef<Group>(null);
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0); // Used in useFrame to avoid closure stale value

  useFrame((state, delta) => {
    if (group.current && widthRef.current > 0) {
      // Non-linear ease (sine wave speed variation)
      const time = state.clock.getElapsedTime();
      const wave = Math.sin(time * 0.5) * 0.3 + 1; // fluctuates between 0.7 and 1.3
      const currentSpeed = speed * wave;

      // Move left
      group.current.position.x -= delta * currentSpeed;
      // Reset position when the first text has fully moved out
      if (group.current.position.x < -widthRef.current) {
        group.current.position.x += widthRef.current;
      }
    }
  });

  // Calculate width from the first text instance
  const onSync = (scene: THREE.Object3D) => {
    tempBox.setFromObject(scene);
    const w = tempBox.max.x - tempBox.min.x;
    if (w > 0 && Math.abs(w - widthRef.current) > 0.1) {
      widthRef.current = w;
      setWidth(w);
    }
  };

  return (
    <group ref={group}>
      <Text anchorX="center" anchorY="middle" onSync={onSync} {...props}>
        {children}
      </Text>
      <Text anchorX="center" anchorY="middle" position={[width, 0, 0]} {...props}>
        {children}
      </Text>
    </group>
  );
};

// Layout constants
const MARQUEE_FONT_SIZE = 3.5;
const TAGLINE_Y_OFFSET = -2.6;
const TAGLINE_INTERVAL_MS = 4000;

export const HeroContent = ({ onHover }: { onHover: (hover: boolean) => void }) => {
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
    }, TAGLINE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <group position={[0, 0, -2]}>
        <MarqueeText
          speed={0.8}
          fontSize={MARQUEE_FONT_SIZE}
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

        <Html center position={[0, TAGLINE_Y_OFFSET, 0]} className="pointer-events-none">
          <div style={TAGLINE_CONTAINER_STYLE}>
            <TextMorph duration={600}>{TAGLINES[taglineIndex]}</TextMorph>
          </div>
        </Html>
      </group>

      <Float speed={5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh
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
