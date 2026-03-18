export default function Theming() {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-2">Customisation</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Theming</h1>
      <p className="text-black/60 text-base leading-relaxed mb-8">
        Because you own the source, theming is just editing Tailwind classes. There are no CSS variables
        to override, no theme tokens to configure. Change the colours directly in the component file.
      </p>

      <h2 id="fonts" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Custom fonts</h2>
      <p className="text-black/60 text-sm leading-relaxed mb-4">
        Components that use custom fonts reference them via Tailwind utility classes.
        Add the font face to your <code className="bg-black/6 px-1.5 py-0.5 rounded text-xs font-mono">globals.css</code>:
      </p>
      <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 font-mono text-sm text-white/80 mb-8 overflow-x-auto whitespace-pre">{`@font-face {
  font-family: 'Commuters Sans';
  src: url('/fonts/CommuteSans.woff2') format('woff2');
  font-display: swap;
}`}</div>

      <h2 id="colours" className="text-lg font-semibold text-[#1a1a1a] mb-3 mt-10">Colours</h2>
      <p className="text-black/60 text-sm leading-relaxed mb-4">
        All components use Tailwind colour classes. To change a colour, find it in the component file and swap the value.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Brand warm", value: "#fcf5e9", bg: "bg-[#fcf5e9]" },
          { name: "Brand gold",  value: "#cca342", bg: "bg-[#cca342]" },
          { name: "Dark",        value: "#1a1a1a", bg: "bg-[#1a1a1a]" },
          { name: "Off-white",   value: "#f7f4ee", bg: "bg-[#f7f4ee]" },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-3 bg-white border border-black/8 rounded-xl p-3">
            <div className={`w-8 h-8 rounded-lg border border-black/10 shrink-0 ${c.bg}`} />
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">{c.name}</p>
              <p className="text-xs font-mono text-black/40">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
