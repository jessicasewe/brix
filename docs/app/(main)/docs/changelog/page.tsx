const entries = [
  {
    version: "v0.1.0",
    date: "March 2026",
    tag: "Initial release",
    changes: [
      "Added footer, top-banner, video-hero, tagline, carousel components",
      "CLI supports Next.js, React, and Astro framework targets",
      "npx brix-ui add <component> — fetches source directly from the registry",
      "npx brix-ui list — shows all available components and frameworks",
      "brix.json config file for tracking installed components per project",
      "npx brix-ui info — shows what is installed in your project",
      "npx brix-ui update — re-fetches all previously installed components",
    ],
  },
];

export default function Changelog() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Updates</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Changelog</h1>
      <p className="text-black/60 text-base leading-relaxed mb-10">
        All notable changes to Brix are documented here.
      </p>

      <div className="space-y-12">
        {entries.map((entry) => (
          <div key={entry.version}>
            <div className="flex items-center gap-3 mb-5">
              <h2 id={entry.version} className="text-xl font-bold text-[#1a1a1a]">
                {entry.version}
              </h2>
              <span className="text-xs bg-black/6 text-black/50 rounded-full px-3 py-1">{entry.tag}</span>
              <span className="text-xs text-black/30 ml-auto">{entry.date}</span>
            </div>
            <ul className="space-y-2.5">
              {entry.changes.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-black/60">
                  <span className="text-black/20 mt-0.5">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
