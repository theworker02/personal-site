import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader, Syne } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import { CommandPaletteHost } from "@/components/command/CommandPaletteHost";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.handle}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl(),
    siteName: siteConfig.handle,
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${newsreader.variable} ${ibm.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        {children}
        <CommandPaletteHost />
      </body>
    </html>
  );
}
