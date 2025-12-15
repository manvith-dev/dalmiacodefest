import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

const mont_alt = Montserrat_Alternates({
  variable: "--font-mont-alt",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DCF - Dalmia Code Fest",
  description: "Step Into Lion's Codethon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mont.variable} ${mont_alt.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
