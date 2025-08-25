import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BubbleCursor } from "@/components/bubble-effects";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Loader from "@/components/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talha Malik - Full Stack Developer & AI Specialist",
  description: "Modern 3D portfolio showcasing innovative web development, AI solutions, and cutting-edge technology projects by Talha Malik.",
  keywords: "Talha Malik, Full Stack Developer, AI Specialist, Web Development, React, Next.js, Python, Portfolio",
  authors: [{ name: "Talha Malik" }],
  creator: "Talha Malik",
  openGraph: {
    title: "Talha Malik - Full Stack Developer & AI Specialist",
    description: "Modern 3D portfolio showcasing innovative web development and AI solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Malik - Full Stack Developer & AI Specialist",
    description: "Modern 3D portfolio showcasing innovative web development and AI solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Loader />
        <Navbar />
        {children}
        <BubbleCursor />
        <Footer />
      </body>
    </html>
  );
}
