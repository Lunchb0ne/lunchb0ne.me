import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2 py-1 font-mono text-white/40 text-xs transition-colors",
      className,
    )}
  >
    {children}
  </span>
);
