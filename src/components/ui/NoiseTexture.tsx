"use client";

import { memo } from "react";

/**
 * Subtle noise/grain texture overlay for visual depth.
 * Uses SVG filter rendered to a filled rectangle for film grain effect.
 */
export const NoiseTexture = memo(() => (
  <svg
    className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    style={{ mixBlendMode: "soft-light", opacity: 0.25 }}
    aria-hidden="true"
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
));
NoiseTexture.displayName = "NoiseTexture";
