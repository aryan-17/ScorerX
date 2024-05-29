"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F7F8FA] font-mono flex flex-col min-h-screen">
        <RecoilRoot>
          <Providers>
            <Header />
            <Toaster />
            {children}
            <Footer />
          </Providers>
        </RecoilRoot>
      </body>
    </html>
  );
}
