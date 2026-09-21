import { processSteps } from "@/data/site";
import type { FaqItem, PopupOffer, ProcessStep, SiteContent } from "@/types";

export const defaultFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services does SY Media & Marketing offer?",
    answer:
      "We offer Google & Meta Ads, social media management, content marketing, video production, photography, performance marketing, and lead generation — full-service digital marketing for growing brands.",
  },
  {
    id: "faq-2",
    question: "How long before I see results from digital marketing?",
    answer:
      "Paid ads can show results within 2–4 weeks. SEO and organic social growth typically take 2–3 months. We share clear timelines and weekly reports so you always know what's working.",
  },
  {
    id: "faq-3",
    question: "Do you work with small businesses and startups?",
    answer:
      "Yes! We work with startups, D2C brands, local businesses, and established companies. We tailor packages to your budget and goals.",
  },
  {
    id: "faq-4",
    question: "What is your pricing or minimum budget?",
    answer:
      "Pricing depends on services and scope. Share your goals via our contact form and we'll recommend a plan that fits your budget — starting from ₹25,000/month.",
  },
  {
    id: "faq-5",
    question: "Do you provide content creation and video shoots?",
    answer:
      "Absolutely. Our team handles reels, ad creatives, product shoots, brand films, and full video production — everything your brand needs to stand out online.",
  },
  {
    id: "faq-6",
    question: "Where is SY Media & Marketing located?",
    answer:
      "We are based at Alt-F Noida -62, near LIC Office, UP. We work with clients across India and offer online consultations for brands everywhere.",
  },
];

export const defaultProcessSteps: ProcessStep[] = processSteps.map((step) => ({
  number: step.number,
  title: step.title,
  description: step.description,
}));

export const defaultPopupOffer: PopupOffer = {
  enabled: true,
  title: "Free Consultation",
  message: "Get a free strategy call with our team. Let's discuss how to grow your brand.",
  ctaText: "Book Now →",
  ctaHref: "/#contact",
};

export const defaultSiteContent: SiteContent = {
  faq: defaultFaqItems,
  processSteps: defaultProcessSteps,
  processTitle: "Simple Steps. Big Results.",
  processEyebrow: "Our Process",
  popup: defaultPopupOffer,
};
