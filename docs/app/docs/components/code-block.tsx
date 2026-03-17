"use client";

import { useState } from "react";

const managers = ["npx", "pnpm", "yarn", "bun"] as const;
type Manager = typeof managers[number];

const commands: Record<Manager, string> = {
  npx:  "npx brix-ui add",
  pnpm: "pnpm dlx brix-ui add",
  yarn: "yarn dlx brix-ui add",
  bun:  "bunx brix-ui add",
};

interface CodeBlockProps {
  component?: string;
}

export function CodeBlock({ component = "<component>" }: CodeBlockProps) {
  const [active, setActive] = useState<Manager>("npx");
  const [copied, setCopied] = useState(false);

  const fullCmd = `${commands[active]} ${component}`;

  const copy = () => {
    navigator.clipboard.writeText(fullCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden text-sm font-mono">
      {/* Tabs row */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-white/8">
        {/* Terminal icon */}
        <svg className="w-4 h-4 text-white/30 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3" />
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {managers.map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className={`px-3 py-0.5 rounded-full text-xs transition-colors ${
              active === m
                ? "bg-white/15 text-white font-medium"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {m}
          </button>
        ))}

        {/* Copy button */}
        <button
          onClick={copy}
          className="ml-auto text-white/30 hover:text-white/70 transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>

      {/* Command */}
      <div className="px-5 py-4 text-white/80">
        {fullCmd}
      </div>
    </div>
  );
}
