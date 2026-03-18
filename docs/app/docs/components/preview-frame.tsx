"use client";

import { useState } from "react";
import { CopyInline } from "./copy-inline";

interface PreviewFrameProps {
  slug: string;
  code: string;
  fileName: string;
  framework: string;
}

export function PreviewFrame({ slug, code, fileName }: PreviewFrameProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden border border-black/10">
      {/* Live preview — always visible, interactive */}
      <div className="bg-[#f0ece4] relative">
        <iframe
          src={`/preview/${slug}`}
          className="w-full border-0"
          style={{ height: "480px" }}
          title={`${slug} preview`}
        />
      </div>

      {/* Code block */}
      <div className="bg-[#1a1a1a] relative">
        {/* Code header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <span className="text-xs text-white/30 font-mono">{fileName}</span>
          <CopyInline text={code} />
        </div>

        {/* Code content */}
        <div className={`relative overflow-hidden transition-all duration-300 ${expanded ? "" : "max-h-48"}`}>
          <pre className="p-5 overflow-x-auto text-sm text-white/75 font-mono leading-relaxed">
            <code>{code}</code>
          </pre>

          {/* Fade + View Code button — only when collapsed */}
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1a1a] to-transparent flex items-end justify-center pb-4">
              <button
                onClick={() => setExpanded(true)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur text-white text-sm font-medium px-5 py-2 rounded-full transition-colors border border-white/10"
              >
                View Code
              </button>
            </div>
          )}
        </div>

        {/* Collapse button — only when expanded */}
        {expanded && (
          <div className="flex justify-center py-3 border-t border-white/8">
            <button
              onClick={() => setExpanded(false)}
              className="text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
            >
              Collapse ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
