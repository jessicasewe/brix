"use client";

import { ProductCard } from "../../ui/product-card";

export function ProductCardPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] p-12">
      <div className="max-w-sm mx-auto">
        <ProductCard
          product={{
            id: "1",
            name: "Linen Wrap Dress",
            price: "GH₵ 320.00",
            href: "/products/linen-wrap-dress",
            primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
            hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
          }}
          onQuickAdd={(id) => console.log("Quick add:", id)}
        />
      </div>
    </div>
  );
}
