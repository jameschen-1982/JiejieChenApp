import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Chen",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </main>
      </body>
    </html>
  );
}
