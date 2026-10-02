import { useRef } from "react";
import { TextMorph } from "torph/react";
import { useCycle } from "@/hooks/useCycle";
import { cn } from "@/utils/cn";

// Completes "Ready to build something ___?", so every entry must read as an adjective phrase
const WORDS = ["resilient", "fast", "weird", "groundbreaking"] as const;
const INTERVAL_MS = 2500;

export const MorphingWord = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const index = useCycle(ref, WORDS.length, INTERVAL_MS);

  return (
    <span ref={ref} className={cn(className, "relative inline-block leading-normal")}>
      <TextMorph duration={600}>{WORDS[index]}</TextMorph>
    </span>
  );
};
