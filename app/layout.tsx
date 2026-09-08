import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bidwise - Should You Bid? AI Job Analyzer for Upwork",
  description:
    "Paste any Upwork job post and get an instant AI verdict: estimated hours, fair pay, AI-leverage score, and red flags — before you spend time bidding.",
  keywords: [
    "Upwork job analyzer",
    "should I bid Upwork",
    "AI freelance tool",
    "Upwork bid calculator",
    "freelance rate calculator",
    "AI job scoring",
  ],
  openGraph: {
    title: "bidwise - Should You Bid? AI Job Analyzer for Upwork",
    description:
      "Paste any Upwork job post and get an instant AI verdict on hours, pay, and red flags before you bid.",
    type: "website",
    url: "https://bidwise-ai.vercel.app",
    siteName: "bidwise",
  },
  twitter: {
    card: "summary_large_image",
    title: "bidwise - Should You Bid? AI Job Analyzer for Upwork",
    description:
      "Paste any Upwork job post and get an instant AI verdict on hours, pay, and red flags before you bid.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased`}
        suppressHydrationWarning
      >
        {children}

        {/* <Analytics /> */}
      </body>
    </html>
  );
}
