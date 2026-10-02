import {
  ArrowsClockwiseIcon,
  CpuIcon,
  DatabaseIcon,
  GitForkIcon,
  HardDriveIcon,
  NetworkIcon,
  RobotIcon,
} from "@phosphor-icons/react";

export const PROJECTS_CONTENT = {
  systemsHeader: {
    title: "At AWS",
    icon: CpuIcon,
    className: "text-cyan-400/60",
  },
  openSourceHeader: {
    title: "Open Source",
    icon: GitForkIcon,
    className: "text-green-400/60",
  },
  systems: [
    {
      title: "RDS Blue/Green Deployments",
      category: "Zero-drama upgrades",
      impact: "Upgrade downtime: hours → under a minute",
      description:
        "Built core components of the service that stages a database upgrade on a synchronized copy, then switches traffic over in under a minute. Later led its move to a cell-based architecture, so one failure stays inside one cell.",
      tech: ["Java", "Go", "AWS CDK"],
      icon: ArrowsClockwiseIcon,
      highlight: true,
    },
    {
      title: "Dedicated Log Volumes",
      category: "Storage I/O",
      impact: "15% less write-latency jitter",
      description:
        "Moved database transaction logs onto their own EBS volume, isolating log writes from data-page I/O on Multi-AZ DB instances. Owned the feature end to end.",
      tech: ["Amazon RDS", "AWS EBS", "Storage I/O"],
      icon: HardDriveIcon,
    },
    {
      title: "Multi-AZ DB Clusters",
      category: "High Availability",
      impact: "Contributor",
      description:
        "Worked on failover and high availability for RDS clusters that run a writer and two readable standbys across three Availability Zones.",
      tech: ["Go", "Amazon RDS", "Failover"],
      icon: NetworkIcon,
    },
  ],
  openSource: [
    {
      title: "Roo Code",
      category: "AI / Developer Tools",
      stats: "Contributor · 22k★ project",
      description:
        "Contributor to Roo Code, an open-source AI coding agent for VS Code. Added Amazon Bedrock authentication and new agent skills.",
      tech: ["TypeScript", "LLMs", "VS Code API"],
      icon: RobotIcon,
      link: "https://github.com/RooCodeInc/Roo-Code",
      highlight: true,
    },
    {
      title: "sql-stress",
      category: "Database Tooling",
      stats: "Author",
      description:
        "Load-testing TUI for PostgreSQL and MySQL. Hits an exact operations-per-second target by correcting for query time, with a live dashboard for spotting bottlenecks.",
      tech: ["Python", "Rich", "PostgreSQL", "MySQL"],
      icon: DatabaseIcon,
      link: "https://github.com/Lunchb0ne/sql-stress",
    },
  ],
} as const;
