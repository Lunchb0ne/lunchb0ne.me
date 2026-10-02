import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { cn } from "@/utils/cn";

// Completes "Ready to build something ___?", so every entry must read as an adjective phrase
const WORDS = ["resilient", "fast", "weird", "groundbreaking"] as const;
const INTERVAL_MS = 2500;

export const MorphingWord = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={cn(className, "relative inline-block leading-normal")}>
      <TextMorph duration={600}>{WORDS[index]}</TextMorph>
    </span>
  );
};
