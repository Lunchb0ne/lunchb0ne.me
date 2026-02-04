"use client";

import {
  Center,
  Environment,
  Float,
  Html,
  Lightformer,
  MeshTransmissionMaterial,
  Sparkles,
  Text,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch, SMAA, ToneMapping } from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { TextMorph } from "torph/react";
import { useCursor } from "@/hooks/useCursor";

// Reuse these instead of creating new ones for every sticker
const coinGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.04, 64);
const coinMaterial = new THREE.MeshPhysicalMaterial({
  color: "#eeeeee",
  roughness: 0.2,
  metalness: 1,
  ior: 1.5,
  reflectivity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});

const rimGeometry = new THREE.CylinderGeometry(0.64, 0.64, 0.02, 64);
const rimMaterial = new THREE.MeshStandardMaterial({
  color: "#ddd",
  roughness: 1,
});

const logoGeometry = new THREE.CircleGeometry(0.65, 64);

const PrismMaterial = () => (
  <MeshTransmissionMaterial
    backside={true}
    samples={4} // Reduced from 6 (visually similar, much faster)
    resolution={256} // Reduced from 512 (blur hides the lower res)
    transmission={0.95}
    roughness={0.05}
    ior={1.6}
    thickness={2.5}
    chromaticAberration={0.4}
    anisotropy={0.3}
    color="#e2e8f0"
  />
);

const TECH_ICONS = [
  { slug: "amazonaws", name: "AWS" },
  { slug: "react", name: "React" },
  { slug: "go", name: "Go" },
  { slug: "docker", name: "Docker" },
  { slug: "kubernetes", name: "K8s" },
  { slug: "openjdk", name: "Java" },
];

const Sticker = ({ slug, index, total }: { slug: string; index: number; total: number }) => {
  const texture = useTexture(`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`);
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const { setCursorType } = useCursor();

  const angle = (index / total) * Math.PI * 2;
  const radius = 3.8;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const y = Number(index % 2 === 0 ? 1 : -1);

  // Refs for smoothing & optimization (avoiding GC churn)
  // Use useMemo to avoid creating new instances on every render
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const lookAtQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tiltQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const currentRotBackup = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Scale Transition (Smooth Lerp) with shared vector
    const targetScale = hovered ? 1.3 : 1;
    tempVec.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(tempVec, 0.1);

    // 2. Rotation Logic: Slerp between "LookAt Center" and "LookAt Mouse"

    // A. Calculate "LookAt Center" rotation
    currentRotBackup.copy(meshRef.current.quaternion); // Save state before lookAt
    meshRef.current.lookAt(0, 0, 0);
    lookAtQuaternion.copy(meshRef.current.quaternion);
    meshRef.current.quaternion.copy(currentRotBackup); // Restore

    // B. Calculate "Tilt Towards Mouse" rotation (if hovered)
    if (hovered) {
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;

      // Reuse tempEuler to avoid object creation
      tempEuler.set(-mouseY * 0.5, mouseX * 0.5, 0);
      tiltQuaternion.setFromEuler(tempEuler);

      // Combine LookAt + Tilt
      targetQuaternion.copy(lookAtQuaternion);
      targetQuaternion.multiply(tiltQuaternion);
    } else {
      targetQuaternion.copy(lookAtQuaternion);
    }

    // C. Apply Smooth Slerp
    meshRef.current.quaternion.slerp(targetQuaternion, 0.1);
  });

  return (
    <group position={[x, y, z]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
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
          {/* Metallic Coin Core (Reused Geometry/Material) */}
          <mesh rotation={[Math.PI / 2, 0, 0]} geometry={coinGeometry} material={coinMaterial} />

          {/* Sticker Rim (Reused Geometry/Material) */}
          <mesh position={[0, 0, -0.025]} rotation={[Math.PI / 2, 0, 0]} geometry={rimGeometry} material={rimMaterial} />

          {/* Front Logo (Reused Geometry) */}
          <mesh position={[0, 0, 0.021]} geometry={logoGeometry}>
            <meshPhysicalMaterial
              map={texture}
              bumpMap={texture}
              bumpScale={0.05}
              transparent
              opacity={0.9}
              roughness={0.3}
              metalness={0.6}
              toneMapped={false}
              color="#222"
            />
          </mesh>

          {/* Back Logo (Reused Geometry) */}
          <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]} geometry={logoGeometry}>
            <meshPhysicalMaterial
              map={texture}
              bumpMap={texture}
              bumpScale={0.05}
              transparent
              opacity={0.9}
              roughness={0.3}
              metalness={0.6}
              toneMapped={false}
              color="#222"
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

const TAGLINES = [
  "ARCHITECTING RESILIENT DISTRIBUTED SYSTEMS",
  "DISTRIBUTED SYSTEMS AT CLOUD SCALE",
  "CLOUD SCALE DATABASE INTERNALS",
  "DATABASE INTERNALS & HIGH AVAILABILITY",
  "HIGH AVAILABILITY AT THE EDGE",
  "COMPUTING THROUGH OPEN SOURCE",
  "OPEN SOURCE DISTRIBUTED SYSTEMS",
];

const HeroStickers = ({ onHover }: { onHover: (hover: boolean) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const { setCursorType } = useCursor();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Faster, more chaotic rotation
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.3;

    if (orbitRef.current) {
      // Orbit rotation
      orbitRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      <Center position={[0, 0, -2]}>
        <Text
          fontSize={3.5}
          letterSpacing={-0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
          fillOpacity={0} // Keep outline style
          strokeWidth={"1%"}
          strokeColor="white"
        >
          ABHISHEK
        </Text>

        {/* 3D-embedded HTML Text Morph */}
        <Html
          transform
          position={[0, -2.5, 0]}
          center
          style={{
            // Fix blurriness in some browsers
            transform: "scale(1)",
            opacity: 0.9,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "24px",
              color: "#a5f3fc",
              letterSpacing: "0.2em",
              fontWeight: "500",
              whiteSpace: "nowrap",
              textAlign: "center",
              width: "800px", // Provide width to prevent layout shifts
            }}
          >
            <TextMorph>{TAGLINES[taglineIndex]}</TextMorph>
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

      {/* Tech Orbit with Stickers */}
      <group ref={orbitRef}>
        {TECH_ICONS.map((tech, i) => (
          <Sticker key={tech.slug} slug={tech.slug} index={i} total={TECH_ICONS.length} />
        ))}
      </group>

      {/* Subtle background particles */}
      <Sparkles count={30} scale={8} size={2} speed={0.2} opacity={0.3} color="white" />
    </group>
  );
};

const Lights = () => (
  <Environment resolution={512}>
    <group rotation={[-Math.PI / 4, -0.3, 0]}>
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#a5f3fc" />
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.1, 1]} color="#fcb69f" />
    </group>
  </Environment>
);

export const HomeScene = () => {
  const [hoverGlitch, setHoverGlitch] = useState(false);

  // Leva controls for debugging and tweaking
  const { bloomIntensity, bloomThreshold, bloomRadius, glitchStrength, glitchRatio } = useControls("Post Processing", {
    bloomIntensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    bloomThreshold: { value: 1.5, min: 0, max: 3, step: 0.1 },
    bloomRadius: { value: 0.6, min: 0, max: 1, step: 0.05 },
    glitchStrength: { value: 0.4, min: 0, max: 1, step: 0.1 },
    glitchRatio: { value: 0.85, min: 0, max: 1, step: 0.05 },
  });

  return (
    <>
      <Leva hidden={import.meta.env.PROD} />
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <color attach="background" args={["#050505"]} />
        <Suspense fallback={null}>
          <HeroStickers onHover={setHoverGlitch} />

          <Lights />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={bloomThreshold} mipmapBlur intensity={bloomIntensity} radius={bloomRadius} />
            <Glitch
              active={hoverGlitch}
              delay={new THREE.Vector2(0, 0)}
              duration={new THREE.Vector2(0.1, 0.3)}
              strength={new THREE.Vector2(0.2, glitchStrength)}
              ratio={glitchRatio}
            />
            <SMAA />
            <ToneMapping />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
};
