export function VideoHeroOverlayPreview() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#2a1f14]">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #3d2b1f 0%, #1a1208 100%)" }} />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(ellipse at 60% 40%, #CCA442 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">New Collection</p>
        <h1 className="text-4xl md:text-6xl font-semibold text-[#fcf5e9] leading-tight mb-8">
          Dressed in<br />purpose
        </h1>
        <a href="#" className="text-sm uppercase tracking-widest text-[#fcf5e9] border border-white/30 rounded-full px-8 py-3 hover:bg-white/10 transition-colors">
          Explore Collection
        </a>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </div>
    </div>
  );
}
