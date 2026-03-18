export function FooterGridPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] flex items-end">
      <footer className="w-full bg-[#1a1a1a] text-white px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3">Other Showroom</p>
              <p className="text-xs text-white/40 leading-relaxed">
                Contemporary fashion rooted in culture, craft, and community.
              </p>
              <div className="flex gap-3 mt-5">
                {["IG", "TW", "FB"].map((s) => (
                  <a key={s} href="#" className="text-xs text-white/30 hover:text-white transition-colors border border-white/10 rounded-full w-8 h-8 flex items-center justify-center">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-medium">Shop</p>
              <ul className="space-y-2.5">
                {["New Arrivals", "Collections", "Sale", "Lookbook"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-medium">Company</p>
              <ul className="space-y-2.5">
                {["About", "Sustainability", "Careers", "Contact"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-medium">Stay in touch</p>
              <p className="text-xs text-white/40 mb-3 leading-relaxed">Get new arrivals and updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                />
                <button className="bg-white text-black text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/90 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/25">
            <span>© 2026 Other Showroom. An Initiative by The Or Foundation.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
