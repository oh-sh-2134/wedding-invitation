import type { Metadata } from "next";
import { headers } from "next/headers";
import { wedding } from "./wedding-config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "wedding-invitation.example";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: wedding.share.title,
    description: `${wedding.share.description}, ${wedding.venue.name}`,
    openGraph: {
      title: wedding.share.title,
      description: `${wedding.share.description}, ${wedding.venue.name}`,
      type: "website",
      images: [{ url: "/og.png", width: 1664, height: 928, alt: `${wedding.groom.name}과 ${wedding.bride.name}의 모바일 청첩장` }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
