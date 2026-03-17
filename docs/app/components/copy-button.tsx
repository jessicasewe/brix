"use client";

export function CopyButton({ text }: { text: string }) {
  return (
    <button
      className="ml-2 text-black/30 hover:text-black/70 transition-colors text-xs border border-black/10 rounded px-2 py-0.5"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      copy
    </button>
  );
}
