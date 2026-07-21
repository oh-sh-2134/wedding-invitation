import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "wedding-invitation.example";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: "김도윤 ♥ 이서연 결혼합니다",
    description: "2027년 5월 15일 토요일 오후 1시, 라온제나 웨딩홀",
    openGraph: {
      title: "김도윤 ♥ 이서연 결혼합니다",
      description: "2027년 5월 15일 토요일 오후 1시, 라온제나 웨딩홀",
      type: "website",
      images: [{ url: "/og.png", width: 1664, height: 928, alt: "김도윤과 이서연의 모바일 청첩장" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
