export const siteConfig = {
  name: "SY Media & Marketing",
  shortName: "SY",
  tagline: "create.Market.Grow",
  positioning: "Digital Marketing • Media • Creative",
  description:
    "SY Media & Marketing helps brands grow through digital marketing, social media, content creation, performance marketing, photography and creative storytelling.",
  mainMessage:
    "We help brands grow through smart marketing, powerful content & creative storytelling.",
  url: "https://symediaandmarketing.com",
  email: "symediaandmarketing@gmail.com",
  phone: "",
  whatsapp: "",
  address: "Alt-F Noida -62, near LIC Office, UP",
  logo: "/images/general/logo.jpg",
  copyright: "© 2026 SY Media & Marketing. All rights reserved.",
};

export function hasContactPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && !phone.includes("X");
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blogs" },
  { label: "FAQ", href: "/#faq" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/symediamarketing?stkn=aWQybHNvc3YzNDNz",
    icon: "instagram" as const,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: "linkedin" as const,
  },
  {
    name: "YouTube",
    href: "#",
    icon: "youtube" as const,
  },
];

export type ServiceIcon =
  | "trending-up"
  | "smartphone"
  | "pen-tool"
  | "video"
  | "camera"
  | "target"
  | "rocket";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  highlight: string;
  featured?: boolean;
  accent: string;
  features: string[];
  adTagline: string;
}

export const services: Service[] = [
  {
    id: "google-meta-ads",
    title: "Google Ads & Meta Ads",
    description: "Target the right audience. Get real results.",
    icon: "trending-up",
    highlight: "Most Popular",
    featured: true,
    accent: "#3b82f6",
    features: [
      "Google & Meta campaign setup",
      "Audience targeting & retargeting",
      "ROAS tracking & weekly reports",
    ],
    adTagline: "Run ads that actually convert",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description: "Build your presence. Grow your community.",
    icon: "smartphone",
    highlight: "Daily Growth",
    accent: "#8b5cf6",
    features: [
      "Content calendar & posting",
      "Reels, stories & engagement",
      "Community management",
    ],
    adTagline: "Build a brand people follow",
  },
  {
    id: "content-marketing",
    title: "Content Marketing & Creation",
    description: "Strategic content. Real engagement.",
    icon: "pen-tool",
    highlight: "Story-Driven",
    accent: "#06b6d4",
    features: [
      "Blog, copy & captions",
      "Brand voice development",
      "SEO-friendly content",
    ],
    adTagline: "Content that builds trust",
  },
  {
    id: "video",
    title: "Video Editing & Videography",
    description: "Ideas in motion. Stories that sell.",
    icon: "video",
    highlight: "Cinematic",
    accent: "#ec4899",
    features: [
      "Reels, ads & brand films",
      "Professional editing & color",
      "On-location videography",
    ],
    adTagline: "Videos that stop the scroll",
  },
  {
    id: "photography",
    title: "Photography & Product Shoots",
    description: "High-quality visuals. Lasting impressions.",
    icon: "camera",
    highlight: "Studio Quality",
    accent: "#f59e0b",
    features: [
      "Product & lifestyle shoots",
      "E-commerce ready images",
      "Creative direction on set",
    ],
    adTagline: "Visuals that sell products",
  },
  {
    id: "performance",
    title: "Performance & Affiliate Marketing",
    description: "Drive performance. Maximize ROI.",
    icon: "target",
    highlight: "ROI Focused",
    accent: "#10b981",
    features: [
      "Conversion optimization",
      "Affiliate program setup",
      "Funnel & landing page strategy",
    ],
    adTagline: "Maximize every rupee spent",
  },
  {
    id: "lead-gen",
    title: "Lead Generation & Brand Growth",
    description: "More leads. More sales. Long-term growth.",
    icon: "rocket",
    highlight: "Scale Fast",
    featured: true,
    accent: "#f43f5e",
    features: [
      "Lead magnets & funnels",
      "CRM integration support",
      "Long-term growth strategy",
    ],
    adTagline: "Turn attention into customers",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServiceTitle(id: string): string {
  return getServiceById(id)?.title ?? id;
}

export const stats = [
  { value: 7, suffix: "+", label: "Core Services" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
];

export const results = [
  { value: 120, prefix: "+", suffix: "%", label: "Lead Growth" },
  { value: 3.4, prefix: "", suffix: "×", label: "ROAS", decimals: 1 },
  { value: 85, prefix: "+", suffix: "K", label: "Social Reach" },
  { value: 95, prefix: "", suffix: "%", label: "Client Satisfaction" },
];

export const portfolio = [
  {
    id: "social-campaign",
    title: "Social Media Campaign",
    category: "Brand Awareness & Engagement",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    href: "https://www.instagram.com/symediamarketing?stkn=aWQybHNvc3YzNDNz",
  },
  {
    id: "product-photo",
    title: "Product Photography",
    category: "E-commerce Brand Shoot",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    href: "https://www.instagram.com/symediamarketing?stkn=aWQybHNvc3YzNDNz",
  },
  {
    id: "google-ads",
    title: "Google Ads Campaign",
    category: "Lead Generation & Sales Growth",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    href: "https://www.instagram.com/symediamarketing?stkn=aWQybHNvc3YzNDNz",
  },
  {
    id: "video-production",
    title: "Video Production",
    category: "Brand Film & Reels",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    href: "https://www.instagram.com/filmsbysanjeev",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Strategy",
    description: "Understand your goals, market & audience.",
  },
  {
    number: "02",
    title: "Create",
    description: "Develop impactful content, ads & visuals.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Go live across the right channels.",
  },
  {
    number: "04",
    title: "Optimize",
    description: "Track performance and make data-driven changes.",
  },
  {
    number: "05",
    title: "Grow",
    description: "Scale what works and maximize results.",
  },
];

export const testimonials = [
  {
    id: "testimonial-1",
    quote:
      "The team delivered a complete digital strategy that improved our lead quality and brand visibility within the first month.",
    role: "Marketing Lead",
    industry: "E-commerce",
  },
  {
    id: "testimonial-2",
    quote:
      "From ad creatives to video content, everything felt premium and aligned with our brand. Communication was clear throughout.",
    role: "Founder",
    industry: "D2C Brand",
  },
  {
    id: "testimonial-3",
    quote:
      "Our campaigns became more structured, measurable, and scalable. The reporting and optimization process was especially strong.",
    role: "Growth Manager",
    industry: "Service Business",
  },
];

export const contactFormServices = [
  "Google Ads & Meta Ads",
  "Social Media Management",
  "Content Marketing & Creation",
  "Video Editing & Videography",
  "Photography & Product Shoots",
  "Performance & Affiliate Marketing",
  "Lead Generation & Brand Growth",
];

export const budgetRanges = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000+",
];

export const heroImages = {
  background:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80",
  collage: [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
      alt: "Advertising analytics dashboard",
      label: "More Clicks, More Customers",
    },
    {
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&q=80",
      alt: "Social media interface",
      label: "Social Media That Connects",
    },
    {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
      alt: "Videographer with camera",
      label: "Content That Sells",
    },
    {
      src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
      alt: "Product photography setup",
      label: "Visuals That Convert",
    },
  ],
};

export const aboutImage =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";

export const ctaBackground =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80";
