import type { MetadataRoute } from "next";
import { config } from "@/data/config";

const base = config.site.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
