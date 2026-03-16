"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface VideoHeroProps {
  hero: {
    headline: string;
    logoUrl: string;
    videoUrl: string;
  };
}

export function VideoHero({ hero }: VideoHeroProps) {
  const { headline, logoUrl, videoUrl } = hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  const logoSrc =
    typeof logoUrl === "string" &&
    (logoUrl.startsWith("/") || /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(logoUrl))
      ? logoUrl
      : "/images/showroom-logo.png";

  const handleCanPlay = () => {
    videoRef.current?.play().catch(() => {});
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {videoUrl && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          onCanPlay={handleCanPlay}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-[rgba(166,124,82,0.4)] pointer-events-none mix-blend-multiply" />

      <div className="absolute bottom-28 left-4 md:bottom-12 md:left-12 z-10">
        <Link
          href="/shop"
          className="font-commuters uppercase tracking-widest text-sm sm:text-base md:text-2xl lg:text-4xl text-[#fcf5e9] hover:opacity-80 transition-opacity"
        >
          Shop
        </Link>
      </div>

      <div className="absolute bottom-28 right-4 md:bottom-12 md:right-12 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="font-commuters whitespace-nowrap uppercase tracking-widest text-sm sm:text-base md:text-2xl lg:text-4xl text-[#fcf5e9]">
            {headline}
          </div>
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
            <Image
              src={logoSrc}
              alt={headline}
              fill
              sizes="5vw"
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 hidden md:block">
        <div className="absolute top-1/2 left-0 w-full h-24 bg-accent animate-pulse" />
      </div>
    </section>
  );
}
