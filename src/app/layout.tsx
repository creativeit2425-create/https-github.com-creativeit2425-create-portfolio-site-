import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

import { BackgroundManager } from "@/components/layout/background-manager";
import { StormProvider } from "@/components/providers/storm-provider";
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
        <StormProvider>
          <SmoothScroll>
            <BackgroundManager />
            <SiteHeader />
            {children}
            <SiteFooter />
          </SmoothScroll>
        </StormProvider>
      </body>
    </html >
  );
}
