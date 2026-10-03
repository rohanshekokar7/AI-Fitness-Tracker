import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitAI - Your AI Personal Trainer",
  description: "AI-powered fitness, nutrition, and wellness tracking.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitAI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background pb-24 md:pb-0 relative`}>
        {/* Mobile View Container */}
        <div className="md:max-w-md md:mx-auto md:min-h-screen md:border-x md:border-border md:shadow-2xl md:relative md:bg-background">
          <main className="min-h-screen w-full">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
