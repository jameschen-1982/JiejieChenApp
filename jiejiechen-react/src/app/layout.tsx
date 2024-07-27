import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React from "react";
import Auth0AuthProvider from "@/providers/auth0-auth-provider";

const inter = Inter({subsets: ["latin"]});

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
      <Auth0AuthProvider>
        <Header/>
        <div className="flex-grow">
          {children}
        </div>
        <Footer/>
      </Auth0AuthProvider>
    </main>
    </body>
    </html>
  );
}
