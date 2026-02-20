import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const siteUrl = "https://tkttv001.github.io/testopenclaw/task013/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chef Atelier | Premium Fine Dining",
    template: "%s | Chef Atelier",
  },
  description:
    "Premium private dining portfolio for a chef with 6 years of USA-Vietnam culinary experience.",
  openGraph: {
    title: "Chef Atelier | Premium Fine Dining",
    description: "Private dining, signature tasting menus, and chef storytelling.",
    url: siteUrl,
    type: "website",
    siteName: "Chef Atelier",
  },
  alternates: { canonical: "/" },
  twitter: { card: "summary_large_image", title: "Chef Atelier" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
