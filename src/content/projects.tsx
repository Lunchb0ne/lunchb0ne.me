import Bot from "lucide-react/dist/esm/icons/bot";
import Cpu from "lucide-react/dist/esm/icons/cpu";
import Database from "lucide-react/dist/esm/icons/database";
import GitFork from "lucide-react/dist/esm/icons/git-fork";
import HardDrive from "lucide-react/dist/esm/icons/hard-drive";
import Layout from "lucide-react/dist/esm/icons/layout";
import Network from "lucide-react/dist/esm/icons/network";
import Server from "lucide-react/dist/esm/icons/server";

export const PROJECTS_CONTENT = {
  systemsHeader: {
    title: "System Architecture & AWS",
    icon: Cpu,
    className: "text-cyan-400/60",
  },
  openSourceHeader: {
    title: "Open Source Impact",
    icon: GitFork,
    className: "text-green-400/60",
  },
  systems: [
    {
      title: "Multi-AZ DB Clusters",
      category: "Principal Engineering",
      role: "Architect",
      impact: "Zero data loss failover",
      description:
        "Architected failover detection using a fork of orchestrator/patroni. Implemented Raft consensus for high availability in RDS Three AZ clusters.",
      tech: ["Go", "Raft", "Distributed Systems", "Provenance"],
      icon: Network,
      highlight: true,
    },
    {
      title: "Dedicated Log Volume",
      category: "Database Internals",
      role: "Lead Engineer",
      impact: "15% latency reduction",
      description:
        "Decoupled WAL I/O from data page I/O by offloading to dedicated EBS volumes. Reduced latency jitter significantly for I/O-intensive workloads.",
      tech: ["C++", "Storage Engine", "AWS EBS", "Aurora"],
      icon: HardDrive,
    },
    {
      title: "Control Plane Orchestration",
      category: "Cloud Infrastructure",
      role: "Core Developer",
      impact: "99.99% availability",
      description:
        "End-to-end orchestration for database placement, setup, and self-healing. Managed Data Plane components including SystemRPM and HostManager.",
      tech: ["Java", "Workflow Engines", "HostManager"],
      icon: Server,
    },
  ],
  openSource: [
    {
      title: "Roo Code",
      category: "AI / Developer Tools",
      stats: "22k+ Stars",
      description:
        "Contributor to the autonomous coding agent. Implemented AWS Bedrock authentication and various agent skills. Enabling a full dev team in VS Code.",
      tech: ["TypeScript", "LLM", "VS Code API"],
      icon: Bot,
      link: "https://github.com/RooCodeInc/Roo-Code",
      highlight: true,
    },
    {
      title: "Cmder",
      category: "Dev Environment",
      stats: "26k+ Stars",
      description:
        "Maintainer of the portable console emulator for Windows. Improving the terminal experience for millions of developers with better shell integration.",
      tech: ["C++", "PowerShell", "Shell"],
      icon: Layout,
      link: "https://github.com/cmderdev/cmder",
    },
    {
      title: "sql-stress",
      category: "Database Tooling",
      stats: "Performance Tool",
      description:
        "Built a drift-corrected database stress testing tool with a real-time TUI dashboard for identifying performance bottlenecks in PostgreSQL/MySQL.",
      tech: ["Python", "Rich TUI", "PostgreSQL", "MySQL"],
      icon: Database,
      link: "https://github.com/Lunchb0ne/sql-stress",
    },
  ],
} as const;
