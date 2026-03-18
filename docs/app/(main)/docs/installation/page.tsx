import { CodeBlock } from "../components/code-block";
import { CopyInline } from "../components/copy-inline";

const frameworks = [
  {
    name: "Next.js",
    flag: "next",
    bg: "bg-black",
    icon: (
      <svg viewBox="0 0 180 180" className="w-12 h-12" fill="white">
        <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.064 164.638C142.614 162.383 146.059 159.952 149.508 157.52Z" fill="white" />
          <rect x="115" y="54" width="12" height="72" fill="white" />
        </g>
      </svg>
    ),
  },
  {
    name: "React",
    flag: "react",
    bg: "bg-[#20232a]",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Astro",
    flag: "astro",
    bg: "bg-[#17191e]",
    icon: (
      <svg viewBox="0 0 85 107" className="w-10 h-10" fill="none">
        <path
          d="M27.5725 3.03205C27.5725 3.03205 41.4652 -0.615689 55.3578 6.67442C69.2505 13.9645 73.3706 27.8572 73.3706 27.8572C73.3706 27.8572 82.4506 51.6424 72.5706 69.6025C62.6905 87.5625 42.9305 89.5625 42.9305 89.5625C42.9305 89.5625 17.3305 90.4425 4.13049 69.6025C-9.06951 48.7625 5.41049 22.5625 5.41049 22.5625"
          stroke="#FF5D01"
          strokeWidth="4"
        />
        <path
          d="M27.5 82C27.5 82 21 78 21 65.5C21 53 29.5 47.5 42.5 47.5C55.5 47.5 64.5 53.5 64.5 65.5C64.5 77.5 57.5 82 57.5 82"
          stroke="#FF5D01"
          strokeWidth="4"
        />
        <path
          d="M42.5 47.5V89.5"
          stroke="#FF5D01"
          strokeWidth="4"
        />
        <circle cx="42.5" cy="95" r="7" fill="#FF5D01" />
        <path
          d="M27.5 3L42.5 47.5L57.5 3"
          stroke="#FF5D01"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Installation() {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Setup</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Installation</h1>
      <p className="text-black/60 text-base leading-relaxed mb-10">
        No package to install globally. The CLI runs on-demand and writes source files directly into your project.
      </p>

      <h2 id="pick-framework" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Pick your framework</h2>
      <p className="text-black/60 text-sm leading-relaxed mb-5">
        Brix supports three frameworks. Pick yours and the CLI will copy the right version into your project.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {frameworks.map((f) => (
          <div
            key={f.name}
            className={`${f.bg} rounded-2xl py-8 flex flex-col items-center justify-center gap-3 cursor-default`}
          >
            {f.icon}
            <span className="text-sm text-white/70">{f.name}</span>
          </div>
        ))}
      </div>

      <h2 id="steps" className="text-lg font-semibold text-[#1a1a1a] mb-6 mt-10">Steps</h2>

      <div className="space-y-8">
        <div>
          <p className="font-semibold text-[#1a1a1a] mb-3">1. Add a component</p>
          <CodeBlock component="footer" />
          <p className="text-sm text-black/50 mt-2">Replace footer with any component name. Defaults to Next.js.</p>
        </div>

        <div>
          <p className="font-semibold text-[#1a1a1a] mb-3">2. Specify a framework</p>
          <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 font-mono text-sm text-white/80 flex items-center justify-between">
            <span>npx brix-ui add footer --framework react</span>
            <CopyInline text="npx brix-ui add footer --framework react" />
          </div>
          <p className="text-sm text-black/50 mt-2">Pass <code className="bg-black/6 px-1.5 py-0.5 rounded text-xs">--framework react</code> or <code className="bg-black/6 px-1.5 py-0.5 rounded text-xs">--framework astro</code> to switch.</p>
        </div>

        <div>
          <p className="font-semibold text-[#1a1a1a] mb-3">3. Custom output directory</p>
          <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 font-mono text-sm text-white/80 flex items-center justify-between">
            <span>npx brix-ui add footer --dir src/components</span>
            <CopyInline text="npx brix-ui add footer --dir src/components" />
          </div>
          <p className="text-sm text-black/50 mt-2">Defaults to <code className="bg-black/6 px-1.5 py-0.5 rounded text-xs">components/ui/</code>.</p>
        </div>

        <div>
          <p className="font-semibold text-[#1a1a1a] mb-2">4. Own the code</p>
          <p className="text-sm text-black/50">The file is now in your project. Edit it freely — there is nothing to sync back.</p>
        </div>
      </div>

      <h2 id="requirements" className="text-lg font-semibold text-[#1a1a1a] mb-4 mt-10">Requirements</h2>
      <div className="bg-[#f0c4b0]/40 border border-[#f0c4b0] rounded-2xl px-6 py-4">
        <ul className="text-sm text-black/60 space-y-1">
          <li>Node.js 18 or later</li>
          <li>Tailwind CSS v4 in your project</li>
        </ul>
      </div>
    </div>
  );
}

