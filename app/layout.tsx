import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/lib/resume";
import "./globals.css";

// Tipografia aprovada (CLAUDE.md §5.1): Instrument Sans no display,
// IBM Plex Sans no corpo, IBM Plex Mono nos dados/labels.
const display = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `Portfólio de ${profile.name}, ${profile.role} em ${profile.location}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
