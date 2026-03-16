import { useState, useRef, useEffect, useCallback } from "react";

interface CarouselItem {
  id: string;
  url: string;
  alt: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
  rotatingIconUrl?: string;
}

export function Carousel({ items, rotatingIconUrl }: CarouselProps) {
  const [iconRotation, setIconRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const count = items.length || 1;
  const copies = 5;
  const middleCopy = Math.floor(copies / 2);

  const extended =
    items.length > 0
      ? Array.from({ length: count * copies }, (_, i) => ({
          ...items[i % count],
          __extIndex: i,
        }))
      : [];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammatic = useRef(false);

  const updateActiveIndex = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    setIconRotation((r) => r + 180);
  }, []);

  const scrollToItem = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = trackRef.current;
      const item = itemRefs.current[index];
      if (!container || !item) return;

      isProgrammatic.current = true;
      const cRect = container.getBoundingClientRect();
      const iRect = item.getBoundingClientRect();
      const left =
        container.scrollLeft +
        iRect.left -
        cRect.left -
        cRect.width / 2 +
        iRect.width / 2;

      container.scrollTo({ left, behavior });
      setTimeout(() => { isProgrammatic.current = false; }, behavior === "smooth" ? 520 : 50);
    },
    [],
  );

  useEffect(() => {
    if (items.length) {
      const initialIndex = count * middleCopy;
      activeIndexRef.current = initialIndex;
      setActiveIndex(initialIndex);
      requestAnimationFrame(() => { scrollToItem(initialIndex, "auto"); });
    }
  }, [items.length, count, middleCopy, scrollToItem]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container || !items.length) return;

    let rafId: number | null = null;

    const calcClosest = () => {
      const cRect = container.getBoundingClientRect();
      const centerX = cRect.left + cRect.width / 2;
      let closest = -1;
      let dist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const d = Math.abs(rect.left + rect.width / 2 - centerX);
        if (d < dist) { dist = d; closest = i; }
      });
      return closest;
    };

    const onScroll = () => {
      if (isProgrammatic.current) return;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const cRect = container.getBoundingClientRect();
        const centerX = cRect.left + cRect.width / 2;
        const threshold = cRect.width * 0.06;
        let closest = -1;
        let minDist = threshold;

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const d = Math.abs(rect.left + rect.width / 2 - centerX);
          if (d < minDist) { minDist = d; closest = i; }
        });

        if (closest !== -1 && closest !== activeIndexRef.current) {
          activeIndexRef.current = closest;
          setActiveIndex(closest);
          setIconRotation((r) => r + 180);
        }
      });

      scrollTimeout.current = setTimeout(() => {
        const idx = calcClosest();
        if (idx === -1) return;
        const base = idx % count;
        const middle = count * middleCopy + base;

        if (idx < count || idx >= count * (copies - 1)) {
          activeIndexRef.current = middle;
          setActiveIndex(middle);
          setIconRotation((r) => r + 180);
          scrollToItem(middle, "auto");
        } else if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
          setIconRotation((r) => r + 180);
        }
      }, 100);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items.length, count, middleCopy, scrollToItem]);

  useEffect(() => {
    const onResize = () => scrollToItem(activeIndexRef.current, "auto");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrollToItem]);

  if (!items.length) return null;

  return (
    <section className="bg-[#fcf5e9] overflow-hidden pt-1 pb-6">
      <div className="max-w-550 mx-auto px-2">
        <div className="relative h-95 sm:h-120 lg:h-190">
          {rotatingIconUrl && (
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
              <div
                className="w-75 h-75 sm:w-[320px] sm:h-80 md:w-105 md:h-105 lg:w-155 lg:h-155 transition-transform duration-700 opacity-15"
                style={{ transform: `rotate(${iconRotation}deg)` }}
              >
                <img src={rotatingIconUrl} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          <div
            ref={trackRef}
            className="flex items-end gap-1 overflow-x-auto no-scrollbar h-full snap-x snap-mandatory"
          >
            {extended.map((item, index) => {
              const isActive = index === activeIndex;
              const dist = Math.abs(index - activeIndex);

              return (
                <div
                  key={`${item.id}-${index}`}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="shrink-0 flex items-end justify-center h-full snap-center [scroll-snap-stop:always] w-[340px] sm:w-[320px] lg:w-[520px]"
                >
                  <button
                    onClick={() => {
                      updateActiveIndex(index);
                      scrollToItem(index, "smooth");
                    }}
                    className={`
                      relative transition-all duration-500 ease-out origin-bottom
                      ${isActive ? "scale-100 z-10" : "scale-75 z-0"}
                      ${dist >= 3 ? "opacity-40" : "opacity-100"}
                    `}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="relative overflow-hidden w-[340px] h-[400px] sm:w-[320px] sm:h-[360px] lg:w-[520px] lg:h-[580px]">
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
