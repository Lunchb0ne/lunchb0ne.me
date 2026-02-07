import { useCursorPosition, useCursorType } from "@/hooks/useCursor";

const CURSOR_STYLES = {
  default: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
  hover: {
    width: 28,
    height: 28,
    borderRadius: "50%",
  },
  text: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  hidden: {
    width: 0,
    height: 0,
    borderRadius: "50%",
  },
} as const;

// Subtle spring-like easing with slight overshoot
const CURSOR_TRANSITION =
  "width 200ms cubic-bezier(0.34, 1.56, 0.64, 1), height 200ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease-out";

export const CustomCursor = () => {
  const cursorType = useCursorType();
  const position = useCursorPosition();

  if (cursorType === "hidden") {
    return null;
  }

  const style = CURSOR_STYLES[cursorType];
  const isHover = cursorType === "hover";

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-9999"
      style={{
        transform: `translate(${position.x - style.width / 2}px, ${position.y - style.height / 2}px)`,
        width: style.width,
        height: style.height,
        borderRadius: style.borderRadius,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: isHover
          ? "0 0 12px rgba(34, 211, 238, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.05)"
          : "inset 0 0 10px rgba(255, 255, 255, 0.05)",
        transition: CURSOR_TRANSITION,
      }}
    />
  );
};
