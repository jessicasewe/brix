"use client";

import { useState } from "react";
import { CopyInline } from "./copy-inline";

interface PreviewFrameProps {
  slug: string;
  code: string;
  fileName: string;
  framework: string;
}

export function PreviewFrame({ slug, code, fileName, framework }: PreviewFrameProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 py-2.5 border-b border-black/10 bg-white">
        <button
          onClick={() => setTab("preview")}
          className={`text-sm px-3 py-1 rounded-full transition-colors ${
            tab === "preview" ? "bg-black/8 text-[#1a1a1a] font-medium" : "text-black/40 hover:text-black"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setTab("code")}
          className={`text-sm px-3 py-1 rounded-full transition-colors ${
            tab === "code" ? "bg-black/8 text-[#1a1a1a] font-medium" : "text-black/40 hover:text-black"
          }`}
        >
          Code
        </button>

        {tab === "code" && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-black/30 font-mono">{fileName}</span>
            <CopyInline text={code} />
          </div>
        )}
      </div>

      {/* Preview */}
      {tab === "preview" && (
        <div className="bg-[#f7f4ee]">
          <iframe
            src={`/preview/${slug}`}
            className="w-full border-0"
            style={{ height: "480px" }}
            title={`${slug} preview`}
          />
        </div>
      )}

      {/* Code */}
      {tab === "code" && (
        <div className="bg-[#1a1a1a]">
          <pre className="p-5 overflow-x-auto text-sm text-white/80 font-mono leading-relaxed max-h-[480px]">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
