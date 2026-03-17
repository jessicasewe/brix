"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  footer: {
    address: string;
    email: string;
    socialLinks: Array<{ uri: string; title: string }>;
    logoUrl: string;
    secondChanceLogoUrl: string;
    secondChanceAlbumLink: string;
    theorLogoUrl: string;
    theorLink: { uri: string; title: string };
  };
  headline: string;
}

export function Footer({ footer, headline }: FooterProps) {
  const addressLines = footer.address.split("\n").filter((line) => line.trim());

  const instagramLink = footer.socialLinks.find((link) =>
    link.title.toLowerCase().includes("instagram"),
  );

  const instagramHandle = instagramLink?.uri
    .replace(/https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\/$/, "");

  return (
    <footer className="bg-black text-[#fcf5e9] px-6 md:px-10 lg:px-16 py-6 md:py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
          {/* Left Column — Or Foundation logo + attribution */}
          <div className="flex flex-col items-center md:items-start md:w-[22%]">
            <div className="flex flex-col items-center md:items-start gap-4 md:mt-8">
              <Link
                href={footer.theorLink?.uri || "https://theor.org/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={footer.theorLogoUrl || "/images/theorlogoblk.png"}
                  alt="The Or Foundation"
                  width={200}
                  height={80}
                  className="object-contain brightness-0 invert"
                  priority
                  unoptimized
                />
              </Link>
              <p className="text-sm text-white/70 text-center w-full max-w-[200px]">
                An Initiative By
                <br />
                The Or Foundation
              </p>
            </div>
          </div>

          {/* Middle Column — Location, Socials, Email */}
          <div className="md:w-[35%] flex flex-col gap-5 justify-center items-center">
            <div className="text-center">
              <p className="font-semibold text-white mb-0.5">Location</p>
              {addressLines.map((line, i) => (
                <p key={i} className="text-sm text-white/70">
                  {line}
                </p>
              ))}
            </div>

            <div className="text-center">
              <p className="font-semibold text-white mb-0.5">Socials</p>
              {instagramLink ? (
                <Link
                  href={instagramLink.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {instagramHandle}
                </Link>
              ) : (
                <p className="text-sm text-white/70">@othershowroom</p>
              )}
            </div>

            <div className="text-center">
              <p className="font-semibold text-white mb-0.5">Email</p>
              <Link
                href={`mailto:${footer.email}`}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {footer.email}
              </Link>
            </div>
            <p className="text-xs text-white/50 text-center mt-2">
              Copyright (C) The Or Foundation - {new Date().getFullYear()}
            </p>
          </div>

          {/* Right Column — Logo + optional second logo */}
          <div className="md:w-[28%] flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 relative">
                <Image
                  src={footer.logoUrl}
                  alt={headline}
                  fill
                  sizes="58px"
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
              <span className="uppercase tracking-widest text-lg font-semibold text-[#fcf5e9]">
                {headline}
              </span>
            </div>

            {footer.secondChanceLogoUrl && footer.secondChanceAlbumLink && (
              <Link
                href={footer.secondChanceAlbumLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={footer.secondChanceLogoUrl}
                  alt="Secondary Logo"
                  width={260}
                  height={90}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
