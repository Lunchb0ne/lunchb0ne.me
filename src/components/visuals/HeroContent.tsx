import { Center, Float, Html, MeshTransmissionMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { TextMorph } from "torph/react";
import { useCursor } from "@/hooks/useCursor";
import { CONFIG, TAGLINES, TECH_ICONS } from "./config";
import { Sticker } from "./Sticker";

const PrismMaterial = () => (
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
);

export const HeroContent = ({ onHover }: { onHover: (hover: boolean) => void }) => {
  const meshRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const { setCursorType } = useCursor();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    // Only animate the coin orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const { viewport } = useThree();

  // Fixed sizing values (non-responsive)
  const targetFontSize = 3.5;
  const taglineOffset = -2.3;
  const taglineSize = 16;

  return (
    <group>
      <Center position={[0, 0, -2]}>
        <Text
          fontSize={targetFontSize}
          letterSpacing={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          maxWidth={viewport.width * 0.95}
          fontWeight={800}
          fillOpacity={0}
          strokeWidth={"1%"}
          strokeColor="white"
        >
          ABHISHEK·ARYAN
        </Text>

        {/* 3D-embedded HTML Text Morph */}
        <Html center transform position={[0, taglineOffset, 0]} style={{ opacity: 0.9 }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: `${taglineSize}px`,
              lineHeight: "1.4",
              color: CONFIG.COLORS.GLOW,
              letterSpacing: "0.1em",
              fontWeight: "700",
              whiteSpace: "nowrap",
              textShadow: `0 0 5px ${CONFIG.COLORS.GLOW}66`,
              pointerEvents: "none",
            }}
          >
            <TextMorph>{TAGLINES[taglineIndex]}</TextMorph>
          </div>
        </Html>
      </Center>

      {/* Central Floating Prism */}
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

      {/* Tech Orbit with Stickers */}
      <group ref={orbitRef}>
        {TECH_ICONS.map((tech, i) => (
          <Sticker key={tech.slug} icon={tech.icon} index={i} total={TECH_ICONS.length} />
        ))}
      </group>

      {/* Subtle background particles */}
      <Sparkles count={50} scale={8} size={2} speed={0.2} opacity={0.3} color="white" />
    </group>
  );
};
