import { notFound } from "next/navigation";

const REPO = "jessicasewe/brix";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

const registry = [
  { name: "footer",       description: "Three-column site footer with logo, location, socials, and email", category: "layout",     frameworks: ["next", "react", "astro"], color: "bg-[#f0c4b0]" },
  { name: "top-banner",   description: "Sticky top announcement bar with scrolling marquee text and logo",  category: "layout",     frameworks: ["next", "react", "astro"], color: "bg-[#c5b8f0]" },
  { name: "video-hero",   description: "Full-screen video background hero section with logo and headline",  category: "display",    frameworks: ["next", "react", "astro"], color: "bg-[#f0d9a0]" },
  { name: "tagline",      description: "Scroll-animated text following a curved SVG path",                  category: "display",    frameworks: ["next", "react", "astro"], color: "bg-[#a8d8c8]" },
  { name: "carousel",     description: "Infinite horizontal scroll carousel with scale and opacity effects",category: "display",    frameworks: ["next", "react", "astro"], color: "bg-[#b8d4f0]" },
  { name: "navbar",       description: "Sticky nav with mobile menu, cart badge, and scroll-aware transparency", category: "navigation", frameworks: ["next", "react", "astro"], color: "bg-[#f0b8c8]" },
  { name: "product-card", description: "Product card with hover image swap and quick-add button",           category: "commerce",   frameworks: ["next", "react", "astro"], color: "bg-[#d4f0a8]" },
  { name: "cart-modal",   description: "Add-to-cart confirmation modal",                                    category: "commerce",   frameworks: ["next", "react", "astro"], color: "bg-[#f0e0b8]" },
];

const frameworkBadge: Record<string, string> = {
  next:  "bg-black text-white",
  react: "bg-[#61dafb]/20 text-[#0e7490]",
  astro: "bg-[#ff5d01]/10 text-[#c2410c]",
};

async function getCode(name: string, framework: string): Promise<string> {
  const ext = framework === "astro"
    ? `${name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("")}.astro`
    : `${name}.tsx`;

  try {
    const res = await fetch(`${RAW}/registry/${name}/${framework}/${ext}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return "// File not available yet";
    return await res.text();
  } catch {
    return "// Could not load source";
  }
}

export default async function ComponentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ framework?: string }>;
}) {
  const { slug } = await params;
  const { framework: fw } = await searchParams;

  const component = registry.find((c) => c.name === slug);
  if (!component) notFound();

  const activeFramework = fw && component.frameworks.includes(fw) ? fw : component.frameworks[0];
  const code = await getCode(component.name, activeFramework);
  const installCmd = `npx brix-ui add ${component.name}${activeFramework !== "next" ? ` --framework ${activeFramework}` : ""}`;

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 md:px-12 py-12 max-w-5xl mx-auto">
      {/* Back */}
      <a href="/" className="text-sm text-black/40 hover:text-black/70 transition-colors mb-8 inline-block">
        ← All components
      </a>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold text-[#1a1a1a]">{component.name}</h1>
        <span className="text-xs uppercase tracking-wider bg-black/5 text-black/40 rounded-full px-3 py-1 mt-1">
          {component.category}
        </span>
      </div>
      <p className="text-black/50 mb-8">{component.description}</p>

      {/* Install command */}
      <div className="flex items-center gap-3 bg-white border border-black/10 rounded-2xl px-5 py-3 text-sm font-mono shadow-sm mb-10 w-fit">
        <span className="text-black/40">$</span>
        <span className="text-[#1a1a1a]">{installCmd}</span>
      </div>

      {/* Framework tabs */}
      <div className="flex gap-2 mb-6">
        {component.frameworks.map((f) => (
          <a
            key={f}
            href={`/components/${component.name}?framework=${f}`}
            className={`text-sm rounded-full px-4 py-1.5 font-medium transition-colors ${
              f === activeFramework
                ? "bg-[#1a1a1a] text-white"
                : "bg-white border border-black/10 text-black/50 hover:border-black/30"
            }`}
          >
            {f}
          </a>
        ))}
      </div>

      {/* Preview */}
      <div className={`${component.color} rounded-2xl h-48 flex items-center justify-center mb-6`}>
        <span className="text-black/30 text-sm">Live preview coming soon</span>
      </div>

      {/* Code block */}
      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-xs text-white/40 font-mono">
            {activeFramework === "astro"
              ? `${component.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join("")}.astro`
              : `${component.name}.tsx`}
          </span>
          <span className="text-xs text-white/30">{activeFramework}</span>
        </div>
        <pre className="p-5 overflow-x-auto text-sm text-white/80 font-mono leading-relaxed max-h-[520px]">
          <code>{code}</code>
        </pre>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.name }));
}
