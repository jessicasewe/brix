import { useEffect, useRef, useState } from "react";

interface TaglineProps {
  quoteText: string;
}

export function Tagline({ quoteText }: TaglineProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const startOffset = `${65 - progress * 100}%`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#cca342] h-[70vh] sm:h-screen"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <image
          href="/images/garmet-section.png"
          width="1440"
          height="900"
          preserveAspectRatio="xMidYMid slice"
        />
        <path
          id="whitePath"
          d="M 350 980 C 60 420, 720 280, 1040 440 C 1280 550, 1480 980, 1780 960"
          fill="none"
          strokeWidth="3"
        />
        <text
          fill="#1f1a12"
          fontSize="30"
          fontWeight="600"
          letterSpacing="2"
          dominantBaseline="middle"
        >
          <textPath href="#whitePath" startOffset={startOffset}>
            {quoteText}
          </textPath>
        </text>
      </svg>
    </section>
  );
}
