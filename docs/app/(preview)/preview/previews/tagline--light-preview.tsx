export function TaglineLightPreview() {
  return (
    <div className="min-h-screen bg-[#fcf5e9] flex flex-col">
      <div className="h-32 flex items-center justify-center">
        <p className="text-black/20 text-sm">Scroll into view ↓</p>
      </div>
      <section className="relative overflow-hidden bg-[#cca342] h-[70vh]">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a843" />
              <stop offset="100%" stopColor="#b8922e" />
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#tagGrad)" />
          <path id="curvePath" d="M 350 980 C 60 420, 720 280, 1040 440 C 1280 550, 1480 980, 1780 960" fill="none" />
          <text fill="#1f1a12" fontSize="28" fontWeight="600" letterSpacing="2" dominantBaseline="middle">
            <textPath href="#curvePath" startOffset="5%">
              Fashion is not just clothing — it is a language, a culture, a statement of who you are.
            </textPath>
          </text>
        </svg>
      </section>
      <div className="h-32 bg-[#fcf5e9]" />
    </div>
  );
}
