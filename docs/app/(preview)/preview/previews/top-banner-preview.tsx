import { TopBanner } from "../../../ui/top-banner";

export function TopBannerPreview() {
  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <TopBanner
        theorLogoUrl="https://placehold.co/70x35/1a1a1a/white?text=TheOr"
        theorLink={{ uri: "https://theor.org", title: "The Or Foundation" }}
        updates={[
          "New collection dropping soon",
          "Free shipping on orders over $100",
          "An Initiative By The Or Foundation",
        ]}
      />
      <div className="flex items-center justify-center h-64">
        <p className="text-black/30 text-sm">Page content goes here</p>
      </div>
    </div>
  );
}
