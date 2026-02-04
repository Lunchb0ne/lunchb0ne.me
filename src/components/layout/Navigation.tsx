const CONFIG = {
  LINKS: [
    { label: "ABOUT", href: "#about" },
    { label: "EXP.", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ],
} as const;

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
      <div className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer font-mono">AA.</div>
      <div className="flex gap-6 text-xs font-mono font-medium pointer-events-auto text-white/70">
        {CONFIG.LINKS.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-cyan-400 transition-colors cursor-pointer">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
