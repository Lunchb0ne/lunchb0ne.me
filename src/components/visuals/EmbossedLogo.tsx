import { useLayoutEffect, useMemo, useRef } from "react";
import type * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import { CONFIG, logoMaterial } from "./config";

const loader = new SVGLoader();
const shapeCache = new Map<string, THREE.Shape[]>();

const EXTRUDE_SETTINGS = {
  depth: CONFIG.LOGO.EMBOSS_DEPTH,
  bevelEnabled: false,
};

export const EmbossedLogo = ({ svgContent }: { svgContent: string }) => {
  const shapes = useMemo(() => {
    const cached = shapeCache.get(svgContent);
    if (cached) return cached;

    const svgData = loader.parse(svgContent);
    const parsedShapes = svgData.paths.flatMap((path) => path.toShapes(true));
    shapeCache.set(svgContent, parsedShapes);
    return parsedShapes;
  }, [svgContent]);

  const geometryRef = useRef<THREE.ExtrudeGeometry>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We need to re-run when shapes change as it triggers geometry recreation
  useLayoutEffect(() => {
    if (geometryRef.current) {
      const geo = geometryRef.current;
      geo.center();
      geo.computeBoundingBox();

      const box = geo.boundingBox;
      if (!box) return;

      const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y);
      if (maxDim === 0) return; // Guard against division by zero

      const targetSize = CONFIG.COIN.RADIUS * 2 * CONFIG.LOGO.SCALE_FACTOR;
      const scaleFactor = targetSize / maxDim;

      geo.scale(scaleFactor, scaleFactor, scaleFactor * 0.5);
    }
  }, [shapes]);

  return (
    <mesh material={logoMaterial} rotation={[Math.PI, 0, 0]}>
      <extrudeGeometry ref={geometryRef} args={[shapes, EXTRUDE_SETTINGS]} />
    </mesh>
  );
};
