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

export const blogCategories = [
  "All",
  "Digital Marketing",
  "Social Media",
  "Content Strategy",
  "Paid Advertising",
  "Branding",
  "Video & Media",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-grow-your-brand-on-social-media",
    title: "How to Grow Your Brand on Social Media in 2026",
    excerpt:
      "A practical guide to building visibility, engagement, and trust on Instagram, Facebook, and beyond — without wasting budget on random posts.",
    category: "Social Media",
    author: "SY Media Team",
    date: "2026-03-10",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    featured: true,
    tags: ["social media", "brand growth", "engagement"],
    content: [
      {
        type: "paragraph",
        content:
          "Social media is no longer optional for brands that want to stay relevant. But posting without strategy is one of the fastest ways to burn time and budget. Growth comes from clarity — knowing who you serve, what they care about, and how your content earns attention.",
      },
      {
        type: "heading",
        content: "Start with a clear content pillar strategy",
      },
      {
        type: "paragraph",
        content:
          "Instead of posting randomly, define 3–5 content pillars that reflect your brand expertise. For example: education, behind-the-scenes, client results, product highlights, and industry insights. This keeps your feed cohesive and makes planning easier.",
      },
      {
        type: "heading",
        content: "Optimize for saves, shares, and comments",
      },
      {
        type: "paragraph",
        content:
          "Likes are nice, but saves and shares signal stronger intent to platforms. Create carousel posts, checklists, and short tutorials that people want to bookmark. Ask questions in captions to encourage meaningful comments.",
      },
      {
        type: "list",
        content: [
          "Post consistently — 3–5 times per week is a strong baseline",
          "Use native formats: Reels, Stories, and carousels",
          "Repurpose one idea across multiple formats",
          "Track what performs and double down on winners",
        ],
      },
      {
        type: "paragraph",
        content:
          "The brands that win on social media treat it as a growth channel, not a bulletin board. With the right mix of strategy, creative, and consistency, your audience becomes an asset that compounds over time.",
      },
    ],
  },
  {
    slug: "google-ads-vs-meta-ads-which-is-right",
    title: "Google Ads vs Meta Ads: Which Is Right for Your Business?",
    excerpt:
      "Both platforms can drive results — but they work differently. Here's how to choose the right channel based on your goals, audience, and offer.",
    category: "Paid Advertising",
    author: "SY Media Team",
    date: "2026-03-05",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    featured: true,
    tags: ["google ads", "meta ads", "paid advertising"],
    content: [
      {
        type: "paragraph",
        content:
          "One of the most common questions we hear from growing brands is whether to invest in Google Ads or Meta Ads first. The honest answer: it depends on what you're selling and how people discover solutions like yours.",
      },
      {
        type: "heading",
        content: "When Google Ads makes sense",
      },
      {
        type: "paragraph",
        content:
          "Google is powerful when people are actively searching for your product or service. If your audience types queries like 'best digital marketing agency near me' or 'product photography services', search ads put you in front of high-intent buyers.",
      },
      {
        type: "heading",
        content: "When Meta Ads shine",
      },
      {
        type: "paragraph",
        content:
          "Meta platforms excel at demand creation. If your product needs visual storytelling or your audience doesn't know they need you yet, Facebook and Instagram ads help you build awareness, retarget visitors, and drive conversions at scale.",
      },
      {
        type: "list",
        content: [
          "Use Google for search intent and local lead generation",
          "Use Meta for brand awareness, e-commerce, and visual offers",
          "Combine both for full-funnel growth when budget allows",
          "Always measure ROAS, CPA, and lead quality — not just clicks",
        ],
      },
    ],
  },
  {
    slug: "why-content-marketing-still-matters",
    title: "Why Content Marketing Still Matters for Brand Growth",
    excerpt:
      "Paid ads bring traffic. Content builds trust. Learn why strategic content is the foundation of long-term digital growth.",
    category: "Content Strategy",
    author: "SY Media Team",
    date: "2026-02-28",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
    tags: ["content marketing", "brand trust", "SEO"],
    content: [
      {
        type: "paragraph",
        content:
          "In a world obsessed with quick wins, content marketing remains one of the most underrated growth levers. It doesn't always deliver overnight results — but it builds authority, improves SEO, and nurtures prospects long before they're ready to buy.",
      },
      {
        type: "heading",
        content: "Content supports every stage of the funnel",
      },
      {
        type: "paragraph",
        content:
          "Blog posts, videos, case studies, and guides answer questions your audience already has. When done well, content reduces sales friction because prospects arrive already educated and warmed up to your brand.",
      },
      {
        type: "heading",
        content: "Quality beats quantity",
      },
      {
        type: "paragraph",
        content:
          "Publishing daily without strategy rarely works. Focus on high-value pieces that solve real problems, reinforce your positioning, and can be repurposed across social, email, and ads.",
      },
    ],
  },
  {
    slug: "product-photography-tips-for-ecommerce",
    title: "Product Photography Tips That Boost E-commerce Sales",
    excerpt:
      "Great product images increase trust and conversions. These practical tips will help your products look premium online.",
    category: "Branding",
    author: "SY Media Team",
    date: "2026-02-20",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
    tags: ["photography", "e-commerce", "product shoots"],
    content: [
      {
        type: "paragraph",
        content:
          "Your product photos are often the first impression a customer gets. Blurry, inconsistent, or poorly lit images can kill conversions — even when the product itself is excellent.",
      },
      {
        type: "list",
        content: [
          "Use consistent lighting and backgrounds across your catalog",
          "Show products in context — lifestyle shots help buyers imagine ownership",
          "Include multiple angles and close-up detail shots",
          "Optimize image size for fast loading without sacrificing quality",
        ],
      },
      {
        type: "paragraph",
        content:
          "Investing in professional product photography pays for itself through higher click-through rates, lower return rates, and stronger brand perception.",
      },
    ],
  },
  {
    slug: "video-content-strategy-for-brands",
    title: "Video Content Strategy: Reels, Ads & Brand Films",
    excerpt:
      "Video is the highest-performing format across platforms. Here's how to build a video strategy that drives both views and revenue.",
    category: "Video & Media",
    author: "SY Media Team",
    date: "2026-02-12",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    tags: ["video", "reels", "brand films"],
    content: [
      {
        type: "paragraph",
        content:
          "Video dominates attention on every major platform. But not all video is created equal — a 15-second Reel serves a different purpose than a 60-second brand film or a testimonial ad.",
      },
      {
        type: "heading",
        content: "Match format to goal",
      },
      {
        type: "list",
        content: [
          "Reels & Shorts: awareness, reach, and top-of-funnel engagement",
          "Testimonial videos: trust and conversion on landing pages",
          "Brand films: emotional storytelling and premium positioning",
          "Ad creatives: direct response with clear hooks and CTAs",
        ],
      },
      {
        type: "paragraph",
        content:
          "The best brands don't choose one format — they build a video ecosystem where each piece supports the next stage of the customer journey.",
      },
    ],
  },
  {
    slug: "lead-generation-strategies-that-work",
    title: "Lead Generation Strategies That Actually Work in 2026",
    excerpt:
      "From landing pages to retargeting — proven tactics to attract qualified leads and turn attention into pipeline.",
    category: "Digital Marketing",
    author: "SY Media Team",
    date: "2026-02-05",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    tags: ["lead generation", "conversion", "funnels"],
    content: [
      {
        type: "paragraph",
        content:
          "Lead generation isn't about collecting as many emails as possible. It's about attracting the right people — those who match your ideal customer profile and have genuine interest in what you offer.",
      },
      {
        type: "heading",
        content: "Build offers worth opting in for",
      },
      {
        type: "paragraph",
        content:
          "Generic 'contact us' forms rarely convert at scale. Lead magnets like audits, guides, free consultations, or campaign reviews give prospects a reason to raise their hand.",
      },
      {
        type: "heading",
        content: "Follow up fast and nurture consistently",
      },
      {
        type: "paragraph",
        content:
          "Speed matters. Brands that respond within minutes convert dramatically better than those that wait hours. Pair fast follow-up with email or WhatsApp nurture sequences to stay top of mind.",
      },
      {
        type: "list",
        content: [
          "Optimize landing pages for one clear action",
          "Use retargeting to re-engage warm visitors",
          "Track lead quality, not just lead volume",
          "Align sales and marketing on what a 'good lead' looks like",
        ],
      },
    ],
  },
];
