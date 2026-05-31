import { useEffect, useRef, useState } from "react";
import { TextMorph } from "torph/react";
import { cn } from "@/utils/cn";

// Adjectives that complete "Ready to build something ___?"
const WORDS = ["resilient", "scalable", "weird", "fast", "that lasts", "impossible"] as const;
const INTERVAL_MS = 2500;

export const MorphingWord = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span className={cn(className, "relative inline-block leading-normal")}>
      <TextMorph duration={600}>{WORDS[index]}</TextMorph>
    </span>
  );
};
