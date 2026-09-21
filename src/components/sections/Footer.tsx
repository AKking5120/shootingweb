import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, navLinks, socialLinks } from "@/data/site";

const socialIconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-3 text-sm text-muted">{siteConfig.positioning}</p>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="text-muted transition-colors hover:text-white"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-8 text-center text-xs text-muted">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
