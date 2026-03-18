"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OnThisPage } from "./components/on-this-page";
import { PrevNext } from "./components/prev-next";

const componentsList = [
  "footer", "top-banner", "video-hero", "tagline",
  "carousel", "navbar", "product-card", "cart-modal",
];

const sideLinks = [
  { label: "Introduction",  href: "/docs/introduction" },
  { label: "Installation",  href: "/docs/installation" },
  { label: "Theming",       href: "/docs/theming" },
  { label: "CLI Registry",  href: "/docs/cli-registry" },
  { label: "Components",    href: "/docs/components", children: componentsList },
  { label: "Changelog",     href: "/docs/changelog" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [componentsOpen, setComponentsOpen] = useState(
    pathname.startsWith("/docs/components")
  );

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Left sidebar */}
      <aside className="w-72 shrink-0 border-r border-black/10 px-6 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-black/30 font-medium mb-3 px-2">
          Documentation
        </p>
        <ul className="space-y-0.5">
          {sideLinks.map((link) => {
            const active = pathname === link.href;

            if (link.children) {
              const childActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => setComponentsOpen((o) => !o)}
                    className={`w-full flex items-center justify-between text-[15px] px-2 py-1.5 rounded-lg transition-colors ${
                      childActive ? "text-[#1a1a1a] font-medium" : "text-black/50 hover:text-[#1a1a1a]"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${componentsOpen ? "rotate-90" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {componentsOpen && (
                    <ul className="mt-0.5 ml-3 border-l border-black/10 pl-3 space-y-0.5">
                      {link.children.map((name) => {
                        const childPath = `/docs/components/${name}`;
                        const isActive = pathname === childPath;
                        return (
                          <li key={name}>
                            <Link
                              href={childPath}
                              className={`block text-[14px] py-1 transition-colors ${
                                isActive ? "text-[#1a1a1a] font-medium" : "text-black/40 hover:text-[#1a1a1a]"
                              }`}
                            >
                              {name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-[15px] px-2 py-1.5 rounded-lg transition-colors ${
                    active
                      ? "bg-black/8 text-[#1a1a1a] font-medium"
                      : "text-black/50 hover:text-[#1a1a1a] hover:bg-black/4"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 px-8 py-12 overflow-x-hidden">
        {children}
        <PrevNext />
      </main>

      {/* Right sidebar */}
      <OnThisPage />
    </div>
  );
}
