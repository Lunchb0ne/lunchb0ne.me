"use client";

import { useEffect, useState } from "react";
import { HomeScene } from "@/components/visuals/HomeScene";

export const ClientHomeScene = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div className="absolute inset-0 z-0">{mounted && <HomeScene />}</div>;
};
