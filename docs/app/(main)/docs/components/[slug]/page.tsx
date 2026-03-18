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
  "top-banner": [
    { id: "default", label: "Gold",  description: "Warm gold announcement bar with scrolling marquee and logo" },
    { id: "dark",    label: "Dark",  description: "Black background with white text — for dark-themed sites" },
  ],
  "video-hero": [
    { id: "default", label: "Video",   description: "Full-screen video background with headline and logo" },
    { id: "overlay", label: "Overlay", description: "Warm amber gradient with centered headline and CTA" },
  ],
  tagline: [
    { id: "default", label: "Animated", description: "Scroll-animated text following a curved SVG path" },
    { id: "light",   label: "Static",   description: "Curved text on a warm gold background — no scroll dependency" },
  ],
  carousel: [
    { id: "default",  label: "Default",  description: "Infinite horizontal scroll carousel with scale and opacity effects" },
    { id: "portrait", label: "Portrait", description: "Taller portrait-ratio images for editorial layouts" },
  ],
  navbar: [
    { id: "default", label: "Transparent", description: "Starts transparent, fills dark on scroll — for hero pages" },
    { id: "light",   label: "Light",       description: "Always-white navbar with dark text — for content pages" },
  ],
  "product-card": [
    { id: "default", label: "Single",     description: "Product card with hover image swap and quick-add button" },
    { id: "grid",    label: "Collection", description: "Three cards in a responsive grid — as used in shop pages" },
  ],
  "cart-modal": [
    { id: "default", label: "Modal",  description: "Centred overlay modal with quantity selector and actions" },
    { id: "slide",   label: "Drawer", description: "Slide-in side panel with full cart summary and checkout" },
  ],
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
        {(() => {
          const colors: Record<string, string> = {
            layout:     "bg-amber-50 text-amber-700 border-amber-200",
            display:    "bg-emerald-50 text-emerald-700 border-emerald-200",
            navigation: "bg-blue-50 text-blue-700 border-blue-200",
            commerce:   "bg-rose-50 text-rose-700 border-rose-200",
          };
          return (
            <span className={`inline-block text-xs uppercase tracking-widest font-medium mb-3 px-2.5 py-1 rounded-full border ${colors[component.category] ?? "bg-black/5 text-black/40 border-black/10"}`}>
              {component.category}
            </span>
          );
        })()}
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
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-[#f0ece4] text-black/40 text-xs font-semibold flex items-center justify-center shrink-0">
                  {variations.indexOf(v) + 1}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-[#1a1a1a]">{v.label}</h2>
                  <p className="text-sm text-black/45 mt-0.5">{v.description}</p>
                </div>
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
