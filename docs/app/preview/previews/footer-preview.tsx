import { Footer } from "../../ui/footer";

export function FooterPreview() {
  return (
    <Footer
      headline="Other Showroom"
      footer={{
        address: "Accra, Ghana\nWest Africa",
        email: "hello@othershowroom.com",
        socialLinks: [{ uri: "https://instagram.com/othershowroom", title: "Instagram" }],
        logoUrl: "https://placehold.co/60x60/1a1a1a/white?text=OS",
        secondChanceLogoUrl: "",
        secondChanceAlbumLink: "",
        theorLogoUrl: "https://placehold.co/120x50/1a1a1a/white?text=TheOr",
        theorLink: { uri: "https://theor.org", title: "The Or Foundation" },
      }}
    />
  );
}
