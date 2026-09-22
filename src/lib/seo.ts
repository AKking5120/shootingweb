import type { Metadata } from "next";
import { siteConfig, socialLinks } from "@/data/site";
import type { BlogPost } from "@/types";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || siteConfig.url;
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getDefaultOgImage() {
  const imagePath = siteConfig.logo || "/logo.jpg";
  return absoluteUrl(imagePath);
}

export function getAbsoluteImageUrl(image?: string) {
  if (!image) return getDefaultOgImage();
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return absoluteUrl(path);
}

export const seoKeywords = [
  "SY Media and Marketing",
  "digital marketing agency",
  "digital marketing agency Noida",
  "social media marketing",
  "social media management Noida",
  "Google Ads agency",
  "Meta Ads management",
  "content marketing",
  "content creation",
  "video production",
  "product photography",
  "performance marketing",
  "affiliate marketing",
  "lead generation",
  "brand growth",
  "creative agency Noida",
];

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  authors?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  keywords,
  noIndex = false,
  publishedTime,
  authors,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = getAbsoluteImageUrl(image);

  return {
    title,
    description,
    keywords: keywords ?? seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    ...(authors ? { authors: authors.map((name) => ({ name })) } : {}),
  };
}

export function getSameAsLinks() {
  return socialLinks
    .map((link) => link.href)
    .filter((href) => href && href !== "#");
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: getDefaultOgImage(),
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: getSameAsLinks(),
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    image: getDefaultOgImage(),
    url: getSiteUrl(),
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Alt-F Noida -62, near LIC Office",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "₹₹",
    sameAs: getSameAsLinks(),
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
  };
}

export function getArticleSchema(post: BlogPost, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getDefaultOgImage(),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blogs/${post.slug}`),
    },
    keywords: post.tags.join(", "),
  };
}

export function getBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServicesPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Services`,
    itemListElement: [
      "Google Ads & Meta Ads",
      "Social Media Management",
      "Content Marketing & Creation",
      "Video Editing & Videography",
      "Photography & Product Shoots",
      "Performance & Affiliate Marketing",
      "Lead Generation & Brand Growth",
    ].map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })),
  };
}
