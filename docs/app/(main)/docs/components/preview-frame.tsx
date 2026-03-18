"use client";

import { useState } from "react";
import { CopyInline } from "./copy-inline";

type Viewport = "desktop" | "tablet" | "mobile";

interface PreviewFrameProps {
  slug: string;
  componentName: string;
  codes: Record<string, string>;
  highlightedCodes: Record<string, string>;
  frameworks: string[];
}

const viewportHeights: Record<Viewport, number> = {
  desktop: 560,
  tablet: 640,
  mobile: 780,
};

const viewports: { id: Viewport; label: string; width: number | null; icon: React.ReactNode }[] = [
  {
    id: "desktop",
    label: "Desktop",
    width: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "tablet",
    label: "Tablet",
    width: 768,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile",
    width: 390,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M10 18h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function PreviewFrame({ slug, componentName, codes, highlightedCodes, frameworks }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [activeFramework, setActiveFramework] = useState(frameworks[0]);
  const [expanded, setExpanded] = useState(false);

  const activeViewport = viewports.find((v) => v.id === viewport)!;
  const height = viewportHeights[viewport];

  const rawCode = codes[activeFramework] ?? "";
  const highlighted = highlightedCodes[activeFramework] ?? "";

  const fileName = activeFramework === "astro"
    ? `${componentName.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join("")}.astro`
    : `${componentName}.tsx`;

  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 max-w-5xl">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-black/10 flex-wrap">

        {/* Preview label + framework tabs — left side */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-[#1a1a1a] px-3 py-1 bg-black/6 rounded-full">Preview</span>
          {frameworks.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFramework(f)}
              className={`text-sm px-3 py-1 rounded-full transition-colors font-medium ${
                f === activeFramework
                  ? "bg-[#1a1a1a] text-white"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Viewport switcher — right side */}
        <div className="flex items-center gap-1 bg-black/5 rounded-xl p-1">
          {viewports.map((v) => (
            <button
              key={v.id}
              onClick={() => setViewport(v.id)}
              title={v.label}
              className={`p-2 rounded-lg transition-all ${
                viewport === v.id
                  ? "bg-white text-[#1a1a1a] shadow-sm"
                  : "text-black/35 hover:text-black/70"
              }`}
            >
              {v.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Live preview */}
      <div className="bg-[#edeae2] overflow-x-auto" style={{ height: `${height}px` }}>
        <div
          className="mx-auto transition-all duration-300 h-full"
          style={{ width: activeViewport.width ? `${activeViewport.width}px` : "100%" }}
        >
          <iframe
            key={`${viewport}-${activeFramework}`}
            src={`/preview/${slug}`}
            className="w-full border-0 block"
            style={{ height: `${height}px` }}
            title={`${slug} preview — ${activeViewport.label}`}
          />
        </div>
      </div>

      {/* Code block — shiki highlighted */}
      <div>
        {/* Code header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0d1117] border-t-2 border-[#30363d]">
          <span className="text-xs text-[#8b949e] font-mono">{fileName}</span>
          <CopyInline text={rawCode} />
        </div>

        {/* Highlighted code */}
        <div className={`relative overflow-hidden transition-all duration-300 ${expanded ? "" : "max-h-52"}`}>
          <div
            className="overflow-x-auto text-sm leading-relaxed [&>pre]:p-5 [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:bg-[#0d1117]!"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />

          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-28 flex items-end justify-center pb-4"
              style={{ background: "linear-gradient(to top, #0d1117, transparent)" }}>
              <button
                onClick={() => setExpanded(true)}
                className="bg-white/10 hover:bg-white/18 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors border border-white/15"
              >
                View Code
              </button>
            </div>
          )}
        </div>

        {expanded && (
          <div className="flex justify-center py-3 bg-[#0d1117] border-t border-[#30363d]">
            <button
              onClick={() => setExpanded(false)}
              className="text-[#8b949e] hover:text-white text-xs font-medium transition-colors"
            >
              Collapse ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
