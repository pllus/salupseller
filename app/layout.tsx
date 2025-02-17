import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Kanit({
  weight: "400",
  subsets: ["thai"],
});

const geistMono = Kanit({
  weight: "400",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "FindFile",
  description: "ชื้อ-ขาย ไฟล์ ง่ายๆ กับ FindFile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
