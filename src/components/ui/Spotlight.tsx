import { useEffect, useRef } from "react";

export const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const div = divRef.current;
      const x = e.clientX;
      const y = e.clientY;

      div.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`;
      div.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (divRef.current) {
        divRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={divRef} className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0" />;
};
