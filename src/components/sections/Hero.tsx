import { ClientHomeScene } from "@/components/visuals/ClientHomeScene";
import { ScrollIndicator } from "@/components/visuals/ScrollIndicator";

export const Hero = () => {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-surface">
      {/* The visible name is WebGL text, so give crawlers and screen readers a real heading */}
      <h1 className="sr-only">Abhishek Aryan, software engineer on the AWS RDS &amp; Aurora control plane</h1>
      {/* Combined Scene */}
      <ClientHomeScene />
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};
