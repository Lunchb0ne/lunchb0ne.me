"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";

const WORDS = ["future", "next", "weird", "cool", "new"];

export const MorphingWord = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${className} inline-flex items-center justify-center min-w-[1.2em]`}>
      <TextMorph duration={500}>{WORDS[index]}</TextMorph>
    </div>
  );
};
