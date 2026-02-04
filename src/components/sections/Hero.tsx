import { ClientHomeScene } from "@/components/visuals/ClientHomeScene";
import { ScrollIndicator } from "@/components/visuals/ScrollIndicator";

export const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] bg-[#050505]">
      {/* Combined Scene */}
      <ClientHomeScene />
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};
