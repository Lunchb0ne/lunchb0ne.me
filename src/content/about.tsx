import type { Icon } from "@phosphor-icons/react";
import { CodeIcon, GlobeIcon, HeartIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

export const ABOUT_CONTENT = {
  paragraphs: [
    {
      id: "about-intro",
      content: (
        <>
          I&apos;m a <span className="font-medium text-cyan-400">Software Development Engineer</span> who spends most
          days making <span className="text-white">distributed systems</span> slightly less dramatic. At{" "}
          <span className="font-medium text-white">AWS RDS & Aurora</span>, I work on the{" "}
          <span className="text-cyan-400">control plane</span> behind replication, failovers, backups, and security:
          the kind of invisible plumbing nobody notices until it breaks at 2 AM.
        </>
      ),
    },
    {
      id: "about-bias",
      content: (
        <>
          I have a strong bias toward <span className="font-medium text-white italic">simple systems</span>. Less
          ceremony, fewer mystery boxes, fewer “trust me bro” architecture slides. If we can&apos;t explain it on a{" "}
          <span className="text-white">whiteboard in ten minutes</span>, it probably needs less brilliance and more
          cleanup.
        </>
      ),
    },
    {
      id: "about-offclock",
      content: (
        <>
          Off the clock, I do roughly the same thing but with fewer approvals: building{" "}
          <span className="text-cyan-400">stress tools</span>, odd CLIs, and{" "}
          <span className="font-medium text-pink-400">open source experiments</span> that poke databases until they
          confess their weaknesses. I also spend an unnecessary amount of time with{" "}
          <span className="text-cyan-400">generative AI</span>, coding agents, and{" "}
          <span className="text-cyan-400">new web tech</span> because apparently I enjoy optional chaos.
        </>
      ),
    },
  ],
  cards: [
    {
      title: "Distributed Systems",
      description: "Building distributed systems that stay boring in production, even when traffic is not.",
      icon: GlobeIcon,
      iconClassName: "text-cyan-400",
      hoverBorderClassName: "hover:border-cyan-500/30",
      className: "",
    },
    {
      title: "Database Internals",
      description: "Digging into storage engines, replication, and performance before the pager starts screaming.",
      icon: CodeIcon,
      iconClassName: "text-pink-400",
      hoverBorderClassName: "hover:border-pink-500/30",
      className: "",
    },
    {
      title: "Open Source",
      description: "Shipping useful tools, sharing notes, and learning from people smarter than me on the internet.",
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
