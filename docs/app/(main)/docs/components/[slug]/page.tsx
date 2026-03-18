import { notFound } from "next/navigation";
import { PreviewFrame } from "../preview-frame";
import { highlight } from "../../../../../lib/highlight";

const REPO = "jessicasewe/brix";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

const registry = [
  { name: "footer",       description: "Three-column site footer with logo, location, socials, and email", category: "layout",     frameworks: ["next", "react", "astro"] },
  { name: "top-banner",   description: "Sticky top announcement bar with scrolling marquee text and logo",  category: "layout",     frameworks: ["next", "react", "astro"] },
  { name: "video-hero",   description: "Full-screen video background hero section with logo and headline",  category: "display",    frameworks: ["next", "react", "astro"] },
  { name: "tagline",      description: "Scroll-animated text following a curved SVG path",                  category: "display",    frameworks: ["next", "react", "astro"] },
  { name: "carousel",     description: "Infinite horizontal scroll carousel with scale and opacity effects",category: "display",    frameworks: ["next", "react", "astro"] },
  { name: "navbar",       description: "Sticky nav with mobile menu, cart badge, and scroll-aware transparency", category: "navigation", frameworks: ["next", "react", "astro"] },
  { name: "product-card", description: "Product card with hover image swap and quick-add button",           category: "commerce",   frameworks: ["next", "react", "astro"] },
  { name: "cart-modal",   description: "Add-to-cart confirmation modal with quantity selector",             category: "commerce",   frameworks: ["next", "react", "astro"] },
];

const componentVariations: Record<string, Array<{ id: string; label: string; description: string }>> = {
  footer: [
    { id: "default",  label: "Default",      description: "Three-column footer with logo, location, socials, and email" },
    { id: "minimal",  label: "Minimal",       description: "Single-row footer — brand name, nav links, copyright" },
    { id: "grid",     label: "Multi-column",  description: "Four-column grid with shop links, company links, and newsletter" },
  ],
  "top-banner":   [{ id: "default", label: "Default", description: "Gold announcement bar with scrolling marquee and logo" }],
  "video-hero":   [{ id: "default", label: "Default", description: "Full-screen video background with headline and logo" }],
  tagline:        [{ id: "default", label: "Default", description: "Scroll-animated text following a curved SVG path" }],
  carousel:       [{ id: "default", label: "Default", description: "Infinite horizontal scroll carousel with scale and opacity effects" }],
  navbar:         [{ id: "default", label: "Default", description: "Sticky nav with mobile menu, cart badge, and scroll-aware transparency" }],
  "product-card": [{ id: "default", label: "Default", description: "Product card with hover image swap and quick-add button" }],
  "cart-modal":   [{ id: "default", label: "Default", description: "Add-to-cart confirmation modal with quantity selector" }],
};

async function getCode(name: string, framework: string): Promise<string> {
  const ext = framework === "astro"
    ? `${name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("")}.astro`
    : `${name}.tsx`;
  try {
    const res = await fetch(`${RAW}/registry/${name}/${framework}/${ext}`, { next: { revalidate: 60 } });
    if (!res.ok) return "// File not available yet";
    return await res.text();
  } catch {
    return "// Could not load source";
  }
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const component = registry.find((c) => c.name === slug);
  if (!component) notFound();

  // Fetch + highlight all framework codes server-side
  const codes: Record<string, string> = {};
  const highlightedCodes: Record<string, string> = {};
  for (const fw of component.frameworks) {
    const raw = await getCode(component.name, fw);
    codes[fw] = raw;
    highlightedCodes[fw] = await highlight(raw, fw === "astro" ? "astro" : "tsx");
  }

  const installCmd = `npx brix-ui add ${component.name}`;
  const variations = componentVariations[component.name] ?? [{ id: "default", label: "Default", description: component.description }];

  return (
    <div>
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">{component.category}</p>
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">{component.name}</h1>
        <p className="text-black/60 mb-8">{component.description}</p>

        <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-5 py-3 text-sm font-mono w-fit">
          <span className="text-white/30">$</span>
          <span className="text-white/80">{installCmd}</span>
        </div>
      </div>

      {/* Variations — each has its own framework tabs + preview + code */}
      <div className="flex flex-col gap-14">
        {variations.map((v) => {
          const previewSlug = v.id === "default" ? component.name : `${component.name}--${v.id}`;
          return (
            <div key={v.id}>
              <div className="mb-4">
                <h2 className="text-base font-semibold text-[#1a1a1a]">{v.label}</h2>
                <p className="text-sm text-black/45 mt-0.5">{v.description}</p>
              </div>
              <PreviewFrame
                slug={previewSlug}
                componentName={component.name}
                codes={codes}
                highlightedCodes={highlightedCodes}
                frameworks={component.frameworks}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.name }));
}
