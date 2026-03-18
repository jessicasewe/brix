export function TopBannerDarkPreview() {
  const texts = ["New Collection Available Now", "Free Shipping On Orders Over $100", "Sustainable Fashion For The Future"];
  const repeated = [...texts, ...texts, ...texts];
  return (
    <div className="min-h-screen bg-[#111]">
      <div className="w-full bg-black flex items-center h-10 overflow-hidden relative border-b border-white/8">
        <div className="flex-shrink-0 px-5 flex items-center h-full">
          <span className="text-white text-xs font-semibold tracking-widest uppercase">OS</span>
        </div>
        <div className="w-px h-5 bg-white/10 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {repeated.map((text, i) => (
              <span key={i} className="inline-block px-8 text-xs text-white/50 uppercase tracking-wider">{text}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-48">
        <p className="text-white/15 text-sm">Page content below banner</p>
      </div>
    </div>
  );
}
