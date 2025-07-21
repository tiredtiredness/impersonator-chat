import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Impersonator Chat",
  description: "Chat with impersonator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
