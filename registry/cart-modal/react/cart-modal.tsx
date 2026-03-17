import { useState } from "react";

interface CartItem { id: string; name: string; price: string; imageUrl: string; size?: string; }

interface CartModalProps {
  item: CartItem;
  isOpen: boolean;
  onClose: () => void;
  cartHref?: string;
}

export function CartModal({ item, isOpen, onClose, cartHref = "/cart" }: CartModalProps) {
  const [qty, setQty] = useState(1);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm font-medium text-[#1a1a1a]">Added to cart</span>
          </div>
          <button onClick={onClose} className="text-black/40 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex gap-4 px-5 py-5">
          <img src={item.imageUrl} alt={item.name} className="w-20 h-24 object-cover bg-[#f0ece4] rounded-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#1a1a1a]">{item.name}</p>
            {item.size && <p className="text-xs text-black/40 mt-0.5">Size: {item.size}</p>}
            <p className="text-sm text-black/60 mt-1">{item.price}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-black/40 uppercase tracking-wider">Qty</span>
              <div className="flex items-center gap-2 border border-black/15 rounded-full px-3 py-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-black/50 hover:text-black w-4">−</button>
                <span className="text-sm w-4 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="text-black/50 hover:text-black w-4">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 pb-5">
          <a href={cartHref} className="w-full bg-black text-white text-sm font-medium text-center py-3 rounded-xl hover:bg-black/80 transition-colors block">View Cart</a>
          <button onClick={onClose} className="w-full text-sm text-black/50 hover:text-black transition-colors py-2">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
