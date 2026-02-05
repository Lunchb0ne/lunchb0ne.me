import { ClientHomeScene } from "@/components/visuals/ClientHomeScene";
import { ScrollIndicator } from "@/components/visuals/ScrollIndicator";

export const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Combined Scene */}
      <ClientHomeScene rootMargin="1200px" />
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};
