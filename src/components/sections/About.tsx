import { Code2, Globe, Heart } from "lucide-react";

export const About = () => {
  return (
    <div className="relative z-10 bg-[#050505] px-8 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16">
          <h2 className="text-3xl font-light tracking-tight text-white/90">About Me</h2>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              I'm a <span className="text-cyan-400 font-medium">Software Development Engineer</span> specialized in building
              resilient distributed systems and cloud-native infrastructure. Currently at{" "}
              <span className="text-white">AWS (RDS Aurora)</span>, I work on the control plane that manages thousands of database
              clusters securely and reliably.
            </p>
            <p>
              My engineering philosophy revolves around <span className="italic">simplicity in design</span> and{" "}
              <span className="italic">robustness in execution</span>. I believe that the best systems are the ones that are easy
              to reason about, yet powerful enough to handle massive scale.
            </p>
            <p>
              Beyond the code, I'm an active <span className="text-pink-400">Open Sourcerer</span> contributing to tools that
              improve developer experience. When I'm not optimizing query paths or debugging race conditions, you'll find me
              exploring the latest in generative AI or tinkering with new web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group">
              <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Distributed Systems</h3>
              <p className="text-sm text-white/50">
                Architecting highly available, fault-tolerant services that run at global scale.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors group">
              <Code2 className="w-8 h-8 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Database Internals</h3>
              <p className="text-sm text-white/50">
                Deep diving into storage engines, replication protocols, and performance optimization.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors group sm:col-span-2">
              <Heart className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Open Source</h3>
              <p className="text-sm text-white/50">
                Building tools for the community and learning from the collective wisdom of developers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
