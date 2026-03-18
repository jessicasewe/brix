export function NavbarLightPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <header className="sticky top-0 z-50 bg-white border-b border-black/8 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold text-lg tracking-tight text-[#1a1a1a]">Other Showroom</a>
          <nav className="hidden md:flex items-center gap-8">
            {["Shop", "Collections", "About", "Contact"].map((l) => (
              <a key={l} href="#" className="text-sm text-black/50 hover:text-[#1a1a1a] transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="relative">
              <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </a>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-center h-64">
        <p className="text-black/25 text-sm">Page content — light navbar stays visible while scrolling</p>
      </div>
    </div>
  );
}
