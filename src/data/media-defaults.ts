import {
  aboutImage,
  ctaBackground,
  heroImages,
  portfolio,
} from "@/data/site";
import type { SiteMedia } from "@/types";

export const defaultSiteMedia: SiteMedia = {
  heroBackground: heroImages.background,
  heroCollage: heroImages.collage.map((item) => ({
    src: item.src,
    alt: item.alt,
    label: item.label,
  })),
  aboutImage,
  ctaBackground,
  portfolio: portfolio.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
    href: item.href,
  })),
};

export const imageCategories = [
  {
    id: "blogs",
    label: "Blog Images",
    folder: "public/images/blogs",
    pathPrefix: "/images/blogs",
    description: "Blog post cover images",
  },
  {
    id: "hero",
    label: "Hero Section",
    folder: "public/images/hero",
    pathPrefix: "/images/hero",
    description: "Homepage hero background & collage",
  },
  {
    id: "portfolio",
    label: "Portfolio / Our Work",
    folder: "public/images/portfolio",
    pathPrefix: "/images/portfolio",
    description: "Portfolio project thumbnails",
  },
  {
    id: "about",
    label: "About Section",
    folder: "public/images/about",
    pathPrefix: "/images/about",
    description: "About page/section images",
  },
  {
    id: "cta",
    label: "CTA Section",
    folder: "public/images/cta",
    pathPrefix: "/images/cta",
    description: "Call-to-action background images",
  },
  {
    id: "general",
    label: "General",
    folder: "public/images/general",
    pathPrefix: "/images/general",
    description: "Other website images",
  },
] as const;

export type ImageCategoryId = (typeof imageCategories)[number]["id"];
