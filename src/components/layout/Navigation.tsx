export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
      <div className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer font-mono">AA.</div>
      <div className="flex gap-6 text-xs font-mono font-medium pointer-events-auto text-white/70">
        <a href="#about" className="hover:text-cyan-400 transition-colors cursor-pointer">
          ABOUT
        </a>
        <a href="#experience" className="hover:text-cyan-400 transition-colors cursor-pointer">
          EXP.
        </a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors cursor-pointer">
          PROJECTS
        </a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors cursor-pointer">
          SKILLS
        </a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors cursor-pointer">
          CONTACT
        </a>
      </div>
    </nav>
  );
};
