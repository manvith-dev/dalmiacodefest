import type { Metadata } from "next";
import {
  Montserrat,
  Montserrat_Alternates,
  Google_Sans_Code,
} from "next/font/google";
import "./globals.css";

const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

const mont_alt = Montserrat_Alternates({
  variable: "--font-mont-alt",
  weight: "400",
  subsets: ["latin"],
});

const google_sans_code = Google_Sans_Code({
  variable: "--font-google-sans-code",
  weight: "500",
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
      <body
        className={`${mont.variable} ${mont_alt.variable} ${google_sans_code.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
