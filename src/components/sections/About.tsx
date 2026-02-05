import { Code2, Globe, Heart } from "lucide-react";
import { Section } from "@/components/ui/Section";

export const About = () => {
  return (
    <>
      <Section.Header>About Me</Section.Header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-lg leading-relaxed text-white/70">
          <p>
            I’m a <span className="text-cyan-400 font-medium">Software Development Engineer</span> focused on{" "}
            <span className="text-white">resilient distributed systems</span> and cloud‑native infrastructure. At{" "}
            <span className="text-white font-medium">AWS RDS & Aurora</span>, I work on the{" "}
            <span className="text-cyan-400">control plane</span> that orchestrates thousands of database clusters: failovers,
            backups, security, all the <span className="italic text-white/90">invisible machinery</span> that makes “it just
            works” actually true.
          </p>
          <p>
            My bias is toward <span className="italic text-white font-medium">simple, ruthless designs</span>. No ceremony, no
            cleverness for its own sake, no black boxes you have to “trust”. If a system can’t be explained on a{" "}
            <span className="text-white">whiteboard in ten minutes</span>, I probably don’t want it running in production.
          </p>
          <p>
            When I’m off the clock, I’m usually doing the same thing with fewer guardrails: building{" "}
            <span className="text-cyan-400">stress tools</span>, weird CLIs, and{" "}
            <span className="text-pink-400 font-medium">open source experiments</span> that push databases until they complain and
            surface where they crack. I also spend an unhealthy amount of time exploring{" "}
            <span className="text-cyan-400">generative AI</span> and coding agents, and hacking on{" "}
            <span className="text-cyan-400">new web tech</span> to see how far the stack can be pushed before it gives up.
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
    </>
  );
};
