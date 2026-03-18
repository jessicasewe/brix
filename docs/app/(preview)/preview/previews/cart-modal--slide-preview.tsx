"use client";
import { useState } from "react";

export function CartModalSlidePreview() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f7f4ee] relative overflow-hidden">
      <div className="flex items-center justify-center h-screen">
        {!open && (
          <button onClick={() => setOpen(true)} className="bg-black text-white text-sm px-6 py-3 rounded-xl hover:bg-black/80 transition-colors">
            Open Cart
          </button>
        )}
      </div>

      {/* Overlay */}
      {open && <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      {/* Slide panel */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
          <span className="font-medium text-[#1a1a1a] text-sm">Your Cart (2)</span>
          <button onClick={() => setOpen(false)} className="text-black/40 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {[
            { name: "Linen Wrap Dress", size: "M", price: "GH₵ 320.00", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=160&fit=crop" },
            { name: "Cotton Midi Skirt", size: "S", price: "GH₵ 180.00", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=120&h=160&fit=crop" },
          ].map((item) => (
            <div key={item.name} className="flex gap-3">
              <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-lg bg-[#f0ece4]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">{item.name}</p>
                <p className="text-xs text-black/40 mt-0.5">Size: {item.size}</p>
                <p className="text-sm text-black/60 mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-black/8 space-y-3">
          <div className="flex justify-between text-sm font-medium text-[#1a1a1a]">
            <span>Total</span><span>GH₵ 500.00</span>
          </div>
          <button className="w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-black/80 transition-colors">Checkout</button>
          <button onClick={() => setOpen(false)} className="w-full text-sm text-black/50 hover:text-black py-2 transition-colors">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
