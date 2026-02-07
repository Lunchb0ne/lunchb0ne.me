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
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between rounded-b-2xl bg-black/20 px-4 py-2 bg-blend-darken backdrop-blur-lg">
      <Link to="/" onClick={scrollToTop} className="pointer-events-auto flex cursor-pointer select-none items-center">
        <img src="/icon.svg" alt="Abhishek Aryan" className="pointer-events-none h-18 w-18 select-none md:h-20 md:w-20" />
      </Link>
      <div className="pointer-events-auto flex gap-6 font-medium font-mono text-white/70 text-xs">
        {CONFIG.LINKS.map((link) => (
          <Link key={link.label} to="/" hash={link.hash} className="cursor-pointer transition-colors hover:text-cyan-400">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
