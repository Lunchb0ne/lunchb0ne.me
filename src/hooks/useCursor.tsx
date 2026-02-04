import type React from "react";
import { createContext, useContext, useMemo, useState } from "react";

type CursorType = "default" | "hover" | "text" | "hidden";

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  setCursorType: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");

  const value = useMemo(() => ({ cursorType, setCursorType }), [cursorType]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export const useCursor = () => useContext(CursorContext);
