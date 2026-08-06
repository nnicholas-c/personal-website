import type { MetadataRoute } from "next";
import { config } from "@/data/config";

const base = config.site.replace(/\/$/, "");

// The five real destinations. Keep in sync when a top-level route is added.
const ROUTES = ["", "/playful", "/editorial", "/research", "/blogs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
