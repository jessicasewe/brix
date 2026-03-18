export function FooterMinimalPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] flex items-end">
      <footer className="w-full bg-[#1a1a1a] text-white px-8 py-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold uppercase tracking-widest">Other Showroom</span>
          <div className="flex gap-8 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Shop</a>
            <a href="#" className="hover:text-white transition-colors">Collections</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/30">© 2026 Other Showroom</p>
        </div>
      </footer>
    </div>
  );
}
