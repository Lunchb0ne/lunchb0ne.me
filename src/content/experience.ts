export const EXPERIENCE_ITEMS = [
  {
    role: "Software Development Engineer II",
    company: "AWS · RDS & Aurora control plane",
    period: "Sep 2022 – Present",
    description: [
      "Automated region build-out for the service across 6 new AWS regions, cutting initial build time from 30+ days to 7.",
      "Built core components of RDS Blue/Green Deployments, taking database upgrade downtime from hours to under a minute.",
      "Led the move of the Blue/Green Deployments service to a cell-based architecture, so a single failure stays contained to one cell.",
      "Owned Dedicated Log Volumes for Multi-AZ DB instances end to end, reducing write-latency jitter by 15%.",
      "Contributed to failover and high availability for RDS Multi-AZ DB clusters.",
    ],
    tech: ["Java", "Go", "AWS CDK"],
  },
  {
    role: "Full-Stack Development Intern",
    company: "UXCrafters",
    period: "May – Jul 2021",
    description: [
      "Built and deployed a full-stack e-commerce platform on Next.js, Strapi and AWS, with Stripe payments and inventory management.",
      "Shipped two weeks ahead of schedule.",
    ],
    tech: ["Next.js", "Strapi", "AWS", "Stripe"],
  },
] as const;
