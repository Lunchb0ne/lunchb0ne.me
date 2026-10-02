export const siteMeta = {
  title: "Abhishek Aryan | Software Engineer, AWS RDS & Aurora",
  description:
    "Abhishek Aryan is a software engineer on the AWS RDS & Aurora control plane, working on Blue/Green Deployments, high availability and database tooling.",
  url: "https://lunchb0ne.me",
  image: "/og-image.png",
  themeColor: "#050505",
};

export const buildPageMeta = () => {
  const { title, description, url } = siteMeta;
  // Link unfurlers require an absolute image URL.
  const image = new URL(siteMeta.image, url).href;
  const og = { type: "website", url, title, description, image };
  const twitter = { card: "summary_large_image", title, description, image };

  return [
    { title },
    { name: "description", content: description },
    ...Object.entries(og).map(([key, content]) => ({ property: `og:${key}`, content })),
    ...Object.entries(twitter).map(([key, content]) => ({ name: `twitter:${key}`, content })),
  ];
};
