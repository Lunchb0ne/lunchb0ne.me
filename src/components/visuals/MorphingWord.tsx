import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { cn } from "@/utils/cn";

// Words that tie into the portfolio themes: distributed systems, open source, databases, innovation
const WORDS = ["Future", "Resilient", "Distributed", "Scalable", "Next", "Edge", "OpenSource", "Innovative"];

export const MorphingWord = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn(className, "relative inline-block leading-normal")}>
      <TextMorph duration={600}>{WORDS[index]}</TextMorph>
    </span>
  );
};
