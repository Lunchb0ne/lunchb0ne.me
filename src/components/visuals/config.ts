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
    RADIUS: 0.8,
    DEPTH: 0.08,
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
    RADIUS: 3.1,
    FLOAT_SPEED: 2,
  },
  PRISM: {
    SAMPLES: 16,
    RESOLUTION: 512,
    TRANSMISSION: 0.95,
    ROUGHNESS: 0.05,
    IOR: 2.6,
    THICKNESS: 1.5,
    CHROMATIC_ABERRATION: 0.8,
    ANISOTROPY: 0.4,
  },
  ANIMATION: {
    TRANSITION_SPEED: 0.1,
    HOVER_SCALE: 1.3,
    TILT_INTENSITY: 0.5,
  },
} as const;

export const HERO_MARQUEE_FONT_SIZE = 3.5;

// Full list of tech icons - random selection happens client-side in HeroContent
export const ALL_TECH_ICONS = [
  { slug: "java", icon: siOpenjdk },
  { slug: "go", icon: siGo },
  { slug: "typescript", icon: siTypescript },
  { slug: "python", icon: siPython },
  { slug: "ruby", icon: siRuby },
  { slug: "kubernetes", icon: siKubernetes },
  { slug: "docker", icon: siDocker },
  { slug: "serverless", icon: siServerless },
  { slug: "react", icon: siReact },
  { slug: "nextjs", icon: siNextdotjs },
  { slug: "tailwind", icon: siTailwindcss },
  { slug: "threejs", icon: siThreedotjs },
  { slug: "postgres", icon: siPostgresql },
  { slug: "mysql", icon: siMysql },
];

// Number of icons to display (randomly selected on each page load)
export const ICON_COUNT = 6;

// First line carries identity: most visitors only see one or two before scrolling.
export const TAGLINES = [
  "SOFTWARE ENGINEER · AWS RDS & AURORA",
  "THE CONTROL PLANE BEHIND YOUR DATABASE",
  "UPGRADES IN UNDER A MINUTE",
  "SIMPLE SYSTEMS THAT STAY UP",
  "OPEN SOURCE ON THE SIDE",
];

export const HERO_TAGLINE_INTERVAL_MS = 3000;

export const IS_MOBILE = typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false;

export const CANVAS_GL_CONFIG = {
  antialias: false,
  alpha: true,
  powerPreference: "high-performance",
} as const;

export const CANVAS_PERFORMANCE_CONFIG = { min: 0.5 } as const;
export const BACKGROUND_COLOR = ["#050505"] as [string];

export const DEFAULT_POST_PROCESSING = {
  bloomIntensity: 0.7,
  bloomThreshold: 1.2,
  bloomRadius: 0.5,
  lutEnabled: true,
  lutBlend: 0.7,
} as const;

export const DEFAULT_SCENE_CONTROLS = {
  prismColor: CONFIG.COLORS.PRISM,
  prismTransmission: CONFIG.PRISM.TRANSMISSION,
  prismIor: CONFIG.PRISM.IOR,
  prismThickness: CONFIG.PRISM.THICKNESS,
  keyLightIntensity: 4,
  glowLightIntensity: 2,
  warmLightIntensity: 2,
} as const;

export type SceneControls = typeof DEFAULT_SCENE_CONTROLS;

// Shared geometry and materials, created once at module load

export const coinGeometry = new THREE.CylinderGeometry(
  CONFIG.COIN.RADIUS,
  CONFIG.COIN.RADIUS,
  CONFIG.COIN.DEPTH,
  CONFIG.COIN.SEGMENTS,
);

// Premium metal material variants
export const COIN_MATERIALS = {
  // chrome/silver
  chrome: new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.15,
    metalness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  }),
  // gold
  gold: new THREE.MeshPhysicalMaterial({
    color: "#d4a853",
    roughness: 0.2,
    metalness: 1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    reflectivity: 1,
  }),
  // Titanium (darker, more matte)
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
