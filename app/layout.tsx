import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/lib/store/CartContext";
import CartSidebar from "@/components/CartSidebar";
import CateringCartSidebar from "@/components/CateringCartSidebar";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Miami Yachting Company | Private Yacht Charters & Boat Rentals",
  description: "A curated fleet of privately owned vessels, hand selected for comfort, style, and exceptional guest experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${inter.className}`}>
        <CartProvider>
          <Navigation />
          {children}
          <CartSidebar />
          <CateringCartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
