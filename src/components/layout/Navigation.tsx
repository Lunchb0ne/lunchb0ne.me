import { Link } from "@tanstack/react-router";

const CONFIG = {
  LINKS: [
    { label: "ABOUT", hash: "about" },
    { label: "EXP.", hash: "experience" },
    { label: "PROJECTS", hash: "projects" },
    { label: "SKILLS", hash: "skills" },
    { label: "CONTACT", hash: "contact" },
  ],
} as const;

export const Navigation = () => {
  const scrollToTop = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 p-8 flex justify-between items-center z-50 pointer-events-none">
      <Link
        to="/"
        onClick={scrollToTop}
        className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer font-mono"
      >
        AA.
      </Link>
      <div className="flex gap-6 text-xs font-mono font-medium pointer-events-auto text-white/70">
        {CONFIG.LINKS.map((link) => (
          <Link key={link.label} to="/" hash={link.hash} className="hover:text-cyan-400 transition-colors cursor-pointer">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
