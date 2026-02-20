import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://tkttv001.github.io/testopenclaw/task012";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about/", "/projects/", "/blog/", "/contact/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
