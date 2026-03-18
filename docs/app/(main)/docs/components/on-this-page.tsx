"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("h2[id]")) as HTMLHeadingElement[];
    setHeadings(els.map((el) => ({ id: el.id, text: el.textContent ?? "" })));
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    document.querySelectorAll("h2[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (!headings.length) return null;

  return (
    <aside className="w-48 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pl-4">
      <p className="text-[10px] uppercase tracking-widest text-black/30 font-medium mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm transition-colors ${
                active === h.id
                  ? "text-[#1a1a1a] font-medium"
                  : "text-black/40 hover:text-[#1a1a1a]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
