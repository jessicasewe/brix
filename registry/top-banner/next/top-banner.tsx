"use client";

import Image from "next/image";
import Link from "next/link";

interface TopBannerProps {
  theorLogoUrl: string;
  theorLink: { uri: string; title: string };
  updates?: string[];
}

export function TopBanner({
  theorLogoUrl,
  theorLink,
  updates = [],
}: TopBannerProps) {
  const defaultUpdates = ["An Initiative By The Or Foundation"];
  const scrollingTexts = updates.length > 0 ? updates : defaultUpdates;
  const repeated = [...scrollingTexts, ...scrollingTexts, ...scrollingTexts];

  return (
    <div className="w-full bg-[#CCA442] flex items-center h-9 md:h-10 overflow-hidden z-50 relative">
      <Link
        href={theorLink?.uri || "https://theor.org/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 px-3 md:px-5 flex items-center h-full"
      >
        <Image
          src={theorLogoUrl || "/images/theorlogoblk.png"}
          alt="The Or Foundation"
          width={70}
          height={35}
          className="object-contain"
          priority
          unoptimized
        />
      </Link>

      <div className="w-px h-5 bg-black/20 flex-shrink-0" />

      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {repeated.map((text, i) => (
            <span
              key={i}
              className="inline-block px-8 text-xs md:text-sm font-medium text-black/80 uppercase tracking-wider"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
