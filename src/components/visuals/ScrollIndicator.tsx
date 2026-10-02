import { ArrowDownIcon } from "@phosphor-icons/react";

export const ScrollIndicator = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-12 z-30 flex justify-center">
    <div className="flex flex-col items-center gap-2 text-white/30 motion-safe:animate-nudge">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <ArrowDownIcon className="h-4 w-4" />
    </div>
  </div>
);
