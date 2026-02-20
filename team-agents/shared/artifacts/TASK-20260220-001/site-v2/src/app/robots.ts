import type { MetadataRoute } from "next";

const base = "https://tkttv001.github.io/testopenclaw/task011";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: `${base}/`,
  };
}
