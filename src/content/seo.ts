export type SiteMeta = {
  title: string;
  description: string;
  url: string;
  image: string;
  themeColor: string;
};

export const siteMeta: SiteMeta = {
  title: "Abhishek Aryan | SDE II at AWS",
  description:
    "Software Development Engineer specialized in building resilient distributed systems and cloud-native infrastructure.",
  url: "https://lunchb0ne.me",
  image: "/og-image.png",
  themeColor: "#050505",
};

export const buildSocialMeta = (meta: SiteMeta) => [
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:url",
    content: meta.url,
  },
  {
    property: "og:title",
    content: meta.title,
  },
  {
    property: "og:description",
    content: meta.description,
  },
  {
    property: "og:image",
    content: meta.image,
  },
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:title",
    content: meta.title,
  },
  {
    name: "twitter:description",
    content: meta.description,
  },
  {
    name: "twitter:image",
    content: meta.image,
  },
];

export const buildPageMeta = (overrides: Partial<SiteMeta> = {}) => {
  const meta = { ...siteMeta, ...overrides };

  return [
    {
      title: meta.title,
    },
    {
      name: "description",
      content: meta.description,
    },
    ...buildSocialMeta(meta),
  ];
};
