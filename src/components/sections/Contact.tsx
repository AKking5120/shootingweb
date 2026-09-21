"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  siteConfig,
  socialLinks,
  contactFormServices,
  budgetRanges,
} from "@/data/site";
import { cn } from "@/lib/utils";

const socialIconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

interface ContactProps {
  defaultService?: string;
  compact?: boolean;
}

export function Contact({ defaultService, compact = false }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const initialService =
    defaultService && contactFormServices.includes(defaultService)
      ? defaultService
      : "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        company: data.get("company"),
        email: data.get("email"),
        phone: data.get("phone"),
        service: data.get("service"),
        budget: data.get("budget"),
        message: data.get("message"),
      }),
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-surface-elevated/60 px-4 py-3.5 text-sm text-white placeholder:text-muted/60 backdrop-blur-sm transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20";

  return (
    <section
      id={compact ? undefined : "contact"}
      className={cn(!compact && "py-24 md:py-32")}
    >
      <div className={cn(!compact && "mx-auto max-w-content px-6 lg:px-8")}>
        <div
          className={cn(
            "grid gap-16",
            compact ? "max-w-2xl mx-auto" : "lg:grid-cols-2"
          )}
        >
          {!compact && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
                Get In Touch
              </span>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
                LET&apos;S BUILD SOMETHING GREAT.
              </h2>
              <p className="mt-4 text-muted">
                Ready to grow? Reach out and we&apos;ll get back to you within 24
                hours.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-muted transition-colors hover:text-white"
                >
                  <Mail size={18} className="text-accent-blue" />
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted transition-colors hover:text-white"
                >
                  <Phone size={18} className="text-accent-blue" />
                  {siteConfig.phone}
                </a>
              </div>

              <div className="mt-8 flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel={
                        social.href !== "#" ? "noopener noreferrer" : undefined
                      }
                      aria-label={social.name}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent-blue hover:text-white"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, x: compact ? 0 : 30, y: compact ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                required
                className={inputClass}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                className={inputClass}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className={inputClass}
              />
            </div>
            <select
              name="service"
              required
              className={inputClass}
              defaultValue={initialService}
              key={initialService}
            >
              <option value="" disabled>Service Required *</option>
              {contactFormServices.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select name="budget" className={inputClass} defaultValue="">
              <option value="">Budget Range</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <textarea
              name="message"
              rows={4}
              placeholder="Project Details *"
              required
              className={inputClass}
              defaultValue={
                defaultService
                  ? `Hi, I'm interested in ${defaultService}. `
                  : undefined
              }
            />
            <Button type="submit" className="w-full">
              Send Enquiry →
            </Button>
            {submitted && (
              <p className="text-center text-sm text-green-400">
                Thank you! Your enquiry has been sent. We&apos;ll get back to you within 24 hours.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
