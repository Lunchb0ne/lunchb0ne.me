export const EXPERIENCE_ITEMS = [
  {
    role: "Software Development Engineer II",
    company: "AWS (Aurora Control Plane)",
    period: "Sep 2022 — Present",
    description: [
      "Designed and implemented critical components for RDS Blue/Green Deployments, reducing database upgrade downtime from hours to under a minute.",
      "Owned end-to-end development of Dedicated Log Volume feature for Multi-AZ DB instances, reducing write latency jitter by 15%.",
      "Led Cellularization initiative for Blue/Green Deployments service, restructuring deployment architecture for fault tolerance.",
      "Architected and delivered Region Build Automation for 6 AWS regions, reducing initial service build time from 30+ days to 7 days.",
    ],
    tech: ["Java", "Go", "Distributed Systems", "CDK"],
  },
  {
    role: "Full Stack Development Intern",
    company: "UXCrafters",
    period: "May 2021 — July 2021",
    description: [
      "Developed and deployed a Full-stack E-Commerce platform using Next.js, Strapi CMS, and AWS services.",
      "Delivered project 2 weeks ahead of schedule with payment processing and inventory management.",
    ],
    tech: ["Next.js", "Strapi", "AWS", "Stripe"],
  },
] as const;
