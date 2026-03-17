import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    href: string;
    primaryImage: string;
    hoverImage?: string;
  };
  onQuickAdd?: (id: string) => void;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="group relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <a href={product.href} className="block relative overflow-hidden aspect-[3/4] bg-[#f0ece4]">
        <img
          src={product.primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${hovered && product.hoverImage ? "opacity-0" : "opacity-100"}`}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <button
            onClick={(e) => { e.preventDefault(); onQuickAdd?.(product.id); }}
            className="w-full bg-white text-black text-xs uppercase tracking-widest font-medium py-3 hover:bg-[#fcf5e9] transition-colors"
          >
            Quick Add
          </button>
        </div>
      </a>
      <div className="pt-3 pb-1">
        <a href={product.href} className="block">
          <p className="text-sm font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">{product.name}</p>
          <p className="text-sm text-black/50 mt-0.5">{product.price}</p>
        </a>
      </div>
    </div>
  );
}
