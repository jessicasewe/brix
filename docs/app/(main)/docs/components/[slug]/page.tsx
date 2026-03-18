import { notFound } from "next/navigation";
import { PreviewFrame } from "../preview-frame";

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
  const fileName = activeFramework === "astro"
    ? `${component.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join("")}.astro`
    : `${component.name}.tsx`;

  const installCmd = `npx brix-ui add ${component.name}${activeFramework !== "next" ? ` --framework ${activeFramework}` : ""}`;

  return (
    <div>
      {/* Text header — kept narrow for readability */}
      <div className="max-w-2xl mb-8">
        <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">{component.category}</p>
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">{component.name}</h1>
        <p className="text-black/60 mb-8">{component.description}</p>

        {/* Install command */}
        <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-5 py-3 text-sm font-mono w-fit mb-8">
          <span className="text-white/30">$</span>
          <span className="text-white/80">{installCmd}</span>
        </div>

        {/* Framework tabs */}
        <div className="flex gap-2">
          {component.frameworks.map((f) => (
            <a
              key={f}
              href={`/docs/components/${component.name}?framework=${f}`}
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
      </div>

      {/* Preview + Code — full width */}
      <PreviewFrame
        slug={component.name}
        code={code}
        fileName={fileName}
        framework={activeFramework}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.name }));
}
