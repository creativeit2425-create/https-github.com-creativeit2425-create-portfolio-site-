import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { SiteHeader } from "@/components/layout/nav";
import { SiteFooter } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "S.N.M. Rayhan | Portfolio",
  description: "Digital Marketing Specialist | SEO and Paid Advertising Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-transparent font-sans antialiased text-foreground", inter.variable)} suppressHydrationWarning>
        <SmoothScroll>
          <GalaxyBackground />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html >
  );
}
