import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const siteUrl = "https://tkttv001.github.io/testopenclaw/task011/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ronin Portfolio",
    template: "%s | Ronin Portfolio",
  },
  description: "Multi-page Ronin Premium Dark portfolio with explicit mobile-first behavior.",
  openGraph: {
    title: "Ronin Portfolio",
    description: "Disciplined execution and premium digital delivery.",
    url: siteUrl,
    type: "website",
    siteName: "Ronin Portfolio",
  },
  alternates: { canonical: "/" },
  twitter: { card: "summary_large_image", title: "Ronin Portfolio" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
