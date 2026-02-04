import { useLayoutEffect, useMemo, useRef } from "react";
import type * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import { CONFIG, logoMaterial } from "./config";

export const EmbossedLogo = ({ svgContent }: { svgContent: string }) => {
  const shapes = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(svgContent);
    return svgData.paths.flatMap((path) => path.toShapes(true));
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
      const targetSize = CONFIG.COIN.RADIUS * 2 * CONFIG.LOGO.SCALE_FACTOR;
      const scaleFactor = targetSize / maxDim;

      geo.scale(scaleFactor, scaleFactor, scaleFactor * 0.5);
    }
  }, [shapes]);

  const extrudeSettings = useMemo(
    () => ({
      depth: CONFIG.LOGO.EMBOSS_DEPTH,
      bevelEnabled: false,
    }),
    [],
  );

  return (
    <mesh material={logoMaterial} rotation={[Math.PI, 0, 0]}>
      <extrudeGeometry ref={geometryRef} args={[shapes, extrudeSettings]} />
    </mesh>
  );
};
