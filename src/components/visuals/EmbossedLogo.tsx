import { useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import { CONFIG, logoMaterial } from "./config";

const loader = new SVGLoader();
const shapeCache = new Map<string, THREE.Shape[]>();
const geometryCache = new Map<string, THREE.ExtrudeGeometry>();

const EXTRUDE_SETTINGS = {
  depth: CONFIG.LOGO.EMBOSS_DEPTH,
  bevelEnabled: false,
};

export const EmbossedLogo = ({ svgContent }: { svgContent: string }) => {
  const geometry = useMemo(() => {
    const cachedGeo = geometryCache.get(svgContent);
    if (cachedGeo) return cachedGeo;

    const cachedShapes = shapeCache.get(svgContent);
    let shapes: THREE.Shape[];

    if (cachedShapes) {
      shapes = cachedShapes;
    } else {
      const svgData = loader.parse(svgContent);
      shapes = svgData.paths.flatMap((path) => path.toShapes(true));
      shapeCache.set(svgContent, shapes);
    }

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
