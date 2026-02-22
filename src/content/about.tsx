import type { Icon } from "@phosphor-icons/react";
import { CodeIcon, GlobeIcon, HeartIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

export const ABOUT_CONTENT = {
  paragraphs: [
    {
      id: "about-intro",
      content: (
        <>
          I&apos;m a <span className="font-medium text-cyan-400">Software Development Engineer</span> focused on{" "}
          <span className="text-white">resilient distributed systems</span> and cloud-native infrastructure. At{" "}
          <span className="font-medium text-white">AWS RDS & Aurora</span>, I work on the{" "}
          <span className="text-cyan-400">control plane</span> that orchestrates thousands of database clusters:
          replication, failovers, backups, security, all the{" "}
          <span className="text-white/90 italic">invisible machinery</span> that makes “it just works” actually true.
        </>
      ),
    },
    {
      id: "about-bias",
      content: (
        <>
          My bias is toward <span className="font-medium text-white italic">simple, ruthless designs</span>. No
          ceremony, no cleverness for its own sake, no black boxes you have to "trust". If a system can&apos;t be
          explained on a <span className="text-white">whiteboard in ten minutes</span>, I probably don&apos;t want it
          running in production.
        </>
      ),
    },
    {
      id: "about-offclock",
      content: (
        <>
          When I&apos;m off the clock, I&apos;m usually doing the same thing with fewer guardrails: building{" "}
          <span className="text-cyan-400">stress tools</span>, weird CLIs, and{" "}
          <span className="font-medium text-pink-400">open source experiments</span> that push databases until they
          complain and surface where they crack. I also spend an unhealthy amount of time exploring{" "}
          <span className="text-cyan-400">generative AI</span> and coding agents, and hacking on{" "}
          <span className="text-cyan-400">new web tech</span> to see how far the stack can be pushed before it gives up.
        </>
      ),
    },
  ],
  cards: [
    {
      title: "Distributed Systems",
      description: "Architecting highly available, fault-tolerant services that run at global scale.",
      icon: GlobeIcon,
      iconClassName: "text-cyan-400",
      hoverBorderClassName: "hover:border-cyan-500/30",
      className: "",
    },
    {
      title: "Database Internals",
      description: "Deep diving into storage engines, replication protocols, and performance optimization.",
      icon: CodeIcon,
      iconClassName: "text-pink-400",
      hoverBorderClassName: "hover:border-pink-500/30",
      className: "",
    },
    {
      title: "Open Source",
      description: "Building tools for the community and learning from the collective wisdom of developers worldwide.",
      icon: HeartIcon,
      iconClassName: "text-green-400",
      hoverBorderClassName: "hover:border-green-500/30",
      className: "sm:col-span-2",
    },
  ],
} as const satisfies {
  paragraphs: readonly { id: string; content: ReactNode }[];
  cards: readonly {
    title: string;
    description: string;
    icon: Icon;
    iconClassName: string;
    hoverBorderClassName: string;
    className: string;
  }[];
};
