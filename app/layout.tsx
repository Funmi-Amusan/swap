import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import UserProfile from "@/components/UserProfile";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swapped",
  description: "Trade in your old phone for a new one.",
  icons: {
    icon: "/swapped-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="py-4 px-6 border-b">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/swapped-logo.png"
                  alt="Swapped Logo"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold">SWAPPED</span>
              </Link>
              <UserProfile />
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
