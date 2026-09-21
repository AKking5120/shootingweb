import Link from "next/link";
import { siteConfig } from "@/data/site";

interface LogoProps {
  showFull?: boolean;
}

export function Logo({ showFull = true }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand text-sm font-extrabold text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {siteConfig.shortName}
      </span>
      {showFull && (
        <span className="hidden text-sm font-bold tracking-wide text-white sm:block">
          MEDIA &amp; MARKETING
        </span>
      )}
    </Link>
  );
}
