import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nativeframe — Social mockups that look native",
  description:
    "Create polished TikTok, Instagram and X mockups directly in your browser. No AI image API, no render queue, export in seconds.",
  keywords: [
    "social media mockup",
    "TikTok mockup",
    "Instagram mockup",
    "X post mockup",
    "social post generator",
    "browser image editor",
  ],
  openGraph: {
    title: "Nativeframe — Social mockups that look native",
    description:
      "Build clean TikTok, Instagram and X visual mockups in seconds, directly in your browser.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
