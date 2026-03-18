"use client";
import { Carousel } from "../../../ui/carousel";

const items = [
  { id: "1", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=700&fit=crop", alt: "Look 1", title: "Look 1" },
  { id: "2", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=700&fit=crop", alt: "Look 2", title: "Look 2" },
  { id: "3", url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=700&fit=crop", alt: "Look 3", title: "Look 3" },
  { id: "4", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=700&fit=crop", alt: "Look 4", title: "Look 4" },
  { id: "5", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=700&fit=crop", alt: "Look 5", title: "Look 5" },
];

export function CarouselPortraitPreview() {
  return <Carousel items={items} />;
}
