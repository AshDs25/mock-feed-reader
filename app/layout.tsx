import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feed Reader",
  description: "A small RSS-style feed reader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto w-full max-w-3xl px-6 py-4">
            <Link href="/feed" className="text-lg font-semibold tracking-tight">
              Feed Reader
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
