import { useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { CONFIG, logoMaterial } from "./config";

const loader = new SVGLoader();
const geometryCache = new Map<string, THREE.ExtrudeGeometry>();

const EXTRUDE_SETTINGS = {
  depth: CONFIG.LOGO.EMBOSS_DEPTH,
  bevelEnabled: false,
};

export const EmbossedLogo = ({ svgContent }: { svgContent: string }) => {
  const geometry = useMemo(() => {
    const cachedGeo = geometryCache.get(svgContent);
    if (cachedGeo) return cachedGeo;

    const shapes = loader.parse(svgContent).paths.flatMap((path) => path.toShapes());

    const geo = new THREE.ExtrudeGeometry(shapes, EXTRUDE_SETTINGS);
    geo.center();
    geo.computeBoundingBox();

    const box = geo.boundingBox;
    if (box) {
      const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y);
      if (maxDim > 0) {
        const targetSize = CONFIG.COIN.RADIUS * 2 * CONFIG.LOGO.SCALE_FACTOR;
        const scaleFactor = targetSize / maxDim;
        geo.scale(scaleFactor, scaleFactor, scaleFactor * 0.5);
      }
    }

    geometryCache.set(svgContent, geo);
    return geo;
  }, [svgContent]);

  return <mesh material={logoMaterial} rotation={[Math.PI, 0, 0]} geometry={geometry} />;
};
