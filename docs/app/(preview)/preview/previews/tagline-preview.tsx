import { Tagline } from "../../../ui/tagline";

export function TaglinePreview() {
  return (
    <div>
      <div className="h-40 bg-[#f7f4ee] flex items-center justify-center">
        <p className="text-black/30 text-sm">Scroll down</p>
      </div>
      <Tagline quoteText="Fashion is not just clothing — it is a language, a culture, a statement of who you are and where you come from." />
      <div className="h-40 bg-[#f7f4ee]" />
    </div>
  );
}
