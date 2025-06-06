export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import Script from "next/script";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "중고장터",
  icons: {
    icon: '/rabbit.svg'
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          pt-14
          font-sans 
          bg-[--color-background] 
          text-[--color-foreground] 
          antialiased 
          min-h-screen 
          flex flex-col
        `}
      >
        <Navbar currentUser={currentUser} />
        <ToastProvider />
        {children}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8fc96c007f953a6ae72b68fa102c1cf3&libraries=services,clusterer&autoload=false"
        />
      </body>
    </html>
  )
}

