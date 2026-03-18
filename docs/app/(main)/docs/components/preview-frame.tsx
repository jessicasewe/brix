"use client";

import { useState } from "react";
import { CopyInline } from "./copy-inline";

type Viewport = "desktop" | "tablet" | "mobile";

interface PreviewFrameProps {
  slug: string;
  code: string;
  fileName: string;
  framework: string;
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
    width: null, // fills container
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

export function PreviewFrame({ slug, code, fileName }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [expanded, setExpanded] = useState(false);

  const active = viewports.find((v) => v.id === viewport)!;

  const height = viewportHeights[viewport];

  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden border border-black/10 max-w-5xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-black/10">
        {/* Viewport switcher */}
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

        {/* Viewport label */}
        <span className="text-xs text-black/30 font-medium hidden sm:block">
          {active.width ? `${active.width}px` : "Full width"}
        </span>
      </div>

      {/* Preview area */}
      <div className="bg-[#edeae2] overflow-x-auto" style={{ height: `${height}px` }}>
        <div
          className="mx-auto transition-all duration-300 h-full"
          style={{ width: active.width ? `${active.width}px` : "100%" }}
        >
          <iframe
            key={viewport}
            src={`/preview/${slug}`}
            className="w-full border-0 block"
            style={{ height: `${height}px` }}
            title={`${slug} preview — ${active.label}`}
          />
        </div>
      </div>

      {/* Code block */}
      <div className="bg-[#1a1a1a]">
        {/* Code header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <span className="text-xs text-white/30 font-mono">{fileName}</span>
          <CopyInline text={code} />
        </div>

        {/* Code content */}
        <div className={`relative overflow-hidden transition-all duration-300 ${expanded ? "" : "max-h-52"}`}>
          <pre className="p-5 overflow-x-auto text-sm text-white/75 font-mono leading-relaxed">
            <code>{code}</code>
          </pre>

          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1a1a] to-transparent flex items-end justify-center pb-4">
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
          <div className="flex justify-center py-3 border-t border-white/8">
            <button
              onClick={() => setExpanded(false)}
              className="text-white/35 hover:text-white/60 text-xs font-medium transition-colors"
            >
              Collapse ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
