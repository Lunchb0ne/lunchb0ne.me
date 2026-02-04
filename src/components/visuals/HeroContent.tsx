import { Center, Float, Html, MeshTransmissionMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { TextMorph } from "torph/react";
import { useCursor } from "@/hooks/useCursor";
import { CONFIG, TAGLINES, TECH_ICONS } from "./config";
import { Sticker } from "./Sticker";

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

export const HeroContent = ({ onHover }: { onHover: (hover: boolean) => void }) => {
  const meshRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const { setCursorType } = useCursor();
  const [taglineIndex, setTaglineIndex] = useState(0);

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

  const { viewport } = useThree();
  const targetFontSize = 3.5;
  const taglineOffset = -2.3;

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

        <Html center position={[0, taglineOffset, 0]} className="pointer-events-none">
          <div style={TAGLINE_CONTAINER_STYLE}>
            <TextMorph duration={600}>{TAGLINES[taglineIndex]}</TextMorph>
          </div>
        </Html>
      </Center>

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
        {TECH_ICONS.map((tech, i) => (
          <Sticker key={tech.slug} icon={tech.icon} index={i} total={TECH_ICONS.length} />
        ))}
      </group>

      <Sparkles count={50} scale={8} size={2} speed={0.2} opacity={0.3} color="white" />
    </group>
  );
};
