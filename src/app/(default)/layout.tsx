import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { News } from "../../components/News/News";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Search } from "../../components/Search/Search";
import { RecoilRoot } from "recoil";
import { AppWrapper } from "@/components/AppWrapper";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const supabase = await createClient()
  // const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //   redirect('/login')
  // }

  // console.log('user', data)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>
          <div className="reelative container flex justify-between">
            <div className="hidden sm:block">
              <Sidebar />
            </div>
            { children }
            <div className="hidden md:block sticky right-0 top-0 pt-5 pl-2 border-l-1 border-gray-300 max-w-80">
              <div className="mb-2">
                <Search />
              </div>
              <News />
            </div>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
