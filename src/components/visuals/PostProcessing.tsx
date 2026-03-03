import { useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer, LUT, SMAA, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import type { ComponentProps, ComponentType } from "react";
import { memo } from "react";
import { LUTCubeLoader, type LUTCubeResult } from "three/addons/loaders/LUTCubeLoader.js"; // replace deprecated loader with official loader
import { DEFAULT_POST_PROCESSING } from "./config";

export interface PostProcessingProps {
  bloomIntensity: number;
  bloomThreshold: number;
  bloomRadius: number;
  lutEnabled: boolean;
  lutBlend: number;
}

export type PostProcessingControls = typeof DEFAULT_POST_PROCESSING;

const LUT_URL = "/DwlG-F-6800-STD.cube";
// Preload for faster initialization
// use the Three addon loader instead of postprocessing's deprecated one
useLoader.preload(LUTCubeLoader, LUT_URL);

const Noop = () => null;

const LutEffect = LUT as unknown as ComponentType<ComponentProps<typeof LUT> & { opacity?: number }>;

const LutPass = ({ blend }: { blend: number }) => {
  // Three's LUTCubeLoader returns an object containing the texture and metadata.
  const { texture3D: lutTexture } = useLoader(LUTCubeLoader, LUT_URL) as LUTCubeResult;
  return <LutEffect lut={lutTexture} blendFunction={BlendFunction.NORMAL} opacity={blend} />;
};

export const PostProcessing = memo(
  ({ bloomIntensity, bloomThreshold, bloomRadius, lutEnabled, lutBlend }: PostProcessingProps) => (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={bloomThreshold} mipmapBlur intensity={bloomIntensity} radius={bloomRadius} />
      {lutEnabled ? <LutPass blend={lutBlend} /> : <Noop />}
      <SMAA />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  ),
);

PostProcessing.displayName = "PostProcessing";
