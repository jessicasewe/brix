"use client";

import { useState } from "react";
import { CartModal } from "../../ui/cart-modal";

export function CartModalPreview() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white text-sm px-6 py-3 rounded-xl hover:bg-black/80 transition-colors"
        >
          Add to Cart
        </button>
      )}
      <CartModal
        isOpen={open}
        onClose={() => setOpen(false)}
        item={{
          id: "1",
          name: "Linen Wrap Dress",
          price: "GH₵ 320.00",
          imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=280&fit=crop",
          size: "M",
        }}
        cartHref="/cart"
      />
    </div>
  );
}
