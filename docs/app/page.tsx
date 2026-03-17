import Link from "next/link";
import { CopyButton } from "./components/copy-button";

const components = [
  {
    name: "footer",
    description: "Three-column site footer with logo, location, socials, and email",
    category: "layout",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#f0c4b0]",
  },
  {
    name: "top-banner",
    description: "Sticky top announcement bar with scrolling marquee text and logo",
    category: "layout",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#c5b8f0]",
  },
  {
    name: "video-hero",
    description: "Full-screen video background hero section with logo and headline",
    category: "display",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#f0d9a0]",
  },
  {
    name: "tagline",
    description: "Scroll-animated text following a curved SVG path",
    category: "display",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#a8d8c8]",
  },
  {
    name: "carousel",
    description: "Infinite horizontal scroll carousel with scale and opacity effects",
    category: "display",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#b8d4f0]",
  },
  {
    name: "navbar",
    description: "Sticky nav with mobile menu, cart badge, and scroll-aware transparency",
    category: "navigation",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#f0b8c8]",
  },
  {
    name: "product-card",
    description: "Product card with hover image swap and quick-add button",
    category: "commerce",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#d4f0a8]",
  },
  {
    name: "cart-modal",
    description: "Add-to-cart confirmation modal",
    category: "commerce",
    frameworks: ["next", "react", "astro"],
    color: "bg-[#f0e0b8]",
  },
];

const frameworkBadge: Record<string, string> = {
  next: "bg-black text-white",
  react: "bg-[#61dafb]/20 text-[#0e7490]",
  astro: "bg-[#ff5d01]/10 text-[#c2410c]",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee]">
      {/* Hero */}
      <section className="px-6 md:px-12 pt-20 pb-16 max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-black/40 mb-4">Open source</p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a1a1a] leading-tight mb-5">
          Grab components,<br />drop them in, own the code.
        </h1>
        <p className="text-lg text-black/50 max-w-xl mx-auto mb-10">
          No npm install, no black box. Copy the source directly into your
          project and make it yours.
        </p>

        {/* Install command */}
        <div
          id="install"
          className="inline-flex items-center gap-3 bg-white border border-black/10 rounded-2xl px-5 py-3 text-sm font-mono shadow-sm"
        >
          <span className="text-black/40">$</span>
          <span className="text-[#1a1a1a]">npx brix-ui add footer</span>
          <CopyButton text="npx brix-ui add footer" />
        </div>
      </section>

      {/* Stats row */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "8", label: "Components" },
            { value: "3", label: "Frameworks" },
            { value: "0", label: "Dependencies" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-black/8 rounded-2xl p-6 text-center"
            >
              <p className="text-4xl font-bold text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-black/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components grid */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
        <h2 className="text-sm uppercase tracking-widest text-black/40 mb-6">All components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {components.map((c) => (
            <Link
              key={c.name}
              href={`/components/${c.name}`}
              className="group bg-white border border-black/8 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Preview area */}
              <div className={`${c.color} h-36 flex items-center justify-center`}>
                <span className="text-black/30 text-sm font-mono">{c.name}</span>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">{c.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider bg-black/5 text-black/40 rounded-full px-2 py-0.5 shrink-0">
                    {c.category}
                  </span>
                </div>
                <p className="text-xs text-black/50 leading-relaxed mb-3">{c.description}</p>

                {/* Framework badges */}
                <div className="flex gap-1 flex-wrap">
                  {c.frameworks.map((f) => (
                    <span
                      key={f}
                      className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${frameworkBadge[f]}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
