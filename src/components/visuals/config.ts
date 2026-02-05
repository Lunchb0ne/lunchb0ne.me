import {
  siDocker,
  siGo,
  siKubernetes,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRuby,
  siServerless,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
} from "simple-icons";
import * as THREE from "three";

export const CONFIG = {
  COLORS: {
    METAL_BASE: "#ffffff",
    GLOW: "#a5f3fc",
    PRISM: "#e2e8f0",
  },
  COIN: {
    RADIUS: 0.7,
    DEPTH: 0.1,
    SEGMENTS: 64,
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

// Full list of tech icons - random selection happens client-side in HeroContent
export const ALL_TECH_ICONS = [
  { slug: "java", icon: siOpenjdk, name: "Java" },
  { slug: "go", icon: siGo, name: "Go" },
  { slug: "typescript", icon: siTypescript, name: "TypeScript" },
  { slug: "python", icon: siPython, name: "Python" },
  { slug: "ruby", icon: siRuby, name: "Ruby" },
  { slug: "kubernetes", icon: siKubernetes, name: "Kubernetes" },
  { slug: "docker", icon: siDocker, name: "Docker" },
  { slug: "serverless", icon: siServerless, name: "Serverless" },
  { slug: "react", icon: siReact, name: "React" },
  { slug: "nextjs", icon: siNextdotjs, name: "Next.js" },
  { slug: "tailwind", icon: siTailwindcss, name: "Tailwind" },
  { slug: "threejs", icon: siThreedotjs, name: "Three.js" },
  { slug: "postgres", icon: siPostgresql, name: "PostgreSQL" },
  { slug: "mysql", icon: siMysql, name: "MySQL" },
];

// Number of icons to display (randomly selected on each page load)
export const ICON_COUNT = 6;

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

// Premium metal material variants
export const COIN_MATERIALS = {
  // Classic chrome/silver
  chrome: new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.15,
    metalness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  }),
  // Premium gold
  gold: new THREE.MeshPhysicalMaterial({
    color: "#d4a853",
    roughness: 0.2,
    metalness: 1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    reflectivity: 1,
  }),
  // Titanium silver (darker, more matte)
  titanium: new THREE.MeshPhysicalMaterial({
    color: "#8a9a9a",
    roughness: 0.35,
    metalness: 0.9,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
    reflectivity: 0.8,
  }),
} as const;

export const COIN_MATERIAL_KEYS = Object.keys(COIN_MATERIALS) as (keyof typeof COIN_MATERIALS)[];

export const logoMaterial = new THREE.MeshPhysicalMaterial({
  color: CONFIG.COLORS.METAL_BASE,
  roughness: CONFIG.LOGO.ROUGHNESS,
  metalness: CONFIG.LOGO.METALNESS,
  clearcoat: CONFIG.LOGO.CLEARCOAT,
  clearcoatRoughness: CONFIG.LOGO.CLEARCOAT_ROUGHNESS,
});
