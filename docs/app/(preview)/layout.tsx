import { Figtree } from "next/font/google";
import "../globals.css";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased font-sans bg-[#f7f4ee]`}>
        {children}
      </body>
    </html>
  );
}
