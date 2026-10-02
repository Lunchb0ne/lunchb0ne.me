import { Link } from "@tanstack/react-router";
import { SECTION_IDS, SECTIONS } from "@/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/utils/cn";

export const Navigation = () => {
  const activeId = useActiveSection(SECTION_IDS);

  const scrollToTop = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between rounded-b-2xl border-white/10 border-b bg-black/60 px-4 py-2 backdrop-blur-md transition-all duration-300">
      <Link
        to="/"
        onClick={scrollToTop}
        className="pointer-events-auto flex shrink-0 cursor-pointer select-none items-center"
      >
        <img
          src="/icon.svg"
          alt="Abhishek Aryan, back to top"
          className="pointer-events-none h-14 w-14 select-none sm:h-18 sm:w-18 md:h-20 md:w-20"
        />
      </Link>
      <div className="pointer-events-auto flex gap-3 font-medium font-mono text-[11px] text-white/70 sm:gap-6 sm:text-xs">
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            to="/"
            hash={section.id}
            className={cn(
              "cursor-pointer uppercase transition-colors hover:text-cyan-400 active:scale-[0.98]",
              activeId === section.id && "text-cyan-400",
            )}
          >
            {section.navLabel}
          </Link>
        ))}
      </div>
    </nav>
  );
};
