import { Float, Html, Instances, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { TextMorph } from "torph/react";
import { useSetCursorType } from "@/hooks/useCursor";
import {
  ALL_TECH_ICONS,
  COIN_MATERIAL_KEYS,
  COIN_MATERIALS,
  CONFIG,
  coinGeometry,
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

export interface PrismSettings {
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

export const Dodecahedron = ({ onHover, prism }: { onHover: (hover: boolean) => void; prism?: PrismSettings }) => {
  const setCursorType = useSetCursorType();

  return (
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
  );
};

export const HeroContent = ({ sparklesEnabled = true }: { sparklesEnabled?: boolean }) => {
  const orbitRef = useRef<Group>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Random icon selection on mount (client-side only)
  const groupedIcons = useMemo(() => {
    const selected = shuffleArray(ALL_TECH_ICONS)
      .slice(0, ICON_COUNT)
      .map((icon) => ({ ...icon, material: randomMaterial() }));

    return COIN_MATERIAL_KEYS.map((matKey) => ({
      matKey,
      icons: selected
        .filter((tech) => tech.material === matKey)
        .map((tech) => ({ ...tech, globalIndex: selected.indexOf(tech) })),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, HERO_TAGLINE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1;
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

      <group ref={orbitRef}>
        {groupedIcons.map(({ matKey, icons }) => (
          <Instances key={matKey} geometry={coinGeometry} material={COIN_MATERIALS[matKey]}>
            {icons.map((tech) => (
              <Sticker key={tech.slug} icon={tech.icon} index={tech.globalIndex} total={ICON_COUNT} />
            ))}
          </Instances>
        ))}
      </group>

      {sparklesEnabled && <Sparkles count={50} scale={8} size={2} speed={0.2} opacity={0.3} color="white" />}
    </group>
  );
};
