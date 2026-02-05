import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { cn } from "@/utils/cn";

// Words that tie into the portfolio themes: distributed systems, open source, databases, innovation
const WORDS = [
  "future",
  "resilient",
  "distributed",
  "scalable",
  "next",
  "edge",
  "fault-tolerant",
  "cloud-native",
  "open source",
  "innovative",
];

export const MorphingWord = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn(className, "relative inline-block translate-y-[-0.05em] leading-normal")}>
      <TextMorph duration={600}>{WORDS[index]}</TextMorph>
    </span>
  );
};
