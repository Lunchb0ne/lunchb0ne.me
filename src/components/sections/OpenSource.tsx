import { ArrowUpRight, GitFork, Terminal } from "lucide-react";

const OPEN_SOURCE = [
  {
    name: "cmder",
    desc: "Active contributor to popular Windows terminal emulator (25k+ stars). Focused on shell integration and terminal features.",
    link: "https://github.com/cmderdev/cmder",
  },
  {
    name: "RooCode",
    desc: "Added AWS authentication and profile management support. Integrated AWS Bedrock LLM for developer workflows.",
    link: "https://github.com/RooCodeInc/Roo-Code",
  },
];

export const OpenSource = () => {
  return (
    <div className="bg-[#050505] px-8 py-20 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* OSS */}
        <div>
          <h3 className="text-sm font-bold tracking-widest text-white/40 mb-6 uppercase flex items-center gap-2">
            <GitFork className="w-4 h-4" /> Open Source
          </h3>
          <div className="space-y-6">
            {OPEN_SOURCE.map((oss) => (
              <a
                key={oss.name}
                href={oss.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative pl-4 border-l-2 border-white/5 hover:border-cyan-400 transition-all duration-300 hover:pl-6"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{oss.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{oss.desc}</p>
              </a>
            ))}
            <a
              href="https://github.com/lunchb0ne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 mt-4 group"
            >
              VIEW ALL REPOSITORIES{" "}
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Stack */}
        <div>
          <h3 className="text-sm font-bold tracking-widest text-white/40 mb-6 uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Technical Stack
          </h3>
          <div className="grid grid-cols-2 gap-y-8 gap-x-8">
            <div>
              <div className="text-xs text-cyan-500/50 mb-3 font-mono">LANGUAGES</div>
              <div className="text-white/80 text-sm space-y-1 font-mono">
                <div className="hover:text-cyan-200 transition-colors cursor-default">Java</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Go</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Python</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">TypeScript</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Ruby</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">SQL</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-cyan-500/50 mb-3 font-mono">CLOUD & DISTRIBUTED</div>
              <div className="text-white/80 text-sm space-y-1 font-mono">
                <div className="hover:text-cyan-200 transition-colors cursor-default">AWS (RDS, Aurora)</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Distributed Systems</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Service Orchestration</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Event-Driven</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-cyan-500/50 mb-3 font-mono">DATABASES</div>
              <div className="text-white/80 text-sm space-y-1 font-mono">
                <div className="hover:text-cyan-200 transition-colors cursor-default">Aurora Internals</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">MySQL / Postgres</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Replication</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Perf Tuning</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-cyan-500/50 mb-3 font-mono">INFRASTRUCTURE</div>
              <div className="text-white/80 text-sm space-y-1 font-mono">
                <div className="hover:text-cyan-200 transition-colors cursor-default">AWS CDK</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Docker</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Region Automation</div>
                <div className="hover:text-cyan-200 transition-colors cursor-default">Cellular Architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
