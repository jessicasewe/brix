export default function Introduction() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Getting started</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Introduction</h1>
      <p className="text-black/60 text-base leading-relaxed mb-6">
        Brix is a component library built differently. There is no package to install, no version to pin,
        and no black box to fight with. You pick the component you want, run one command, and the full
        source lands directly in your project. From that point on, the code is yours.
      </p>

      <h2 id="why" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Why this approach</h2>
      <p className="text-black/60 text-base leading-relaxed mb-4">
        Most UI libraries ask you to accept their abstractions forever. Brix takes the opposite stance —
        copy the component, customise freely, delete what you don't need. No peer dependency conflicts,
        no waiting for a maintainer to merge your edge case.
      </p>

      <h2 id="frameworks" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Framework support</h2>
      <p className="text-black/60 text-base leading-relaxed mb-4">
        Every component ships in three flavours out of the box:
      </p>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {[
          { fw: "Next.js", note: "Uses next/link and next/image", color: "bg-black/90 text-white", dot: "bg-white" },
          { fw: "React",   note: "Plain <a> and <img> — no framework deps", color: "bg-[#e8f7fe] text-[#087ea4]", dot: "bg-[#61DAFB]" },
          { fw: "Astro",   note: ".astro file with inline scripts for interactivity", color: "bg-[#fff4f0] text-[#FF5D01]", dot: "bg-[#FF5D01]" },
        ].map(({ fw, note, color, dot }) => (
          <div key={fw} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${color}`}>
            <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
            <span className="font-semibold w-16 shrink-0">{fw}</span>
            <span className="opacity-70">{note}</span>
          </div>
        ))}
      </div>

      <h2 id="quick-start" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Quick start</h2>
      <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 font-mono text-sm text-white/80">
        npx brix-ui add footer
      </div>
    </div>
  );
}
