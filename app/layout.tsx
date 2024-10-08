
import type { Metadata } from "next";
import { Providers } from "./providers";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import Nav from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pages",
  description: "An application to read various Manga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <Providers>
              <Nav />
              {children}
              <Toaster />
            </Providers>
      </body>
    </html>
  );
}
