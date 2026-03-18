"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const allComponents = [
  { name: "footer",       description: "Three-column site footer",                       category: "layout" },
  { name: "top-banner",   description: "Sticky top announcement bar with marquee text",  category: "layout" },
  { name: "video-hero",   description: "Full-screen video background hero section",      category: "display" },
  { name: "tagline",      description: "Scroll-animated text on a curved SVG path",     category: "display" },
  { name: "carousel",     description: "Infinite horizontal scroll carousel",            category: "display" },
  { name: "navbar",       description: "Sticky nav with mobile menu and cart badge",     category: "navigation" },
  { name: "product-card", description: "Product card with hover image swap",             category: "commerce" },
  { name: "cart-modal",   description: "Add-to-cart confirmation modal",                 category: "commerce" },
];

const navLinks = [
  { label: "Docs", href: "/docs/introduction" },
];

export function Navbar() {
  const pathname = usePathname();
  const [stars, setStars] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Don't render the docs navbar inside component previews (iframe)
  if (pathname.startsWith("/preview")) return null;

  useEffect(() => {
    fetch("https://api.github.com/repos/jessicasewe/brix")
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count ?? 0))
      .catch(() => setStars(0));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const results = query.trim()
    ? allComponents.filter(
        (c) =>
          c.name.includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.includes(query.toLowerCase())
      )
    : allComponents;

  return (
    <nav className="sticky top-0 z-50 bg-[#f7f4ee]/90 backdrop-blur border-b border-black/10 px-6 md:px-12 h-14 flex items-center gap-6">
      {/* Logo */}
      <Link href="/" className="font-bold text-xl tracking-tight text-[#1a1a1a] shrink-0">
        brix
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        {navLinks.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                active
                  ? "bg-black/8 text-[#1a1a1a] font-medium"
                  : "text-black/50 hover:text-[#1a1a1a] hover:bg-black/5"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div ref={searchRef} className="relative w-52">
        <button
          onClick={() => {
            setSearchOpen(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          className="w-full flex items-center gap-2 text-sm bg-white border border-black/10 rounded-full px-4 py-1.5 text-black/40 hover:border-black/30 transition-colors"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span>Search docs...</span>
          <kbd className="ml-auto text-[10px] border border-black/10 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
        </button>

        {searchOpen && (
          <div className="absolute top-11 right-0 w-80 bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden z-50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/8">
              <svg className="w-3.5 h-3.5 text-black/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components..."
                className="flex-1 text-sm bg-transparent outline-none text-[#1a1a1a] placeholder:text-black/30"
              />
            </div>
            <ul className="py-2 max-h-64 overflow-y-auto">
              {results.length === 0 ? (
                <li className="px-4 py-3 text-sm text-black/40">No components found</li>
              ) : (
                results.map((c) => (
                  <li key={c.name}>
                    <Link
                      href={`/components/${c.name}`}
                      onClick={() => { setSearchOpen(false); setQuery(""); }}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-black/4 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a]">{c.name}</p>
                        <p className="text-xs text-black/40 mt-0.5">{c.description}</p>
                      </div>
                      <span className="text-[10px] text-black/30 shrink-0 ml-3">{c.category}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* GitHub + stars */}
      <a
        href="https://github.com/jessicasewe/brix"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm border border-black/20 rounded-full px-3 py-1.5 hover:border-black/50 transition-colors text-[#1a1a1a] shrink-0"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        {stars !== null && <span className="text-xs font-medium">{stars}</span>}
      </a>
    </nav>
  );
}
