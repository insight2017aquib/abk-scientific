import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand,
    short_name: "ABK",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1f3a",
    icons: [
      { src: "/logo/mark-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo/mark-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
