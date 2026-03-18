import Link from "next/link";

const components = [
  { name: "footer",       description: "Three-column site footer with logo, location, socials, and email", category: "layout" },
  { name: "top-banner",   description: "Sticky top announcement bar with scrolling marquee text and logo",  category: "layout" },
  { name: "video-hero",   description: "Full-screen video background hero section with logo and headline",  category: "display" },
  { name: "tagline",      description: "Scroll-animated text following a curved SVG path",                  category: "display" },
  { name: "carousel",     description: "Infinite horizontal scroll carousel with scale and opacity effects",category: "display" },
  { name: "navbar",       description: "Sticky nav with mobile menu, cart badge, and scroll-aware transparency", category: "navigation" },
  { name: "product-card", description: "Product card with hover image swap and quick-add button",           category: "commerce" },
  { name: "cart-modal",   description: "Add-to-cart confirmation modal",                                    category: "commerce" },
];

const categories = ["layout", "display", "navigation", "commerce"];

export default function ComponentsIndex() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Reference</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Components</h1>
      <p className="text-black/60 text-base leading-relaxed mb-10">
        All components support Next.js, React, and Astro. Click any component to see its source, install command, and usage notes.
      </p>

      <div className="space-y-8">
        {categories.map((cat) => {
          const group = components.filter((c) => c.category === cat);
          if (!group.length) return null;
          return (
            <div key={cat}>
              <p className="text-[10px] uppercase tracking-widest text-black/30 font-medium mb-3">{cat}</p>
              <div className="space-y-1">
                {group.map((c) => (
                  <Link
                    key={c.name}
                    href={`/docs/components/${c.name}`}
                    className="flex items-center justify-between py-3 px-4 bg-white border border-black/8 rounded-xl hover:border-black/20 transition-colors group"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#1a1a1a]">{c.name}</span>
                      <span className="text-xs text-black/40 ml-3">{c.description}</span>
                    </div>
                    <svg className="w-4 h-4 text-black/20 group-hover:text-black/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
