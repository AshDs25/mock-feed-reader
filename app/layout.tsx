import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

// Runs before React hydrates: read the persisted theme and set the `.dark`
// class synchronously, so the page never flashes the wrong theme (FOUC).
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('feed-reader-theme');
    var theme = stored ? JSON.parse(stored).state.theme : 'light';
    document.documentElement.setAttribute('data-theme',theme);
  } catch (e) {}
})();
`;

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <header className="border-b border-border">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/feed" className="text-lg font-semibold tracking-tight">
              Feed Reader
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
