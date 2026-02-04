import * as SI from "simple-icons";
import * as THREE from "three";

export const CONFIG = {
  COLORS: {
    BACKGROUND: "#050505",
    METAL_BASE: "#ffffff",
    GLOW: "#a5f3fc",
    PRISM: "#e2e8f0",
    MATRIX: "#00ff41",
    RIBBON: "#ff00ff",
  },
  COIN: {
    RADIUS: 0.7,
    DEPTH: 0.1,
    SEGMENTS: 64,
    ROUGHNESS: 0.15,
    METALNESS: 1,
    CLEARCOAT: 1,
    CLEARCOAT_ROUGHNESS: 0.1,
  },
  LOGO: {
    ROUGHNESS: 0.3,
    METALNESS: 1,
    CLEARCOAT: 0.5,
    CLEARCOAT_ROUGHNESS: 0.2,
    EMBOSS_DEPTH: 2,
    SCALE_FACTOR: 0.75,
    Z_OFFSET: 0.06,
  },
  ORBIT: {
    RADIUS: 3.2,
    SPEED: 0.1,
    FLOAT_SPEED: 2,
    FLOAT_INTENSITY: 0.4,
  },
  PRISM: {
    SAMPLES: 4,
    RESOLUTION: 256,
    TRANSMISSION: 0.95,
    ROUGHNESS: 0.05,
    IOR: 1.6,
    THICKNESS: 2.5,
    CHROMATIC_ABERRATION: 0.4,
    ANISOTROPY: 0.3,
  },
  ANIMATION: {
    TRANSITION_SPEED: 0.1,
    HOVER_SCALE: 1.3,
    TILT_INTENSITY: 0.5,
  },
} as const;

// Sample 7 random icons from this
export const TECH_ICONS = [
  { slug: "java", icon: SI.siOpenjdk, name: "Java" },
  { slug: "go", icon: SI.siGo, name: "Go" },
  { slug: "typescript", icon: SI.siTypescript, name: "TypeScript" },
  { slug: "python", icon: SI.siPython, name: "Python" },
  { slug: "ruby", icon: SI.siRuby, name: "Ruby" },
  { slug: "kubernetes", icon: SI.siKubernetes, name: "Kubernetes" },
  { slug: "docker", icon: SI.siDocker, name: "Docker" },
  { slug: "serverless", icon: SI.siServerless, name: "Serverless" },
  { slug: "react", icon: SI.siReact, name: "React" },
  { slug: "nextjs", icon: SI.siNextdotjs, name: "Next.js" },
  { slug: "tailwind", icon: SI.siTailwindcss, name: "Tailwind" },
  { slug: "threejs", icon: SI.siThreedotjs, name: "Three.js" },
  { slug: "postgres", icon: SI.siPostgresql, name: "PostgreSQL" },
  { slug: "mysql", icon: SI.siMysql, name: "MySQL" },
]
  .filter((item) => !!item.icon)
  .sort(() => Math.random() - 0.5)
  .slice(0, 7);

export const TAGLINES = [
  "ARCHITECTING RESILIENT DISTRIBUTED SYSTEMS",
  "DISTRIBUTED SYSTEMS AT CLOUD SCALE",
  "CLOUD SCALE DATABASE INTERNALS",
  "DATABASE INTERNALS & HIGH AVAILABILITY",
  "HIGH AVAILABILITY AT THE EDGE",
  "COMPUTING THROUGH OPEN SOURCE",
  "OPEN SOURCE DISTRIBUTED SYSTEMS",
];

// Shared Geometries and Materials
// We create these once here to avoid recreation on every render/mount if possible,
// or at least have a central definition.
// Note: In strict R3F, creating these outside component might be anti-pattern if they depend on context,
// but for standard materials it's fine and efficient.

export const coinGeometry = new THREE.CylinderGeometry(
  CONFIG.COIN.RADIUS,
  CONFIG.COIN.RADIUS,
  CONFIG.COIN.DEPTH,
  CONFIG.COIN.SEGMENTS,
);

export const coinMaterial = new THREE.MeshPhysicalMaterial({
  color: CONFIG.COLORS.METAL_BASE,
  roughness: CONFIG.COIN.ROUGHNESS,
  metalness: CONFIG.COIN.METALNESS,
  clearcoat: CONFIG.COIN.CLEARCOAT,
  clearcoatRoughness: CONFIG.COIN.CLEARCOAT_ROUGHNESS,
  reflectivity: 1,
});

export const logoMaterial = new THREE.MeshPhysicalMaterial({
  color: CONFIG.COLORS.METAL_BASE,
  roughness: CONFIG.LOGO.ROUGHNESS,
  metalness: CONFIG.LOGO.METALNESS,
  clearcoat: CONFIG.LOGO.CLEARCOAT,
  clearcoatRoughness: CONFIG.LOGO.CLEARCOAT_ROUGHNESS,
});
