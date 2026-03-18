"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "Introduction",  href: "/docs/introduction" },
  { label: "Installation",  href: "/docs/installation" },
  { label: "Theming",       href: "/docs/theming" },
  { label: "CLI & Registry",href: "/docs/cli-registry" },
  { label: "Components",    href: "/docs/components" },
  { label: "footer",        href: "/docs/components/footer" },
  { label: "top-banner",    href: "/docs/components/top-banner" },
  { label: "video-hero",    href: "/docs/components/video-hero" },
  { label: "tagline",       href: "/docs/components/tagline" },
  { label: "carousel",      href: "/docs/components/carousel" },
  { label: "navbar",        href: "/docs/components/navbar" },
  { label: "product-card",  href: "/docs/components/product-card" },
  { label: "cart-modal",    href: "/docs/components/cart-modal" },
  { label: "Changelog",     href: "/docs/changelog" },
];

export function PrevNext() {
  const pathname = usePathname();
  const idx = pages.findIndex((p) => p.href === pathname);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-between mt-16 pt-6 border-t border-black/10">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 text-sm text-black/50 hover:text-[#1a1a1a] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-black/30 mb-0.5">Previous</p>
            <p className="font-medium text-[#1a1a1a]">{prev.label}</p>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-sm text-black/50 hover:text-[#1a1a1a] transition-colors text-right"
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-black/30 mb-0.5">Next</p>
            <p className="font-medium text-[#1a1a1a]">{next.label}</p>
          </div>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : <div />}
    </div>
  );
}
