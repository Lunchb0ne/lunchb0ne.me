import { ClientHomeScene } from "@/components/visuals/ClientHomeScene";
import { ScrollIndicator } from "@/components/visuals/ScrollIndicator";

export const Hero = () => {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-surface">
      {/* Combined Scene */}
      <ClientHomeScene rootMargin="1200px" />
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};
