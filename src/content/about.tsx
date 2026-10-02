import type { Icon } from "@phosphor-icons/react";
import { CodeIcon, GlobeIcon, HeartIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

export const ABOUT_CONTENT = {
  paragraphs: [
    {
      id: "about-intro",
      content: (
        <>
          I&apos;m a <span className="font-medium text-cyan-400">software engineer</span> on the{" "}
          <span className="font-medium text-white">AWS RDS & Aurora</span>{" "}
          <span className="text-cyan-400">control plane</span>: the systems that place, provision, fail over, back up
          and upgrade customers&apos; databases. It&apos;s the{" "}
          <span className="text-white/90 italic">invisible machinery</span> that makes “it just works” actually true.
        </>
      ),
    },
    {
      id: "about-bias",
      content: (
        <>
          My bias is toward <span className="font-medium text-white italic">simple, boring designs</span>. No cleverness
          for its own sake, no black boxes you have to “trust”. If a system can&apos;t be explained on a{" "}
          <span className="text-white">whiteboard in ten minutes</span>, I probably don&apos;t want it running in
          production.
        </>
      ),
    },
    {
      id: "about-offclock",
      content: (
        <>
          Off the clock I do the same thing with fewer approvals: <span className="text-cyan-400">stress tools</span>{" "}
          that poke databases until they confess their weaknesses, odd little CLIs, and{" "}
          <span className="font-medium text-pink-400">open-source</span> work on AI coding agents. I also like seeing
          how far <span className="text-cyan-400">new web tech</span> can go; this site is TanStack Start running on
          Cloudflare.
        </>
      ),
    },
  ],
  cards: [
    {
      title: "Distributed Systems",
      description: "Failover, cell-based architecture and region automation for managed databases.",
      icon: GlobeIcon,
      iconClassName: "text-cyan-400",
      hoverBorderClassName: "hover:border-cyan-500/30",
    },
    {
      title: "Databases",
      description: "Storage I/O, replication and upgrades: where latency and downtime actually come from.",
      icon: CodeIcon,
      iconClassName: "text-pink-400",
      hoverBorderClassName: "hover:border-pink-500/30",
    },
    {
      title: "Open Source",
      description: "Contributor to Roo Code and author of sql-stress. I like building tools in the open.",
      icon: HeartIcon,
      iconClassName: "text-green-400",
      hoverBorderClassName: "hover:border-green-500/30",
      className: "sm:col-span-2",
    },
  ],
} satisfies {
  paragraphs: readonly { id: string; content: ReactNode }[];
  cards: readonly {
    title: string;
    description: string;
    icon: Icon;
    iconClassName: string;
    hoverBorderClassName: string;
    className?: string;
  }[];
};
