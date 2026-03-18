"use client";
import { ProductCard } from "../../../ui/product-card";

const products = [
  {
    id: "1",
    name: "Linen Wrap Dress",
    price: "GH₵ 320.00",
    href: "#",
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
  },
  {
    id: "2",
    name: "Cotton Midi Skirt",
    price: "GH₵ 180.00",
    href: "#",
    primaryImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
  },
  {
    id: "3",
    name: "Oversized Blazer",
    price: "GH₵ 450.00",
    href: "#",
    primaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
  },
];

export function ProductCardGridPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] p-8 md:p-12">
      <p className="text-xs uppercase tracking-widest text-black/30 font-medium mb-6">New Arrivals</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickAdd={(id) => console.log("add", id)} />
        ))}
      </div>
    </div>
  );
}
