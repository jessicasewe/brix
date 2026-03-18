import { Navbar } from "../../../ui/navbar";

export function NavbarPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-800 to-stone-600">
      <Navbar
        logoUrl="https://placehold.co/40x40/ffffff/1a1a1a?text=OS"
        logoAlt="Other Showroom"
        links={[
          { label: "Shop", href: "/shop" },
          { label: "Collections", href: "/collections" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
        cartCount={3}
        cartHref="/cart"
      />
      <div className="flex items-center justify-center h-screen">
        <p className="text-white/40 text-sm">Scroll to see transparency change</p>
      </div>
    </div>
  );
}
