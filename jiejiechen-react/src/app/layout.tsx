import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { Suspense } from "react";
import Auth0AuthProvider from "@/providers/auth0-auth-provider";
import {PHProvider} from "@/providers/ph-provider";
import PostHogPageView from "./post-hog-page-view";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "James Chen - 15 Years Experience in Web Application",
  description: "I am an experienced Web application developer specialised in various front-end frameworks, .NET, and multiple Cloud platforms.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <PHProvider>
      <body className={inter.className}>
      <Suspense fallback={null}><PostHogPageView /></Suspense>
      <main>
        <Auth0AuthProvider>
          <Header/>
          <div className="flex-grow">
              {children}
          </div>
          <Footer/>
        </Auth0AuthProvider>
      </main>
      </body>
    </PHProvider>
    </html>
  );
}
