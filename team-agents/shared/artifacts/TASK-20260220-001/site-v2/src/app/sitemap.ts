import type { MetadataRoute } from "next";

const base = "https://tkttv001.github.io/testopenclaw/task011";
const routes = ["/", "/about/", "/projects/", "/blog/", "/contact/"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
