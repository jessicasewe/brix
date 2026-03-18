const commands = [
  { cmd: "npx brix-ui list",                                  desc: "List all available components and their supported frameworks" },
  { cmd: "npx brix-ui add <component>",                       desc: "Add a component (defaults to Next.js)" },
  { cmd: "npx brix-ui add <component> --framework react",     desc: "Add the React version" },
  { cmd: "npx brix-ui add <component> --framework astro",     desc: "Add the Astro version" },
  { cmd: "npx brix-ui add <component> --dir src/components",  desc: "Output to a custom directory" },
  { cmd: "npx brix-ui update",                                desc: "Re-fetch all previously installed components from the registry" },
  { cmd: "npx brix-ui info",                                  desc: "Show installed components and config from brix.json" },
];

export default function CliRegistry() {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Reference</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">CLI & Registry</h1>
      <p className="text-black/60 text-base leading-relaxed mb-10">
        The CLI fetches component source directly from the public GitHub registry and writes it into your project.
        No build step, no compiled output — raw TypeScript or Astro source you can read and edit immediately.
      </p>

      <h2 id="commands" className="text-lg font-semibold text-[#1a1a1a] mb-4 mt-10">Commands</h2>
      <div className="space-y-3 mb-10">
        {commands.map((c) => (
          <div key={c.cmd} className="bg-white border border-black/8 rounded-2xl p-4">
            <p className="font-mono text-sm text-[#1a1a1a] mb-1">{c.cmd}</p>
            <p className="text-xs text-black/50">{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="structure" className="text-lg font-semibold text-[#1a1a1a] mb-4 mt-10">Registry structure</h2>
      <p className="text-black/60 text-sm leading-relaxed mb-4">
        Each component lives in <code className="bg-black/6 px-1.5 py-0.5 rounded text-xs font-mono">registry/&lt;name&gt;/&lt;framework&gt;/</code>.
        Adding a new framework is as simple as creating the folder and dropping the file in.
      </p>
      <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 font-mono text-sm text-white/60 leading-relaxed overflow-x-auto whitespace-pre">{`registry/
└── footer/
    ├── meta.json
    ├── next/footer.tsx
    ├── react/footer.tsx
    └── astro/Footer.astro`}</div>
    </div>
  );
}
