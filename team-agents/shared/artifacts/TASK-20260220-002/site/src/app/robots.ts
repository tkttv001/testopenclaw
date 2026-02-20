import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://tkttv001.github.io/testopenclaw/task013";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
