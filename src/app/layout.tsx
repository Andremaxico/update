import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { News } from "./components/News/News";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Search } from "./components/Search/Search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Update app",
  description: "X Clone created for educational purposes",
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
        <div className="reelative container flex justify-between">
          <div className="">
            <Sidebar />
          </div>
          {children}
          <div className="sticky right-0 top-0 pt-5 max-w-80">
            <div className="mb-2">
              <Search />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
