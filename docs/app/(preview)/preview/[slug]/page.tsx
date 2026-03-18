import { notFound } from "next/navigation";
import { FooterPreview } from "../previews/footer-preview";
import { TopBannerPreview } from "../previews/top-banner-preview";
import { NavbarPreview } from "../previews/navbar-preview";
import { ProductCardPreview } from "../previews/product-card-preview";
import { CartModalPreview } from "../previews/cart-modal-preview";
import { TaglinePreview } from "../previews/tagline-preview";
import { VideoHeroPreview } from "../previews/video-hero-preview";
import { CarouselPreview } from "../previews/carousel-preview";

const previews: Record<string, React.ComponentType> = {
  footer: FooterPreview,
  "top-banner": TopBannerPreview,
  navbar: NavbarPreview,
  "product-card": ProductCardPreview,
  "cart-modal": CartModalPreview,
  tagline: TaglinePreview,
  "video-hero": VideoHeroPreview,
  carousel: CarouselPreview,
};

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Preview = previews[slug];
  if (!Preview) notFound();
  return <Preview />;
}

export function generateStaticParams() {
  return Object.keys(previews).map((slug) => ({ slug }));
}
