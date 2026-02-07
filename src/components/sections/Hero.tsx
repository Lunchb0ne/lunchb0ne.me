import { ClientHomeScene } from "@/components/visuals/ClientHomeScene";
import { ScrollIndicator } from "@/components/visuals/ScrollIndicator";

export const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Combined Scene */}
      <ClientHomeScene rootMargin="1200px" />
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};
