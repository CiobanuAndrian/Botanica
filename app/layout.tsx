/**
 * RootLayout - Layout-ul principal al aplicației Next.js
 *
 * Acest fișier definește structura HTML de bază și configurările globale pentru întreaga aplicație.
 * Este punctul de intrare pentru toate paginile și include provider-ele necesare.
 *
 * Funcționalități:
 * - Configurare fonturi Google (Geist Sans și Geist Mono)
 * - Metadata SEO (title, description)
 * - Wrapper CartProvider pentru state management global
 * - Configurare HTML și body cu clase Tailwind
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

/**
 * Configurare font Geist Sans
 * Font-ul principal folosit în aplicație pentru text
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configurare font Geist Mono
 * Font monospațiat pentru cod sau elemente speciale
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata SEO pentru aplicație
 * Afișată în tab-ul browserului și în rezultatele căutării
 */
export const metadata: Metadata = {
  title: "BOTANICA — Magazin de plante",
  description: "Magazin minimalist de plante de interior",
};

/**
 * Componenta RootLayout
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conținutul paginilor care vor fi randate
 *
 * Structură:
 * - <html> cu configurare lang și clase pentru fonturi
 * - <body> cu stiluri Tailwind pentru layout
 * - <CartProvider> pentru state management global al coșului
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        {/* CartProvider înfășoară întreaga aplicație pentru acces global la coș */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
