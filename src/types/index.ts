export interface BlogBlock {
  type: "paragraph" | "heading" | "list";
  content: string | string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  content: BlogBlock[];
}

export interface ContactMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  email: string;
  phone: string;
  tagline: string;
  positioning: string;
  description: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  media?: SiteMedia;
}

export interface HeroCollageItem {
  src: string;
  alt: string;
  label: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

export interface SiteMedia {
  heroBackground: string;
  heroCollage: HeroCollageItem[];
  aboutImage: string;
  ctaBackground: string;
  portfolio: PortfolioItem[];
}

export interface MediaFile {
  id: string;
  category: string;
  path: string;
  label: string;
  alt: string;
  createdAt: string;
}
