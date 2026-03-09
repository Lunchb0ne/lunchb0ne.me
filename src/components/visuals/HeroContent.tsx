import { Float, Html, Instances, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
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
  IS_MOBILE,
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

export interface DodecahedronControls {
  dragRotate: boolean;
  inertia: number;
}

export const DEFAULT_DODECAHEDRON_CONTROLS: DodecahedronControls = {
  dragRotate: true,
  inertia: 0.92,
};

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

export const Dodecahedron = ({
  prism,
  controls = DEFAULT_DODECAHEDRON_CONTROLS,
}: {
  prism?: PrismSettings;
  controls?: DodecahedronControls;
}) => {
  const setCursorType = useSetCursorType();
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => new THREE.DodecahedronGeometry(1.4, 0), []);
  const lastPointer = useRef<[number, number]>([0, 0]);
  const dragging = useRef(false);
  const velocity = useRef<[number, number]>([0, 0]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!controls.dragRotate) return;
    event.stopPropagation();
    dragging.current = true;
    lastPointer.current = [event.clientX, event.clientY];
    velocity.current = [0, 0];
  };

  const onPointerUp = () => {
    if (!controls.dragRotate) return;
    dragging.current = false;
  };

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!controls.dragRotate || !dragging.current || !meshRef.current) return;
    const [lastX, lastY] = lastPointer.current;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastPointer.current = [event.clientX, event.clientY];
    velocity.current = [dy * 0.0025, dx * 0.0025];
    meshRef.current.rotation.x += velocity.current[0];
    meshRef.current.rotation.y += velocity.current[1];
  };

  useFrame(() => {
    if (!meshRef.current) return;
    if (!dragging.current) {
      meshRef.current.rotation.y += 0.003;
      velocity.current[0] *= controls.inertia;
      velocity.current[1] *= controls.inertia;
      meshRef.current.rotation.x += velocity.current[0];
      meshRef.current.rotation.y += velocity.current[1];
    }
    meshRef.current.rotation.x = THREE.MathUtils.clamp(meshRef.current.rotation.x, -Math.PI / 2, Math.PI / 2);
  });

  return (
    <Float speed={5} rotationIntensity={0.35} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setCursorType("hover")}
        onPointerOut={() => setCursorType("default")}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <primitive object={geometry} attach="geometry" />
        <PrismMaterial {...prism} />
      </mesh>
    </Float>
  );
};

export const HeroContent = ({ sparklesEnabled = true }: { sparklesEnabled?: boolean }) => {
  const orbitRef = useRef<Group>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Simple, readable selection of icons
  const selectedIcons = useMemo(
    () =>
      shuffleArray(ALL_TECH_ICONS)
        .slice(0, ICON_COUNT)
        .map((icon) => ({ ...icon, material: randomMaterial() })),
    [],
  );

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
        {COIN_MATERIAL_KEYS.map((matKey) => (
          <Instances key={matKey} geometry={coinGeometry} material={COIN_MATERIALS[matKey]}>
            {selectedIcons
              .filter((tech) => tech.material === matKey)
              .map((tech) => (
                <Sticker key={tech.slug} icon={tech.icon} index={selectedIcons.indexOf(tech)} total={ICON_COUNT} />
              ))}
          </Instances>
        ))}
      </group>

      {sparklesEnabled && (
        <Sparkles
          count={IS_MOBILE ? 20 : 50}
          scale={8}
          size={IS_MOBILE ? 1.5 : 2}
          speed={0.2}
          opacity={0.3}
          color="white"
        />
      )}
    </group>
  );
};
