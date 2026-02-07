import { Float, Html, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { TextMorph } from "torph/react";
import { useSetCursorType } from "@/hooks/useCursor";
import {
  ALL_TECH_ICONS,
  COIN_MATERIAL_KEYS,
  type COIN_MATERIALS,
  CONFIG,
  HERO_MARQUEE_FONT_SIZE,
  HERO_TAGLINE_CONTAINER_STYLE,
  HERO_TAGLINE_INTERVAL_MS,
  HERO_TAGLINE_Y_OFFSET,
  ICON_COUNT,
  TAGLINES,
} from "./config";
import { MarqueeText } from "./MarqueeText";
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

interface PrismSettings {
  color?: string;
  transmission?: number;
  ior?: number;
  thickness?: number;
  roughness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
}

const PrismMaterial = memo(
  ({
    color = CONFIG.COLORS.PRISM,
    transmission = CONFIG.PRISM.TRANSMISSION,
    ior = CONFIG.PRISM.IOR,
    thickness = CONFIG.PRISM.THICKNESS,
    roughness = CONFIG.PRISM.ROUGHNESS,
    chromaticAberration = CONFIG.PRISM.CHROMATIC_ABERRATION,
    anisotropy = CONFIG.PRISM.ANISOTROPY,
  }: PrismSettings) => (
    <MeshTransmissionMaterial
      backside={true}
      samples={CONFIG.PRISM.SAMPLES}
      resolution={CONFIG.PRISM.RESOLUTION}
      transmission={transmission}
      roughness={roughness}
      ior={ior}
      thickness={thickness}
      chromaticAberration={chromaticAberration}
      anisotropy={anisotropy}
      color={color}
    />
  ),
);
PrismMaterial.displayName = "PrismMaterial";

export const HeroContent = ({
  onHover,
  sparklesEnabled = true,
  prism,
}: {
  onHover: (hover: boolean) => void;
  sparklesEnabled?: boolean;
  prism?: PrismSettings;
}) => {
  const orbitRef = useRef<Group>(null);
  const setCursorType = useSetCursorType();
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
    }, HERO_TAGLINE_INTERVAL_MS);
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
          fontSize={HERO_MARQUEE_FONT_SIZE}
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

        <Html center position={[0, HERO_TAGLINE_Y_OFFSET, 0]} className="pointer-events-none">
          <div style={HERO_TAGLINE_CONTAINER_STYLE}>
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
          <PrismMaterial {...prism} />
        </mesh>
      </Float>

      <group ref={orbitRef}>
        {selectedIcons.map((tech, i) => (
          <Sticker key={tech.slug} icon={tech.icon} index={i} total={selectedIcons.length} materialType={tech.material} />
        ))}
      </group>

      {sparklesEnabled ? <Sparkles count={50} scale={8} size={2} speed={0.2} opacity={0.3} color="white" /> : null}
    </group>
  );
};
